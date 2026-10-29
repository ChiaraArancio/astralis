import type { AstrologyInput } from './astrology/engine';
import type { HumanDesignInput } from './humandesign/engine';
import type { NumerologyInput } from './numerology/core';

const KEYS = {
  astrology: 'astralis:astrology-input:v1',
  numerology: 'astralis:numerology-input:v1',
  humanDesign: 'astralis:human-design-input:v1',
} as const;

type Discipline = keyof typeof KEYS;

function read<T>(discipline: Discipline): T | null {
  try {
    const raw = sessionStorage.getItem(KEYS[discipline]);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function write<T>(discipline: Discipline, value: T): void {
  try {
    sessionStorage.setItem(KEYS[discipline], JSON.stringify(value));
  } catch {
    // Le stockage de session peut être désactivé (navigation privée stricte).
    // Dans ce cas, le formulaire fonctionne mais les résultats ne survivent pas
    // à un rechargement de page.
  }
}

export function saveAstrologyInput(input: AstrologyInput): void {
  write('astrology', input);
}

export function loadAstrologyInput(): AstrologyInput | null {
  const value = read<AstrologyInput>('astrology');
  if (!value || typeof value.firstName !== 'string' || typeof value.birthDate !== 'string') {
    return null;
  }
  return value;
}

export function saveNumerologyInput(input: NumerologyInput): void {
  write('numerology', input);
}

export function loadNumerologyInput(): NumerologyInput | null {
  const value = read<NumerologyInput>('numerology');
  if (!value || typeof value.firstName !== 'string' || typeof value.birthDate !== 'string') {
    return null;
  }
  return value;
}

export function saveHumanDesignInput(input: HumanDesignInput): void {
  write('humanDesign', input);
}

export function loadHumanDesignInput(): HumanDesignInput | null {
  const value = read<HumanDesignInput>('humanDesign');
  if (!value || typeof value.firstName !== 'string' || typeof value.birthDate !== 'string') {
    return null;
  }
  return value;
}

export function clearDiscipline(discipline: Discipline): void {
  try {
    sessionStorage.removeItem(KEYS[discipline]);
  } catch {
    // Rien à faire.
  }
}

export function clearAllProfileData(): void {
  for (const discipline of Object.keys(KEYS) as Discipline[]) clearDiscipline(discipline);
}

export type StoredDiscipline = Discipline;
