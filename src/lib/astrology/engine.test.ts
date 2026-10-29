import { describe, expect, it } from 'vitest';
import { computeHouses as referenceHouses } from 'free-human-design';
import { computeAstrology, findAspects, meanNodeLongitude } from './engine';
import { computePlacidusHouses } from './houses';
import type { BirthPlace } from '../geo';

const GREENWICH: BirthPlace = {
  name: 'Greenwich',
  country: 'Royaume-Uni',
  latitude: 51.4779,
  longitude: 0,
  timezone: 'UTC',
};

const PARIS: BirthPlace = {
  name: 'Paris',
  country: 'France',
  latitude: 48.8566,
  longitude: 2.3522,
  timezone: 'Europe/Paris',
};

describe('calculs astrologiques', () => {
  it('place le Soleil et la Lune au 1er janvier 2000', () => {
    const result = computeAstrology({
      firstName: 'Test',
      birthDate: '2000-01-01',
      birthTime: '12:00',
      timeKnown: true,
      place: GREENWICH,
    });
    const sun = result.planets.find((planet) => planet.key === 'sun');
    const moon = result.planets.find((planet) => planet.key === 'moon');
    expect(sun?.longitude).toBeCloseTo(280.3687, 1);
    expect(sun?.sign?.name).toBe('Capricorne');
    expect(moon?.longitude).toBeCloseTo(223.3239, 1);
    expect(moon?.sign?.name).toBe('Scorpion');
    expect(result.unknownTime).toBe(false);
  });

  it('produit des maisons cohérentes et comparables à la référence', () => {
    const date = new Date('2000-01-01T12:00:00Z');
    const local = computePlacidusHouses(date, GREENWICH.latitude, GREENWICH.longitude);
    const reference = referenceHouses({
      jdUT: date.getTime() / 86400000 + 2440587.5,
      lat: GREENWICH.latitude,
      lng: GREENWICH.longitude,
      system: 'placidus',
    });
    expect(local.cusps[0].longitude).toBeCloseTo(reference.cusps[0].longitude, 2);
    expect(local.cusps[9].longitude).toBeCloseTo(reference.cusps[9].longitude, 2);
    expect(local.cusps[0].longitude).toBeCloseTo(local.angles.ascendant.longitude, 6);
    expect(local.cusps[9].longitude).toBeCloseTo(local.angles.mc.longitude, 6);
    for (const cusp of local.cusps) {
      expect(cusp.longitude).toBeGreaterThanOrEqual(0);
      expect(cusp.longitude).toBeLessThan(360);
    }
  });

  it('bascule en signes entiers aux latitudes polaires', () => {
    const houses = computePlacidusHouses(new Date('1990-06-15T12:00:00Z'), 78, 15);
    expect(houses.system).toBe('whole');
    expect(houses.fallback).toMatch(/Placidus/i);
  });

  it('ne calcule ni maisons ni ascendant lorsque l’heure est inconnue', () => {
    const result = computeAstrology({
      firstName: 'Test',
      birthDate: '1990-06-15',
      timeKnown: false,
      place: PARIS,
    });
    expect(result.unknownTime).toBe(true);
    expect(result.angles).toBeNull();
    expect(result.houses).toBeNull();
    expect(result.aspects).toHaveLength(0);
    expect(result.sunSign?.name).toBe('Gémeaux');
    expect(result.planets.find((planet) => planet.key === 'moon')?.sign).not.toBeUndefined();
  });

  it('détecte les aspects majeurs', () => {
    const aspects = findAspects([
      { key: 'sun', name: 'Soleil', longitude: 0, theme: 'identité' },
      { key: 'moon', name: 'Lune', longitude: 120.2, theme: 'émotion' },
      { key: 'mars', name: 'Mars', longitude: 90.1, theme: 'action' },
    ]);
    expect(aspects.some((aspect) => aspect.type === 'trine')).toBe(true);
    expect(aspects.some((aspect) => aspect.type === 'square')).toBe(true);
    expect(aspects.every((aspect) => aspect.orb >= 0)).toBe(true);
  });

  it('calcule un nœud nord moyen dans l’intervalle attendu', () => {
    const node = meanNodeLongitude(new Date('2000-01-01T12:00:00Z'));
    expect(node).toBeGreaterThan(0);
    expect(node).toBeLessThan(360);
  });

  it('refuse un calcul sans lieu', () => {
    expect(() =>
      computeAstrology({
        firstName: 'Test',
        birthDate: '1990-06-15',
        timeKnown: false,
        place: null as unknown as BirthPlace,
      }),
    ).toThrow(/lieu/i);
  });
});
