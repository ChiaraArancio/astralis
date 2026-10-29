import { describe, expect, it } from 'vitest';
import { computeChart } from 'free-human-design';
import { computeHumanDesign, definitionComponents, type HdChannel } from './engine';
import { mapLongitudeDegrees } from './gate-mapping';
import type { BirthPlace } from '../geo';

const BANGKOK: BirthPlace = {
  name: 'Bangkok',
  country: 'Thaïlande',
  longitude: 100.5,
  latitude: 13.75,
  timezone: 'Asia/Bangkok',
};

describe('Human Design', () => {
  it('calcule le profil de référence 1972-08-02 14:30 Bangkok', () => {
    const result = computeHumanDesign({
      firstName: 'Test',
      birthDate: '1972-08-02',
      birthTime: '14:30',
      place: BANGKOK,
    });
    expect(result.typeInfo.key).toBe('Manifesting Generator');
    expect(result.authorityInfo.key).toBe('Sacral');
    expect(result.profile).toBe('3/5');
    expect(result.channels).toHaveLength(6);
    expect(result.activations.personality).toHaveLength(13);
    expect(result.activations.design).toHaveLength(13);
    expect(result.gates.length).toBeGreaterThan(0);
    expect(result.definitionCount).toBeGreaterThan(0);
  });

  it('reste cohérent avec le moteur de référence sur plusieurs dates', () => {
    const cases = [
      { date: '1972-08-02', time: '14:30', place: BANGKOK },
      {
        date: '1994-10-14',
        time: '18:42',
        place: { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
      },
      {
        date: '1994-10-14',
        time: '18:42',
        place: { name: 'Lyon', country: 'France', latitude: 45.77, longitude: 4.83, timezone: 'Europe/Paris' },
      },
      {
        date: '2000-01-01',
        time: '12:00',
        place: { name: 'Greenwich', country: 'Royaume-Uni', latitude: 51.4779, longitude: 0, timezone: 'UTC' },
      },
      {
        date: '1988-05-23',
        time: '04:12',
        place: { name: 'Montréal', country: 'Canada', latitude: 45.5019, longitude: -73.5674, timezone: 'America/Toronto' },
      },
    ];

    for (const testCase of cases) {
      const ours = computeHumanDesign({
        firstName: 'Test',
        birthDate: testCase.date,
        birthTime: testCase.time,
        place: testCase.place,
      });
      const reference = computeChart({
        birthdate: testCase.date,
        birthtime: testCase.time,
        timezone: testCase.place.timezone,
        location: { lat: testCase.place.latitude, lng: testCase.place.longitude },
      });
      const referenceGates = [...new Set(reference.humanDesign.activatedGates)].sort((a, b) => a - b);
      const ourGates = [...new Set(ours.activations.personality.concat(ours.activations.design).map((entry) => entry.gate))].sort(
        (a, b) => a - b,
      );
      expect(ours.typeInfo.key).toBe(reference.humanDesign.type);
      expect(ours.authorityInfo.key).toBe(reference.humanDesign.authority);
      expect(ours.profile).toBe(reference.humanDesign.profile);
      expect(ourGates).toEqual(referenceGates);
      expect(ours.channels.map((channel) => channel.key).sort()).toEqual(
        reference.humanDesign.definedChannels.map((channel) => channel.key).sort(),
      );
    }
  });

  it('applique la correspondance longitude → porte/ligne', () => {
    expect(mapLongitudeDegrees(130.092)).toMatchObject({ hexagram: 33, line: 3 });
  });

  it('refuse une heure inconnue sans inventer de profil', () => {
    expect(() =>
      computeHumanDesign({
        firstName: 'Test',
        birthDate: '1990-01-01',
        birthTime: '',
        place: BANGKOK,
      }),
    ).toThrow(/heure exacte/i);
  });

  it('compte les composantes de définition', () => {
    const channels: HdChannel[] = [
      { key: '1-8', gates: [1, 8], name: '', description: '', centers: ['g', 'throat'] },
      { key: '2-14', gates: [2, 14], name: '', description: '', centers: ['g', 'sacral'] },
      { key: '3-60', gates: [3, 60], name: '', description: '', centers: ['sacral', 'root'] },
    ];
    expect(definitionComponents(channels, ['g', 'throat', 'sacral', 'root'])).toBe(1);
    expect(definitionComponents([], [])).toBe(0);
    expect(
      definitionComponents(
        [{ key: '4-63', gates: [4, 63], name: '', description: '', centers: ['ajna', 'head'] }],
        ['ajna', 'head', 'root'],
      ),
    ).toBe(2);
  });
});
