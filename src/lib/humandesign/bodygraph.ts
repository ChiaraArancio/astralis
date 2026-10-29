/**
 * Matrice canonique du BodyGraph : 9 centres, 64 portes, 36 canaux.
 * Données de référence adaptées de free-human-design (MIT).
 */

export const CENTERS = [
  'head',
  'ajna',
  'throat',
  'g',
  'heart',
  'sacral',
  'solarplexus',
  'spleen',
  'root',
] as const;

export type CenterKey = (typeof CENTERS)[number];

export const GATE_CENTER: Record<number, CenterKey> = {
  64: 'head', 61: 'head', 63: 'head',
  47: 'ajna', 24: 'ajna', 4: 'ajna', 17: 'ajna', 11: 'ajna', 43: 'ajna',
  62: 'throat', 23: 'throat', 56: 'throat', 35: 'throat', 12: 'throat', 45: 'throat',
  33: 'throat', 8: 'throat', 31: 'throat', 20: 'throat', 16: 'throat',
  1: 'g', 13: 'g', 25: 'g', 46: 'g', 2: 'g', 15: 'g', 10: 'g', 7: 'g',
  21: 'heart', 40: 'heart', 26: 'heart', 51: 'heart',
  48: 'spleen', 57: 'spleen', 44: 'spleen', 50: 'spleen', 32: 'spleen', 28: 'spleen', 18: 'spleen',
  34: 'sacral', 5: 'sacral', 14: 'sacral', 29: 'sacral', 59: 'sacral', 9: 'sacral',
  3: 'sacral', 42: 'sacral', 27: 'sacral',
  6: 'solarplexus', 37: 'solarplexus', 30: 'solarplexus', 55: 'solarplexus',
  49: 'solarplexus', 22: 'solarplexus', 36: 'solarplexus',
  53: 'root', 60: 'root', 52: 'root', 19: 'root', 39: 'root', 41: 'root',
  58: 'root', 38: 'root', 54: 'root',
};

const CHANNEL_GATE_PAIRS: Array<[number, number]> = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52],
  [10, 20], [10, 34], [10, 57], [11, 56], [12, 22], [13, 33], [16, 48], [17, 62],
  [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [34, 57], [35, 36],
  [37, 40], [39, 55], [42, 53], [47, 64],
];

export interface DefinedChannelData {
  key: string;
  gates: [number, number];
  centers: [CenterKey, CenterKey];
  name: string | null;
}

export const CHANNELS: DefinedChannelData[] = CHANNEL_GATE_PAIRS.map(([a, b]) => {
  const [low, high] = a < b ? [a, b] : [b, a];
  return {
    key: `${low}-${high}`,
    gates: [low, high],
    centers: [GATE_CENTER[low], GATE_CENTER[high]],
    name: null,
  };
});

export interface BodygraphActivation {
  stream: 'personality' | 'design';
  body: string;
  gate: number;
  line: number;
  color: number;
  longitude: number;
}

export interface BodygraphResult {
  type: string;
  authority: string;
  profile: string | null;
  activatedGates: number[];
  definedChannels: DefinedChannelData[];
  definedCenters: CenterKey[];
  openCenters: CenterKey[];
  centers: Record<CenterKey, boolean>;
}

const MOTOR_CENTERS: CenterKey[] = ['sacral', 'heart', 'solarplexus', 'root'];

function reachable(
  start: CenterKey,
  defined: Set<CenterKey>,
  channels: DefinedChannelData[],
): Set<CenterKey> {
  const adjacency = new Map<CenterKey, Set<CenterKey>>();
  for (const center of defined) adjacency.set(center, new Set());
  for (const channel of channels) {
    const [a, b] = channel.centers;
    if (adjacency.has(a) && adjacency.has(b)) {
      adjacency.get(a)?.add(b);
      adjacency.get(b)?.add(a);
    }
  }
  const seen = new Set<CenterKey>([start]);
  const queue: CenterKey[] = [start];
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
  return seen;
}

function motorReachesThroat(defined: Set<CenterKey>, channels: DefinedChannelData[]): boolean {
  if (!defined.has('throat')) return false;
  for (const motor of MOTOR_CENTERS) {
    if (defined.has(motor) && reachable(motor, defined, channels).has('throat')) return true;
  }
  return false;
}

export function determineType(
  defined: Set<CenterKey>,
  channels: DefinedChannelData[],
): string {
  if (defined.size === 0) return 'Reflector';
  const sacral = defined.has('sacral');
  const motorThroat = motorReachesThroat(defined, channels);
  if (sacral) return motorThroat ? 'Manifesting Generator' : 'Generator';
  return motorThroat ? 'Manifestor' : 'Projector';
}

export function determineAuthority(
  defined: Set<CenterKey>,
  channels: DefinedChannelData[],
): string {
  const has = (center: CenterKey) => defined.has(center);
  if (defined.size === 0) return 'Lunar (Reflector)';
  if (has('solarplexus')) return 'Emotional (Solar Plexus)';
  if (has('sacral')) return 'Sacral';
  if (has('spleen')) return 'Splenic';
  if (has('heart')) return 'Ego (Heart)';
  if (has('g') && has('throat') && reachable('g', defined, channels).has('throat')) {
    return 'Self-Projected (G)';
  }
  return 'Mental (None / Environmental)';
}

export function computeBodygraph(activations: BodygraphActivation[]): BodygraphResult {
  const activatedGates = [...new Set(activations.map((entry) => entry.gate))].sort((a, b) => a - b);
  const gateSet = new Set(activatedGates);
  const definedChannels = CHANNELS.filter(
    (channel) => gateSet.has(channel.gates[0]) && gateSet.has(channel.gates[1]),
  );
  const definedSet = new Set<CenterKey>();
  for (const channel of definedChannels) {
    definedSet.add(channel.centers[0]);
    definedSet.add(channel.centers[1]);
  }
  const definedCenters = CENTERS.filter((center) => definedSet.has(center));
  const openCenters = CENTERS.filter((center) => !definedSet.has(center));
  const centers = Object.fromEntries(CENTERS.map((center) => [center, definedSet.has(center)])) as Record<
    CenterKey,
    boolean
  >;

  const personalitySun = activations.find(
    (entry) => entry.stream === 'personality' && entry.body === 'sun',
  );
  const designSun = activations.find((entry) => entry.stream === 'design' && entry.body === 'sun');
  const profile =
    personalitySun && designSun ? `${personalitySun.line}/${designSun.line}` : null;

  return {
    type: determineType(definedSet, definedChannels),
    authority: determineAuthority(definedSet, definedChannels),
    profile,
    activatedGates,
    definedChannels,
    definedCenters,
    openCenters,
    centers,
  };
}
