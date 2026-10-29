import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { EmptyResult, learnPath, ResultsActions } from './ResultLayout';

describe('composants de résultats', () => {
  it('associe chaque discipline à la bonne page de compréhension', () => {
    expect(learnPath('astrology')).toBe('/comprendre/astrologie');
    expect(learnPath('numerology')).toBe('/comprendre/numerologie');
    expect(learnPath('humanDesign')).toBe('/comprendre/human-design');
  });

  it('affiche un état vide avec un lien vers le formulaire', () => {
    render(
      <MemoryRouter>
        <EmptyResult discipline="astral" formPath="/theme-astral" label="Calculer mon thème astral" />
      </MemoryRouter>,
    );
    expect(screen.getByText(/aucun calcul en mémoire/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /calculer mon thème astral/i })).toHaveAttribute(
      'href',
      '/theme-astral',
    );
  });

  it('propose les deux actions sous les résultats', () => {
    render(
      <MemoryRouter>
        <ResultsActions
          discipline="numerology"
          disciplineLabel="numérologie"
          formPath="/numerologie"
          premiumTitle="Bientôt"
          premiumContent={['Analyse détaillée']}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: /comprendre mon profil/i })).toHaveAttribute(
      'href',
      '/comprendre/numerologie',
    );
    expect(screen.getByRole('button', { name: /approfondir mon analyse/i })).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
