import { describe, expect, it } from 'vitest';
import {
  computeNumerology,
  dateDigits,
  digitalRoot,
  inclusionGrid,
  letterValue,
  lifePathNumber,
  nameNumber,
  normalizeName,
  numberLabel,
  personalYearNumber,
  reduceNumber,
  sumName,
} from './core';

describe('numérologie pythagoricienne', () => {
  it('attribue les valeurs pythagoriciennes correctes', () => {
    expect(letterValue('A')).toBe(1);
    expect(letterValue('I')).toBe(9);
    expect(letterValue('J')).toBe(1);
    expect(letterValue('R')).toBe(9);
    expect(letterValue('S')).toBe(1);
    expect(letterValue('Z')).toBe(8);
    expect(letterValue('É')).toBe(0); // la normalisation doit être faite en amont
  });

  it('normalise les accents et ligatures', () => {
    expect(normalizeName('Éléonore Ça æ œ')).toBe('ELEONORECAAEOE');
  });

  it('conserve les nombres maîtres et réduit les autres', () => {
    expect(reduceNumber(29)).toBe(11);
    expect(reduceNumber(11)).toBe(11);
    expect(reduceNumber(22)).toBe(22);
    expect(reduceNumber(33)).toBe(33);
    expect(reduceNumber(44)).toBe(8);
    expect(reduceNumber(1994)).toBe(5);
    expect(digitalRoot(11)).toBe(2);
    expect(digitalRoot(22)).toBe(4);
    expect(digitalRoot(33)).toBe(6);
  });

  it('calcule le chemin de vie de référence', () => {
    const trace = lifePathNumber('1994-10-14');
    expect(trace.raw).toBe(29);
    expect(trace.reduced).toBe(11);
    expect(trace.expression).toBe('1 + 9 + 9 + 4 + 1 + 0 + 1 + 4 = 29 → 11');
  });

  it('additionne les lettres d’un nom', () => {
    expect(sumName('Jean Dupont').raw).toBe(39);
    expect(nameNumber('Jean Dupont').reduced).toBe(3);
    expect(nameNumber('Jean Dupont', 'vowels').reduced).toBe(6);
    expect(nameNumber('Jean Dupont', 'consonants').reduced).toBe(6);
    expect(nameNumber('Louis').reduced).toBe(22);
  });

  it('compose un profil complet cohérent', () => {
    const result = computeNumerology({
      firstName: 'Jean',
      lastName: 'Dupont',
      birthDate: '1990-01-01',
      referenceYear: 2026,
    });
    expect(result.lifePath.number).toBe(3);
    expect(result.expression.number).toBe(3);
    expect(result.soulUrge.number).toBe(6);
    expect(result.personality.number).toBe(6);
    expect(result.maturity.number).toBe(6);
    expect(result.personalYear.number).toBe(3);
    expect(result.hasMasterNumber).toBe(false);
    expect(numberLabel(11)).toBe('11 / 2');
  });

  it('calcule l’année personnelle avec une année de référence fixe', () => {
    const trace = personalYearNumber('1994-10-14', 2026);
    expect(trace.reduced).toBe(7);
    expect(trace.expression).toContain('année 2026');
  });

  it('compte les chiffres de la grille d’inclusion', () => {
    expect(dateDigits('1994-10-14')).toEqual([1, 9, 9, 4, 1, 0, 1, 4]);
    const grid = inclusionGrid('Jean Dupont', '1990-01-01');
    expect(grid).toHaveLength(9);
    expect(grid.reduce((sum, value) => sum + value, 0)).toBeGreaterThan(0);
  });
});
