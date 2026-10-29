import { describe, expect, it } from 'vitest';
import {
  formatDateFr,
  formatOffset,
  getTimeZoneOffsetMinutes,
  getUtcCandidates,
  julianDayUT,
  zonedTimeToUtc,
} from './timezone';

describe('conversion des fuseaux horaires', () => {
  it('convertit une heure d’été parisienne en UTC', () => {
    const date = zonedTimeToUtc('1994-08-14', '18:42', 'Europe/Paris');
    expect(date.toISOString()).toBe('1994-08-14T16:42:00.000Z');
  });

  it('convertit une heure d’hiver parisienne en UTC', () => {
    const date = zonedTimeToUtc('1994-01-14', '18:42', 'Europe/Paris');
    expect(date.toISOString()).toBe('1994-01-14T17:42:00.000Z');
  });

  it('refuse une heure inexistante lors du passage à l’heure d’été', () => {
    expect(() => zonedTimeToUtc('2024-03-31', '02:30', 'Europe/Paris')).toThrow(
      /n’existe pas/i,
    );
  });

  it('retourne les deux occurrences d’une heure ambiguë', () => {
    const candidates = getUtcCandidates('2024-10-27', '02:30', 'Europe/Paris');
    expect(candidates).toHaveLength(2);
    expect(candidates[0].toISOString()).toBe('2024-10-27T00:30:00.000Z');
    expect(candidates[1].toISOString()).toBe('2024-10-27T01:30:00.000Z');
  });

  it('calcule le décalage historique', () => {
    expect(getTimeZoneOffsetMinutes(new Date('1994-08-14T16:42:00Z'), 'Europe/Paris')).toBe(120);
    expect(getTimeZoneOffsetMinutes(new Date('1994-01-14T17:42:00Z'), 'Europe/Paris')).toBe(60);
  });

  it('formate les décalages', () => {
    expect(formatOffset(120)).toBe('UTC+02:00');
    expect(formatOffset(-300)).toBe('UTC−05:00');
  });

  it('calcule le jour julien de référence J2000', () => {
    expect(julianDayUT(new Date('2000-01-01T12:00:00Z'))).toBeCloseTo(2451545.0, 6);
  });

  it('formate les dates en français sans décalage', () => {
    expect(formatDateFr('1994-10-14')).toContain('14 octobre 1994');
  });
});
