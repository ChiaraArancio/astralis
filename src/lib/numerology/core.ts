export const MASTER_NUMBERS = [11, 22, 33] as const;
export type MasterNumber = (typeof MASTER_NUMBERS)[number];
export type CoreNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NumerologyNumber = CoreNumber | MasterNumber;

export const PYTHAGOREAN_TABLE: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

export interface NumerologyInput {
  firstName: string;
  lastName: string;
  birthDate: string;
  referenceYear?: number;
}

export interface CalculationTrace {
  raw: number;
  reduced: NumerologyNumber | 0;
  expression: string;
}

export interface NumerologyPillar {
  key: 'lifePath' | 'expression' | 'soulUrge' | 'personality' | 'maturity';
  label: string;
  number: NumerologyNumber | 0;
  trace: CalculationTrace;
}

export interface PersonalYear {
  year: number;
  number: NumerologyNumber | 0;
  trace: CalculationTrace;
}

export interface NumerologyResult {
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  referenceYear: number;
  lifePath: NumerologyPillar;
  expression: NumerologyPillar;
  soulUrge: NumerologyPillar;
  personality: NumerologyPillar;
  maturity: NumerologyPillar;
  personalYear: PersonalYear;
  inclusionGrid: number[];
  missingNumbers: CoreNumber[];
  dominantNumbers: CoreNumber[];
  hasMasterNumber: boolean;
  masterNumbers: MasterNumber[];
}

/**
 * Réduction théosophique pythagoricienne. Les nombres 11, 22 et 33 sont
 * conservés lorsqu'ils apparaissent, conformément à la tradition des nombres
 * maîtres. Un nombre comme 44 est ensuite réduit (4 + 4 = 8).
 */
export function reduceNumber(value: number): NumerologyNumber | 0 {
  if (!Number.isFinite(value) || value <= 0) return 0;
  let current = Math.abs(Math.trunc(value));
  while (current > 9) {
    if ((MASTER_NUMBERS as readonly number[]).includes(current)) {
      return current as MasterNumber;
    }
    current = String(current)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current as CoreNumber;
}

export function digitalRoot(value: number): CoreNumber {
  const reduced = reduceNumber(value);
  if (reduced === 0) return 0 as CoreNumber;
  if ((MASTER_NUMBERS as readonly number[]).includes(reduced)) {
    return reduceNumber(
      String(reduced)
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0),
    ) as CoreNumber;
  }
  return reduced as CoreNumber;
}

/** Normalise les lettres sans perdre la trace des ligatures (œ → OE). */
export function normalizeName(value: string): string {
  return value
    .replace(/œ/gi, 'OE')
    .replace(/æ/gi, 'AE')
    .replace(/ß/g, 'SS')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

export function lettersOf(value: string): string[] {
  return [...normalizeName(value)];
}

export function letterValue(letter: string): number {
  return PYTHAGOREAN_TABLE[letter.toUpperCase()] ?? 0;
}

export function sumName(
  value: string,
  filter: 'all' | 'vowels' | 'consonants' = 'all',
): { raw: number; letters: string[]; values: number[] } {
  const letters = lettersOf(value).filter((letter) => {
    if (filter === 'vowels') return VOWELS.has(letter);
    if (filter === 'consonants') return !VOWELS.has(letter);
    return true;
  });
  const values = letters.map(letterValue);
  return { raw: values.reduce((sum, entry) => sum + entry, 0), letters, values };
}

export function dateDigits(dateISO: string): number[] {
  return dateISO
    .replace(/\D/g, '')
    .split('')
    .map((digit) => Number(digit))
    .filter((digit) => Number.isFinite(digit));
}

function makeTrace(raw: number, reduced: NumerologyNumber | 0, expression: string): CalculationTrace {
  return { raw, reduced, expression };
}

export function lifePathNumber(dateISO: string): CalculationTrace {
  const digits = dateDigits(dateISO);
  const raw = digits.reduce((sum, digit) => sum + digit, 0);
  const reduced = reduceNumber(raw);
  const expression = `${digits.join(' + ')} = ${raw}${raw !== reduced ? ` → ${reduced}` : ''}`;
  return makeTrace(raw, reduced, expression);
}

export function nameNumber(
  name: string,
  filter: 'all' | 'vowels' | 'consonants' = 'all',
): CalculationTrace {
  const { raw, letters, values } = sumName(name, filter);
  const reduced = reduceNumber(raw);
  const visible = letters.slice(0, 18);
  const expression =
    visible.length > 0
      ? `${visible.map((letter, index) => `${letter}(${values[index]})`).join(' + ')}${
          letters.length > visible.length ? ' + …' : ''
        } = ${raw}${raw !== reduced ? ` → ${reduced}` : ''}`
      : 'Aucune lettre correspondante';
  return makeTrace(raw, reduced, expression);
}

export function personalYearNumber(
  dateISO: string,
  referenceYear = new Date().getFullYear(),
): CalculationTrace {
  const parts = dateISO.split('-').map(Number);
  const day = reduceNumber(parts[2] ?? 1);
  const month = reduceNumber(parts[1] ?? 1);
  const year = reduceNumber(referenceYear);
  const raw = Number(day) + Number(month) + Number(year);
  const reduced = reduceNumber(raw);
  const expression = `${day} (jour) + ${month} (mois) + ${year} (année ${referenceYear}) = ${raw}${
    raw !== reduced ? ` → ${reduced}` : ''
  }`;
  return makeTrace(raw, reduced, expression);
}

export function inclusionGrid(fullName: string, dateISO: string): number[] {
  const counts = Array.from({ length: 9 }, () => 0);
  const values = [...lettersOf(fullName).map(letterValue), ...dateDigits(dateISO)];
  for (const value of values) {
    if (value >= 1 && value <= 9) counts[value - 1] += 1;
  }
  return counts;
}

export function computeNumerology(input: NumerologyInput): NumerologyResult {
  const firstName = input.firstName.trim().replace(/\s+/g, ' ');
  const lastName = input.lastName.trim().replace(/\s+/g, ' ');
  const fullName = `${firstName} ${lastName}`.trim();
  const referenceYear = input.referenceYear ?? new Date().getFullYear();

  const lifePathTrace = lifePathNumber(input.birthDate);
  const expressionTrace = nameNumber(fullName, 'all');
  const soulTrace = nameNumber(fullName, 'vowels');
  const personalityTrace = nameNumber(fullName, 'consonants');

  const maturityRaw =
    Number(lifePathTrace.reduced) + Number(expressionTrace.reduced);
  const maturityReduced = reduceNumber(maturityRaw);
  const maturityTrace = makeTrace(
    maturityRaw,
    maturityReduced,
    `${lifePathTrace.reduced} (chemin de vie) + ${expressionTrace.reduced} (expression) = ${maturityRaw}${
      maturityRaw !== maturityReduced ? ` → ${maturityReduced}` : ''
    }`,
  );

  const personalYearTrace = personalYearNumber(input.birthDate, referenceYear);
  const grid = inclusionGrid(fullName, input.birthDate);
  const missing = grid
    .map((count, index) => ({ count, number: (index + 1) as CoreNumber }))
    .filter((entry) => entry.count === 0)
    .map((entry) => entry.number);
  const max = Math.max(...grid);
  const dominant = grid
    .map((count, index) => ({ count, number: (index + 1) as CoreNumber }))
    .filter((entry) => entry.count === max && max > 0)
    .map((entry) => entry.number);

  const allNumbers = [
    lifePathTrace.reduced,
    expressionTrace.reduced,
    soulTrace.reduced,
    personalityTrace.reduced,
    maturityReduced,
    personalYearTrace.reduced,
  ];
  const masters = [...new Set(allNumbers)].filter((value): value is MasterNumber =>
    value === 11 || value === 22 || value === 33,
  );

  return {
    firstName,
    lastName,
    fullName,
    birthDate: input.birthDate,
    referenceYear,
    lifePath: {
      key: 'lifePath',
      label: 'Chemin de vie',
      number: lifePathTrace.reduced,
      trace: lifePathTrace,
    },
    expression: {
      key: 'expression',
      label: 'Expression',
      number: expressionTrace.reduced,
      trace: expressionTrace,
    },
    soulUrge: {
      key: 'soulUrge',
      label: 'Élan spirituel',
      number: soulTrace.reduced,
      trace: soulTrace,
    },
    personality: {
      key: 'personality',
      label: 'Personnalité',
      number: personalityTrace.reduced,
      trace: personalityTrace,
    },
    maturity: {
      key: 'maturity',
      label: 'Maturité',
      number: maturityReduced,
      trace: maturityTrace,
    },
    personalYear: {
      year: referenceYear,
      number: personalYearTrace.reduced,
      trace: personalYearTrace,
    },
    inclusionGrid: grid,
    missingNumbers: missing,
    dominantNumbers: dominant,
    hasMasterNumber: masters.length > 0,
    masterNumbers: masters,
  };
}

export function numberLabel(value: NumerologyNumber | 0): string {
  if (value === 0) return '—';
  if ((MASTER_NUMBERS as readonly number[]).includes(value)) {
    return `${value} / ${digitalRoot(value)}`;
  }
  return String(value);
}
