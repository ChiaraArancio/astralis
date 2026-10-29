/**
 * Correspondance longitude tropicale → porte / ligne du mandala Human Design.
 * Algorithme de la roue des 64 hexagrammes, adapté de free-human-design (MIT).
 */

const PI2 = Math.PI * 2;
const HEX_WIDTH = PI2 / 64;
const LINE_WIDTH = HEX_WIDTH / 6;
const COLOR_WIDTH = LINE_WIDTH / 6;
const TONE_WIDTH = COLOR_WIDTH / 6;
const BASE_WIDTH = TONE_WIDTH / 5;
const DEG_TO_RADIANS = Math.PI / 180;
const LINE_SEGMENT = 1 / 6;

const ICHING_MAP = [
  55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8,
  20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56, 31, 33, 7, 4, 29,
  59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14,
  34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60, 41, 19, 13, 49, 30,
];

function neutronStreamPosition(radians: number): number {
  const offset = 2 * LINE_WIDTH - 1 * COLOR_WIDTH - 1 * TONE_WIDTH + 3 * BASE_WIDTH;
  const offsetCalculation = ((360 * DEG_TO_RADIANS) / 64) * 5 + offset;
  return (((radians + offsetCalculation) / PI2) * 64) % 64;
}

function mapOnHexagram(fractalLine: number): { hexagram: number; line: number; color: number } {
  const bin = Math.floor(fractalLine);
  const hexagram = ICHING_MAP[bin];
  const remainder = fractalLine - bin;
  const line = Math.floor(remainder / LINE_SEGMENT) + 1;
  const colorBucket = remainder - LINE_SEGMENT * Math.floor(remainder / LINE_SEGMENT);
  const color = Math.floor(colorBucket / LINE_SEGMENT) + 1;
  return { hexagram, line, color };
}

export function normalizeAngleDegrees(angle: number): number {
  const out = angle % 360;
  return out < 0 ? out + 360 : out;
}

export function mapLongitudeDegrees(longitude: number): {
  hexagram: number;
  line: number;
  color: number;
} {
  const lon = normalizeAngleDegrees(longitude);
  return mapOnHexagram(neutronStreamPosition(lon * DEG_TO_RADIANS));
}
