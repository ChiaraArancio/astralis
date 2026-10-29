import { describe, expect, it } from 'vitest';
import type { BirthPlace } from './geo';
import {
  hasErrors,
  isValidName,
  validateAstrologyForm,
  validateBirthDate,
  validateEmail,
  validateHumanDesignForm,
  validateNumerologyForm,
  validatePlace,
  validateTime,
} from './validation';

const PARIS: BirthPlace = {
  name: 'Paris',
  country: 'France',
  latitude: 48.8566,
  longitude: 2.3522,
  timezone: 'Europe/Paris',
};

describe('validation des formulaires', () => {
  it('valide les noms', () => {
    expect(isValidName('Camille')).toBe(true);
    expect(isValidName('Jean-Pierre')).toBe(true);
    expect(isValidName('Éléonore')).toBe(true);
    expect(isValidName('A')).toBe(false);
    expect(isValidName('Camille 2')).toBe(false);
  });

  it('valide les dates de naissance', () => {
    expect(validateBirthDate('1994-10-14')).toBeNull();
    expect(validateBirthDate('1994-02-31')).toMatch(/valide/i);
    expect(validateBirthDate('1899-12-31')).toMatch(/1900/i);
    expect(validateBirthDate('2999-01-01')).toMatch(/futur/i);
  });

  it('valide les heures', () => {
    expect(validateTime('18:42')).toBeNull();
    expect(validateTime('24:00')).toMatch(/HH:MM/);
    expect(validateTime('')).toMatch(/heure/i);
  });

  it('valide les lieux', () => {
    expect(validatePlace(PARIS)).toBeNull();
    expect(validatePlace(null)).toMatch(/ville/i);
    expect(validatePlace({ ...PARIS, timezone: 'Fuseau/Inconnu' })).toMatch(/fuseau/i);
    expect(validatePlace({ ...PARIS, latitude: 120 })).toMatch(/coordonnées/i);
  });

  it('valide les e-mails', () => {
    expect(validateEmail('camille@example.com')).toBeNull();
    expect(validateEmail('camille@example')).toMatch(/valide/i);
    expect(validateEmail('')).toMatch(/adresse/i);
  });

  it('valide les trois formulaires', () => {
    expect(hasErrors(validateNumerologyForm({ firstName: '', lastName: '', birthDate: '' }))).toBe(true);
    expect(
      hasErrors(validateNumerologyForm({ firstName: 'Camille', lastName: 'Dupont', birthDate: '1994-10-14' })),
    ).toBe(false);

    expect(
      hasErrors(
        validateAstrologyForm({
          firstName: 'Camille',
          birthDate: '1994-10-14',
          birthTime: '',
          timeKnown: true,
          place: PARIS,
        }),
      ),
    ).toBe(true);

    expect(
      hasErrors(
        validateAstrologyForm({
          firstName: 'Camille',
          birthDate: '1994-10-14',
          birthTime: '',
          timeKnown: false,
          place: PARIS,
        }),
      ),
    ).toBe(false);

    expect(
      hasErrors(
        validateHumanDesignForm({
          firstName: 'Camille',
          birthDate: '1994-10-14',
          birthTime: '18:42',
          place: PARIS,
        }),
      ),
    ).toBe(false);
  });
});
