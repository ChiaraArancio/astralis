import { Body, Ecliptic, GeoVector } from 'astronomy-engine';
import type { BirthPlace } from '../geo';
import { julianDayUT, zonedTimeToUtc } from '../timezone';
import {
  CENTERS,
  computeBodygraph,
  type BodygraphActivation,
  type CenterKey,
} from './bodygraph';
import { mapLongitudeDegrees } from './gate-mapping';
import {
  GATE_NAMES,
  HD_AUTHORITIES,
  HD_BODY_LABELS,
  HD_CENTERS,
  HD_CHANNEL_NAMES,
  HD_TYPES,
  definitionLabel,
  profileInfo,
  type HdAuthorityInfo,
  type HdCenterInfo,
  type HdProfileInfo,
  type HdTypeInfo,
} from './labels';

export class HumanDesignError extends Error {
  code: 'TIME_REQUIRED' | 'INVALID_INPUT' | 'CALCULATION_FAILED';
  constructor(message: string, code: HumanDesignError['code'] = 'INVALID_INPUT') {
    super(message);
    this.name = 'HumanDesignError';
    this.code = code;
  }
}

export interface HumanDesignInput {
  firstName: string;
  birthDate: string;
  birthTime: string;
  place: BirthPlace;
}

export interface HdActivation {
  stream: 'personality' | 'design';
  body: string;
  planetName: string;
  glyph: string;
  gate: number;
  gateName: string;
  line: number;
  color: number;
  longitude: number;
}

export interface HdGate {
  gate: number;
  name: string;
  personality: HdActivation[];
  design: HdActivation[];
}

export interface HdChannel {
  key: string;
  gates: [number, number];
  name: string;
  description: string;
  centers: [string, string];
}

export interface HdCenter extends Omit<HdCenterInfo, 'definedText' | 'openText'> {
  defined: boolean;
  description: string;
}

export interface HumanDesignResult {
  input: HumanDesignInput;
  birthUtc: string;
  typeInfo: HdTypeInfo;
  authorityInfo: HdAuthorityInfo;
  profileInfo: HdProfileInfo | null;
  profile: string | null;
  definitionCount: number;
  definitionLabel: string;
  definedCenters: string[];
  openCenters: string[];
  centers: HdCenter[];
  channels: HdChannel[];
  gates: HdGate[];
  activations: {
    personality: HdActivation[];
    design: HdActivation[];
  };
  strategy: string;
  signature: string;
  notSelf: string;
  aura: string;
}

const BODY_MAP: Record<string, Body> = {
  sun: Body.Sun,
  moon: Body.Moon,
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto,
};

const ACTIVATION_BODIES = [
  'sun',
  'earth',
  'moon',
  'north_node',
  'south_node',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
] as const;

function normalize(value: number): number {
  return ((value % 360) + 360) % 360;
}

function signedAngleDiff(a: number, b: number): number {
  let diff = normalize(a - b);
  if (diff > 180) diff -= 360;
  return diff;
}

function meanNodeLongitude(date: Date): number {
  const jd = julianDayUT(date);
  const t = (jd - 2_451_545.0) / 36_525;
  return normalize(
    125.0445479 -
      1934.1362891 * t +
      0.0020754 * t * t +
      (t * t * t) / 467_441 -
      (t * t * t * t) / 60_616_000,
  );
}

function bodyLongitude(body: string, date: Date): number {
  if (body === 'earth') return normalize(bodyLongitude('sun', date) + 180);
  if (body === 'north_node') return meanNodeLongitude(date);
  if (body === 'south_node') return normalize(meanNodeLongitude(date) + 180);
  const astronomyBody = BODY_MAP[body];
  if (astronomyBody === undefined) throw new Error(`Corps inconnu : ${body}`);
  const vector = GeoVector(astronomyBody, date, true);
  return normalize(Ecliptic(vector).elon);
}

function findDesignDate(birthUtc: Date): Date {
  const jd = julianDayUT(birthUtc);
  const currentSun = bodyLongitude('sun', birthUtc);
  const target = normalize(currentSun - 88);

  let highJd = jd;
  let lowJd = highJd - 1;
  const longitudeAt = (julianDay: number) => {
    const date = new Date((julianDay - 2_440_587.5) * 86_400_000);
    return bodyLongitude('sun', date);
  };

  let lowDiff = signedAngleDiff(longitudeAt(lowJd), target);
  let iterations = 0;
  while (lowDiff > 0 && iterations < 365) {
    lowJd -= 1;
    lowDiff = signedAngleDiff(longitudeAt(lowJd), target);
    iterations += 1;
  }
  if (lowDiff > 0) throw new Error('Impossible de localiser le moment du Design (88° solaires).');

  for (let index = 0; index < 60; index += 1) {
    const mid = 0.5 * (lowJd + highJd);
    const midDiff = signedAngleDiff(longitudeAt(mid), target);
    if (midDiff > 0) highJd = mid;
    else lowJd = mid;
  }

  const designJd = 0.5 * (lowJd + highJd);
  return new Date((designJd - 2_440_587.5) * 86_400_000);
}

function activationFor(
  body: string,
  stream: 'personality' | 'design',
  date: Date,
): BodygraphActivation {
  const longitude = bodyLongitude(body, date);
  const mapped = mapLongitudeDegrees(longitude);
  return {
    stream,
    body,
    gate: mapped.hexagram,
    line: mapped.line,
    color: mapped.color,
    longitude,
  };
}

function activationFromRaw(activation: BodygraphActivation): HdActivation {
  const label = HD_BODY_LABELS[activation.body] ?? { name: activation.body, glyph: '•' };
  return {
    stream: activation.stream,
    body: activation.body,
    planetName: label.name,
    glyph: label.glyph,
    gate: activation.gate,
    gateName: GATE_NAMES[activation.gate] ?? `Porte ${activation.gate}`,
    line: activation.line,
    color: activation.color,
    longitude: activation.longitude,
  };
}

function buildGates(activations: HdActivation[]): HdGate[] {
  const map = new Map<number, HdGate>();
  for (const activation of activations) {
    const gate = map.get(activation.gate) ?? {
      gate: activation.gate,
      name: GATE_NAMES[activation.gate] ?? `Porte ${activation.gate}`,
      personality: [],
      design: [],
    };
    if (activation.stream === 'personality') gate.personality.push(activation);
    else gate.design.push(activation);
    map.set(activation.gate, gate);
  }
  return [...map.values()].sort((a, b) => a.gate - b.gate);
}

function centerLabel(center: string): string {
  return HD_CENTERS.find((entry) => entry.key === center)?.name ?? center;
}

export function definitionComponents(channels: HdChannel[], definedCenters: string[]): number {
  if (definedCenters.length === 0) return 0;
  const adjacency = new Map<string, Set<string>>();
  for (const center of definedCenters) adjacency.set(center, new Set());
  for (const channel of channels) {
    const [a, b] = channel.centers;
    if (adjacency.has(a) && adjacency.has(b)) {
      adjacency.get(a)?.add(b);
      adjacency.get(b)?.add(a);
    }
  }
  const seen = new Set<string>();
  let groups = 0;
  for (const center of definedCenters) {
    if (seen.has(center)) continue;
    groups += 1;
    const queue = [center];
    seen.add(center);
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;
      for (const neighbor of adjacency.get(current) ?? []) {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
  return groups;
}

export function computeHumanDesign(input: HumanDesignInput): HumanDesignResult {
  if (!input.birthTime) {
    throw new HumanDesignError(
      "L’heure exacte de naissance est indispensable au calcul du Human Design. Nous ne générons pas de profil approximatif lorsque l’heure est inconnue.",
      'TIME_REQUIRED',
    );
  }
  if (!input.place || !Number.isFinite(input.place.latitude) || !Number.isFinite(input.place.longitude)) {
    throw new HumanDesignError(
      'Le lieu de naissance est nécessaire pour calculer le BodyGraph.',
      'INVALID_INPUT',
    );
  }

  try {
    const birthUtc = zonedTimeToUtc(input.birthDate, input.birthTime, input.place.timezone);
    const designDate = findDesignDate(birthUtc);

    const personalityRaw = ACTIVATION_BODIES.map((body) =>
      activationFor(body, 'personality', birthUtc),
    );
    const designRaw = ACTIVATION_BODIES.map((body) => activationFor(body, 'design', designDate));
    const bodygraph = computeBodygraph([...personalityRaw, ...designRaw]);

    const typeInfo =
      HD_TYPES[bodygraph.type] ??
      ({
        key: bodygraph.type,
        name: bodygraph.type,
        strategy: 'Stratégie non déterminée',
        signature: '—',
        notSelf: '—',
        aura: '—',
        description: '',
        keywords: [],
      } satisfies HdTypeInfo);
    const authorityInfo =
      HD_AUTHORITIES[bodygraph.authority] ??
      ({
        key: bodygraph.authority,
        name: bodygraph.authority,
        short: bodygraph.authority,
        description: '',
        question: '',
      } satisfies HdAuthorityInfo);
    const profile = profileInfo(bodygraph.profile);

    const channels: HdChannel[] = bodygraph.definedChannels
      .map((channel) => {
        const info = HD_CHANNEL_NAMES[channel.key] ?? {
          name: `Canal ${channel.key}`,
          description:
            'Canal défini par la rencontre des deux portes activées. Son interprétation dépend de l’ensemble du BodyGraph.',
        };
        return {
          key: channel.key,
          gates: channel.gates,
          name: info.name,
          description: info.description,
          centers: [channel.centers[0], channel.centers[1]] as [string, string],
        };
      })
      .sort((a, b) => a.key.localeCompare(b.key, 'fr', { numeric: true }));

    const definedSet = new Set(bodygraph.definedCenters);
    const centers: HdCenter[] = HD_CENTERS.map((center) => {
      const defined = definedSet.has(center.key as CenterKey);
      return {
        ...center,
        defined,
        description: defined ? center.definedText : center.openText,
      };
    });

    const personality = personalityRaw.map(activationFromRaw);
    const design = designRaw.map(activationFromRaw);
    const gates = buildGates([...personality, ...design]);
    const components = definitionComponents(channels, bodygraph.definedCenters);

    return {
      input,
      birthUtc: birthUtc.toISOString(),
      typeInfo,
      authorityInfo,
      profileInfo: profile,
      profile: bodygraph.profile,
      definitionCount: components,
      definitionLabel: definitionLabel(components),
      definedCenters: bodygraph.definedCenters,
      openCenters: bodygraph.openCenters,
      centers,
      channels,
      gates,
      activations: { personality, design },
      strategy: typeInfo.strategy,
      signature: typeInfo.signature,
      notSelf: typeInfo.notSelf,
      aura: typeInfo.aura,
    };
  } catch (error) {
    if (error instanceof HumanDesignError) throw error;
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    throw new HumanDesignError(
      `Le calcul du BodyGraph a échoué : ${message}. Vérifiez la date, l’heure et le lieu de naissance.`,
      'CALCULATION_FAILED',
    );
  }
}

export const CENTER_KEYS = CENTERS;
export { centerLabel };
