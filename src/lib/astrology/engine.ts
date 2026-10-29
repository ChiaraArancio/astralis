import { Body, Ecliptic, GeoVector } from 'astronomy-engine';
import type { BirthPlace } from '../geo';
import { computePlacidusHouses } from './houses';
import {
  formatClockFr,
  formatDateFr,
  julianDayUT,
  zonedTimeToUtc,
} from '../timezone';
import {
  ASPECTS,
  ELEMENTS,
  HOUSES,
  PLANETS,
  SIGNS,
  signFromLongitude,
  type AspectDefinition,
  type Element,
  type PlanetKey,
  type SignData,
} from './data';

export class AstrologyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AstrologyError';
  }
}

export interface AstrologyInput {
  firstName: string;
  birthDate: string;
  birthTime?: string;
  timeKnown: boolean;
  place: BirthPlace;
}

export interface PlanetPlacement {
  key: PlanetKey;
  name: string;
  glyph: string;
  theme: string;
  description: string;
  longitude: number | null;
  sign: SignData | null;
  degree: number | null;
  minute: number | null;
  formatted: string | null;
  house: number | null;
  retrograde: boolean;
  stable: boolean;
}

export interface AnglePlacement {
  key: 'ascendant' | 'midheaven' | 'descendant' | 'imumCoeli';
  name: string;
  longitude: number;
  sign: SignData;
  degree: number;
  minute: number;
  formatted: string;
}

export interface HousePlacement {
  number: number;
  title: string;
  theme: string;
  longitude: number;
  sign: SignData;
  degree: number;
  minute: number;
  formatted: string;
}

export interface AspectResult {
  a: PlanetKey;
  b: PlanetKey;
  aName: string;
  bName: string;
  type: AspectDefinition['type'];
  name: string;
  symbol: string;
  angle: number;
  orb: number;
  nature: AspectDefinition['nature'];
  description: string;
  sentence: string;
}

export interface ElementBalance {
  element: Element;
  count: number;
  percent: number;
}

export interface AstrologyResult {
  input: AstrologyInput;
  unknownTime: boolean;
  utc: Date | null;
  localSummary: string;
  place: BirthPlace;
  planets: PlanetPlacement[];
  angles: {
    ascendant: AnglePlacement;
    midheaven: AnglePlacement;
    descendant: AnglePlacement;
    imumCoeli: AnglePlacement;
  } | null;
  houses: HousePlacement[] | null;
  houseSystem: 'placidus' | 'whole' | null;
  houseSystemNote: string | null;
  aspects: AspectResult[];
  sunSign: SignData | null;
  moonSign: SignData | null;
  risingSign: SignData | null;
  chartRuler: string | null;
  elementBalance: ElementBalance[] | null;
  qualityBalance: Array<{ quality: string; count: number; percent: number }> | null;
}

const BODY_BY_KEY: Partial<Record<PlanetKey, Body>> = {
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

function normalizeAngle(value: number): number {
  return ((value % 360) + 360) % 360;
}

function signedAngleDiff(a: number, b: number): number {
  let diff = normalizeAngle(a - b);
  if (diff > 180) diff -= 360;
  return diff;
}

export function meanNodeLongitude(date: Date): number {
  const jd = julianDayUT(date);
  const t = (jd - 2_451_545.0) / 36_525;
  const omega =
    125.0445479 -
    1934.1362891 * t +
    0.0020754 * t * t +
    (t * t * t) / 467_441 -
    (t * t * t * t) / 60_616_000;
  return normalizeAngle(omega);
}

function bodyLongitude(key: PlanetKey, date: Date): number {
  if (key === 'northNode') return meanNodeLongitude(date);
  const body = BODY_BY_KEY[key];
  if (body === undefined) throw new AstrologyError(`Corps céleste inconnu : ${key}`);
  const vector = GeoVector(body, date, true);
  return normalizeAngle(Ecliptic(vector).elon);
}

function isRetrograde(key: PlanetKey, date: Date): boolean {
  if (key === 'sun' || key === 'moon') return false;
  if (key === 'northNode') return true;
  const before = bodyLongitude(key, new Date(date.getTime() - 12 * 3600_000));
  const after = bodyLongitude(key, new Date(date.getTime() + 12 * 3600_000));
  return signedAngleDiff(after, before) < 0;
}

function degreeParts(longitude: number): { sign: SignData; degree: number; minute: number } {
  const sign = signFromLongitude(longitude);
  const within = normalizeAngle(longitude) - sign.index * 30;
  let degree = Math.floor(within);
  let minute = Math.floor((within - degree) * 60);
  if (minute >= 60) {
    minute = 0;
    degree += 1;
  }
  if (degree >= 30) {
    degree = 0;
    minute = 0;
  }
  return { sign, degree, minute };
}

export function formatZodiacPosition(longitude: number): string {
  const { sign, degree, minute } = degreeParts(longitude);
  return `${sign.name} ${degree}°${String(minute).padStart(2, '0')}'`;
}

function anglePlacement(
  key: AnglePlacement['key'],
  name: string,
  longitude: number,
): AnglePlacement {
  const { sign, degree, minute } = degreeParts(longitude);
  return {
    key,
    name,
    longitude,
    sign,
    degree,
    minute,
    formatted: `${degree}°${String(minute).padStart(2, '0')}' ${sign.name}`,
  };
}

function houseForLongitude(longitude: number, cusps: Array<{ house: number; longitude: number }>): number {
  const lon = normalizeAngle(longitude);
  for (let index = 0; index < 12; index += 1) {
    const start = normalizeAngle(cusps[index].longitude);
    const end = normalizeAngle(cusps[(index + 1) % 12].longitude);
    const span = normalizeAngle(end - start);
    const offset = normalizeAngle(lon - start);
    if (span > 0 && offset < span) return cusps[index].house;
  }
  return 1;
}

export interface AspectPoint {
  key: PlanetKey;
  name: string;
  longitude: number;
  theme: string;
}

export function findAspects(points: AspectPoint[]): AspectResult[] {
  const results: AspectResult[] = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const raw = Math.abs(normalizeAngle(a.longitude) - normalizeAngle(b.longitude));
      const separation = raw > 180 ? 360 - raw : raw;
      let best: { definition: AspectDefinition; orb: number } | null = null;
      for (const definition of ASPECTS) {
        const orb = Math.abs(separation - definition.angle);
        if (orb <= definition.orb && (!best || orb < best.orb)) {
          best = { definition, orb };
        }
      }
      if (!best) continue;
      const { definition, orb } = best;
      results.push({
        a: a.key,
        b: b.key,
        aName: a.name,
        bName: b.name,
        type: definition.type,
        name: definition.name,
        symbol: definition.symbol,
        angle: definition.angle,
        orb: Math.round(orb * 10) / 10,
        nature: definition.nature,
        description: definition.description,
        sentence: `${a.name} ${definition.verb} ${b.name} : ${a.theme} et ${b.theme} se rencontrent.`,
      });
    }
  }
  return results.sort((a, b) => a.orb - b.orb);
}

function stableSignForBody(
  key: PlanetKey,
  start: Date,
  end: Date,
): { sign: SignData | null; stable: boolean } {
  const samples = [0, 0.25, 0.5, 0.75, 1].map(
    (fraction) => new Date(start.getTime() + (end.getTime() - start.getTime()) * fraction),
  );
  const signs = samples.map((date) => signFromLongitude(bodyLongitude(key, date)));
  const stable = signs.every((sign) => sign.index === signs[0].index);
  return { sign: stable ? signs[0] : null, stable };
}

function nextISODate(dateISO: string): string {
  const [year, month, day] = dateISO.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
    date.getUTCDate(),
  ).padStart(2, '0')}`;
}

function computeElementBalance(planets: PlanetPlacement[]): ElementBalance[] {
  const known = planets.filter((planet) => planet.sign !== null);
  const denominator = known.length || 1;
  return ELEMENTS.map((element) => {
    const count = known.filter((planet) => planet.sign?.element === element).length;
    return { element, count, percent: Math.round((count / denominator) * 100) };
  });
}

function computeQualityBalance(
  planets: PlanetPlacement[],
): Array<{ quality: string; count: number; percent: number }> {
  const known = planets.filter((planet) => planet.sign !== null);
  const denominator = known.length || 1;
  return ['Cardinal', 'Fixe', 'Mutable'].map((quality) => {
    const count = known.filter((planet) => planet.sign?.quality === quality).length;
    return { quality, count, percent: Math.round((count / denominator) * 100) };
  });
}

export function computeAstrology(input: AstrologyInput): AstrologyResult {
  const { place } = input;
  if (!place || !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) {
    throw new AstrologyError('Le lieu de naissance est nécessaire pour calculer le thème.');
  }
  if (input.timeKnown && !input.birthTime) {
    throw new AstrologyError('L’heure de naissance est nécessaire pour un thème complet.');
  }

  const localSummary = input.timeKnown
    ? `${formatDateFr(input.birthDate)} à ${formatClockFr(input.birthTime ?? '')}, ${place.name}`
    : `${formatDateFr(input.birthDate)} — heure inconnue, ${place.name}`;

  if (!input.timeKnown) {
    const start = zonedTimeToUtc(input.birthDate, '00:00', place.timezone);
    let end: Date;
    try {
      end = zonedTimeToUtc(nextISODate(input.birthDate), '00:00', place.timezone);
    } catch {
      end = new Date(start.getTime() + 24 * 3600_000);
    }

    const planets: PlanetPlacement[] = PLANETS.map((planet) => {
      const { sign, stable } = stableSignForBody(planet.key, start, end);
      return {
        key: planet.key,
        name: planet.name,
        glyph: planet.glyph,
        theme: planet.theme,
        description: planet.description,
        longitude: null,
        sign,
        degree: null,
        minute: null,
        formatted: sign ? `${sign.name} (signe stable)` : 'Signe indéterminé ce jour-là',
        house: null,
        retrograde: false,
        stable,
      };
    });

    const sun = planets.find((planet) => planet.key === 'sun');
    const moon = planets.find((planet) => planet.key === 'moon');

    return {
      input,
      unknownTime: true,
      utc: null,
      localSummary,
      place,
      planets,
      angles: null,
      houses: null,
      houseSystem: null,
      houseSystemNote: null,
      aspects: [],
      sunSign: sun?.sign ?? null,
      moonSign: moon?.sign ?? null,
      risingSign: null,
      chartRuler: null,
      elementBalance: null,
      qualityBalance: null,
    };
  }

  const utc = zonedTimeToUtc(input.birthDate, input.birthTime ?? '00:00', place.timezone);
  const calculation = computePlacidusHouses(utc, place.latitude, place.longitude);

  const planets: PlanetPlacement[] = PLANETS.map((planet) => {
    const longitude = bodyLongitude(planet.key, utc);
    const { sign, degree, minute } = degreeParts(longitude);
    return {
      key: planet.key,
      name: planet.name,
      glyph: planet.glyph,
      theme: planet.theme,
      description: planet.description,
      longitude,
      sign,
      degree,
      minute,
      formatted: `${degree}°${String(minute).padStart(2, '0')}' ${sign.name}`,
      house: houseForLongitude(longitude, calculation.cusps),
      retrograde: isRetrograde(planet.key, utc),
      stable: true,
    };
  });

  const ascendant = anglePlacement(
    'ascendant',
    'Ascendant',
    calculation.angles.ascendant.longitude,
  );
  const midheaven = anglePlacement('midheaven', 'Milieu du Ciel', calculation.angles.mc.longitude);
  const descendant = anglePlacement(
    'descendant',
    'Descendant',
    calculation.angles.descendant.longitude,
  );
  const imumCoeli = anglePlacement('imumCoeli', 'Fond du Ciel', calculation.angles.ic.longitude);

  const houses: HousePlacement[] = calculation.cusps.map((cusp) => {
    const { sign, degree, minute } = degreeParts(cusp.longitude);
    const houseInfo = HOUSES.find((house) => house.number === cusp.house);
    return {
      number: cusp.house,
      title: houseInfo?.title ?? `Maison ${cusp.house}`,
      theme: houseInfo?.theme ?? '',
      longitude: cusp.longitude,
      sign,
      degree,
      minute,
      formatted: `${degree}°${String(minute).padStart(2, '0')}' ${sign.name}`,
    };
  });

  const points: AspectPoint[] = planets.map((planet) => ({
    key: planet.key,
    name: planet.name,
    longitude: planet.longitude ?? 0,
    theme: planet.theme,
  }));
  const aspects = findAspects(points);

  const elementBalance = computeElementBalance(planets);
  const qualityBalance = computeQualityBalance(planets);

  return {
    input,
    unknownTime: false,
    utc,
    localSummary,
    place,
    planets,
    angles: { ascendant, midheaven, descendant, imumCoeli },
    houses,
    houseSystem: calculation.system === 'placidus' ? 'placidus' : 'whole',
    houseSystemNote: calculation.fallback ?? null,
    aspects,
    sunSign: planets.find((planet) => planet.key === 'sun')?.sign ?? null,
    moonSign: planets.find((planet) => planet.key === 'moon')?.sign ?? null,
    risingSign: ascendant.sign,
    chartRuler: ascendant.sign.ruler,
    elementBalance,
    qualityBalance,
  };
}



/** Exporté pour les tests : la balance élémentaire d’un jeu de planètes. */
export function elementBalanceOf(planets: PlanetPlacement[]): ElementBalance[] {
  return computeElementBalance(planets);
}

/** Exporté pour les tests : la roue des signes, sans dépendance à l’heure. */
export function signOfLongitude(longitude: number): SignData {
  return signFromLongitude(longitude);
}

export { SIGNS };
