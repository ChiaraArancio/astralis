/**
 * Conversions de dates civiles ↔ UTC, sans dépendance externe.
 *
 * Les fuseaux IANA sont fournis par le moteur JavaScript via `Intl`. Cela
 * couvre l'heure d'été historique sur macOS, Windows et la plupart des
 * navigateurs modernes. Les dates antérieures à 1900 restent hors du champ
 * de l'application (les bases de fuseaux historiques sont moins fiables).
 */

export class InvalidZonedTimeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidZonedTimeError';
  }
}

export interface DateParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const CLOCK = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/;

export function parseISODate(value: string): DateParts | null {
  const match = ISO_DATE.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day, hour: 0, minute: 0, second: 0 };
}

export function parseClock(value: string): { hour: number; minute: number; second: number } | null {
  const match = CLOCK.exec(value.trim());
  if (!match) return null;
  return {
    hour: Number(match[1]),
    minute: Number(match[2]),
    second: match[3] ? Number(match[3]) : 0,
  };
}

export function isValidISODate(value: string): boolean {
  return parseISODate(value) !== null;
}

export function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isValidBirthDate(value: string): boolean {
  if (!isValidISODate(value)) return false;
  const parts = parseISODate(value);
  if (!parts) return false;
  const stamp = Date.UTC(parts.year, parts.month - 1, parts.day);
  const min = Date.UTC(1900, 0, 1);
  const max = Date.now();
  return stamp >= min && stamp <= max;
}

/** Décalage du fuseau (minutes à l'est d'UTC) pour un instant donné. */
export function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? '0');
  const asUTC = Date.UTC(
    get('year'),
    get('month') - 1,
    get('day'),
    get('hour'),
    get('minute'),
    get('second'),
  );
  return Math.round((asUTC - date.getTime()) / 60000);
}

function partsInZone(timestamp: number, timeZone: string): DateParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = formatter.formatToParts(new Date(timestamp));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? '0');
  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  };
}

function sameCivilTime(a: DateParts, b: DateParts): boolean {
  return (
    a.year === b.year &&
    a.month === b.month &&
    a.day === b.day &&
    a.hour === b.hour &&
    a.minute === b.minute
  );
}

/**
 * Convertit une heure civile locale en instants UTC candidats.
 * Gère les changements d'heure : retourne [] pour une heure inexistante
 * (saut de printemps) et les deux occurrences pour une heure ambiguë
 * (retour d'automne).
 */
export function getUtcCandidates(
  dateISO: string,
  time: string,
  timeZone: string,
): Date[] {
  const dateParts = parseISODate(dateISO);
  const clock = parseClock(time);
  if (!dateParts || !clock) {
    throw new InvalidZonedTimeError('La date ou l’heure de naissance est invalide.');
  }

  let zone: Intl.DateTimeFormat;
  try {
    zone = new Intl.DateTimeFormat('en-US', { timeZone });
  } catch {
    throw new InvalidZonedTimeError(`Le fuseau horaire « ${timeZone} » est inconnu.`);
  }
  void zone;

  const wanted: DateParts = { ...dateParts, ...clock };
  const localAsUTC = Date.UTC(
    wanted.year,
    wanted.month - 1,
    wanted.day,
    wanted.hour,
    wanted.minute,
    wanted.second,
  );

  const probes = [0, -6, 6, -12, 12, -24, 24, -48, 48];
  const offsets = new Set<number>();
  for (const hours of probes) {
    offsets.add(getTimeZoneOffsetMinutes(new Date(localAsUTC + hours * 3600_000), timeZone));
  }

  const candidates: Date[] = [];
  for (const offset of offsets) {
    const timestamp = localAsUTC - offset * 60_000;
    if (sameCivilTime(partsInZone(timestamp, timeZone), wanted)) {
      candidates.push(new Date(timestamp));
    }
  }

  const unique = [...new Map(candidates.map((date) => [date.getTime(), date])).values()].sort(
    (a, b) => a.getTime() - b.getTime(),
  );
  return unique;
}

/**
 * Convertit une heure civile en Date UTC. En cas d'heure ambiguë (changement
 * d'heure d'automne), la première occurrence est retenue, comme le fait la
 * convention des éphémérides pour une naissance déclarée sans précision.
 */
export function zonedTimeToUtc(dateISO: string, time: string, timeZone: string): Date {
  const candidates = getUtcCandidates(dateISO, time, timeZone);
  if (candidates.length === 0) {
    throw new InvalidZonedTimeError(
      `Cette heure n’existe pas dans le fuseau ${timeZone} : elle est probablement située dans le saut du passage à l’heure d’été. Vérifiez l’heure indiquée sur l’acte de naissance.`,
    );
  }
  return candidates[0];
}

export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '−';
  const absolute = Math.abs(minutes);
  const hours = String(Math.floor(absolute / 60)).padStart(2, '0');
  const mins = String(absolute % 60).padStart(2, '0');
  return `UTC${sign}${hours}:${mins}`;
}

export function formatOffsetForDate(dateISO: string, time: string, timeZone: string): string {
  try {
    const date = zonedTimeToUtc(dateISO, time, timeZone);
    return formatOffset(getTimeZoneOffsetMinutes(date, timeZone));
  } catch {
    return 'fuseau à vérifier';
  }
}

/** Affiche une date ISO en français, sans décalage de fuseau. */
export function formatDateFr(dateISO: string, options?: Intl.DateTimeFormatOptions): string {
  const parts = parseISODate(dateISO);
  if (!parts) return dateISO;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)));
}

export function formatDateShortFr(dateISO: string): string {
  return formatDateFr(dateISO, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatClockFr(time: string): string {
  const parsed = parseClock(time);
  if (!parsed) return time;
  return `${String(parsed.hour).padStart(2, '0')}h${String(parsed.minute).padStart(2, '0')}`;
}

export function julianDayUT(date: Date): number {
  return date.getTime() / 86_400_000 + 2_440_587.5;
}

export function ageAtDate(birthDateISO: string, reference = new Date()): number | null {
  const parts = parseISODate(birthDateISO);
  if (!parts) return null;
  let age = reference.getUTCFullYear() - parts.year;
  const month = reference.getUTCMonth() + 1;
  if (month < parts.month || (month === parts.month && reference.getUTCDate() < parts.day)) {
    age -= 1;
  }
  return age;
}
