declare module 'free-human-design' {
  export interface HouseCusp {
    house: number;
    longitude: number;
    sign: string;
    signIndex: number;
    degInSign: number;
  }

  export interface ZodiacPoint {
    longitude: number;
    sign: string;
    signIndex: number;
    degInSign: number;
    gateLine?: { gate: number; line: number };
  }

  export interface ChartAngles {
    ascendant: ZodiacPoint;
    descendant: ZodiacPoint;
    mc: ZodiacPoint;
    ic: ZodiacPoint;
  }

  export interface Houses {
    system: string;
    requestedSystem: string;
    fallback?: string;
    cusps: HouseCusp[];
    angles: ChartAngles;
  }

  export interface HouseInput {
    jdUT: number;
    lat: number;
    lng: number;
    system?: 'placidus' | 'whole' | 'equal';
  }

  export function computeHouses(input: HouseInput): Houses;
  export function computeAngles(input: Omit<HouseInput, 'system'>): ChartAngles;

  export interface Activation {
    body: string;
    gate: number;
    line: number;
    color: number;
    longitude: number;
    stream?: 'personality' | 'design';
    retrograde?: boolean;
  }

  export interface Activations {
    personality: Activation[];
    design: Activation[];
  }

  export interface DefinedChannel {
    key: string;
    gates: [number, number];
    centers: [string, string];
    name: string | null;
  }

  export interface Bodygraph {
    type: string;
    authority: string;
    profile: string | null;
    definitionCount: number;
    activatedGates: number[];
    definedChannels: DefinedChannel[];
    definedCenters: string[];
    openCenters: string[];
    centers: Record<string, boolean>;
    gateActivations: Record<
      number,
      Array<{ stream: 'personality' | 'design'; body: string; line: number }>
    >;
  }

  export interface HumanDesignChart {
    type: string;
    authority: string;
    profile: string | null;
    definitionCount: number;
    activations: Activations;
    activatedGates: number[];
    definedChannels: DefinedChannel[];
    definedCenters: string[];
    openCenters: string[];
    centers: Record<string, boolean>;
    gateActivations: Record<
      number,
      Array<{ stream: 'personality' | 'design'; body: string; line: number }>
    >;
  }

  export interface ComputeChartInput {
    birthdate: string;
    birthtime: string;
    timezone: string;
    location?: { lat: number; lng: number };
    houseSystem?: 'placidus' | 'whole' | 'equal';
    midpoints?: boolean;
  }

  export interface ComputeChartResult {
    input: {
      birthdate: string;
      birthtime: string;
      timezone: string;
      birth_utc: string;
      location?: { lat: number; lng: number; city?: string; source?: string };
    };
    geneKeys: { spheres: Record<string, { gk: number; line: number }> };
    humanDesign: HumanDesignChart;
    astrology: {
      location: { lat: number; lng: number; city?: string };
      angles: ChartAngles;
      houses: Houses;
    } | null;
    _meta: Record<string, unknown>;
  }

  export function computeChart(input: ComputeChartInput): ComputeChartResult;
  export function computeActivations(input: { birthUtc: Date }): Activations;
  export function computeBodygraph(activations: Activations): Bodygraph;
  export function mapLongitudeDegrees(longitude: number): {
    hexagram: number;
    line: number;
    color: number;
  };
  export function normalizeAngleDegrees(angle: number): number;

  export const CENTERS: string[];
  export const CENTER_LABELS: Record<string, string>;
  export const GATE_CENTER: Record<number, string>;
  export const CHANNELS: DefinedChannel[];
  export const SIGNS: string[];
  export function signOf(longitude: number): {
    sign: string;
    signIndex: number;
    degInSign: number;
  };
}
