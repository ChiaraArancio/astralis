import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { NumerologyForm } from './NumerologyForm';

function renderForm() {
  return render(
    <MemoryRouter initialEntries={['/numerologie']}>
      <Routes>
        <Route path="/numerologie" element={<NumerologyForm />} />
        <Route path="/resultats/numerologie" element={<h1>Résultat numérologique</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('formulaire de numérologie', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('affiche les erreurs de validation et ne navigue pas', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: /calculer mes nombres/i }));
    expect(screen.getAllByRole('alert').some((element) => /certains champs/i.test(element.textContent ?? ''))).toBe(true);
    expect(screen.getAllByText(/indiquez votre prénom/i).length).toBeGreaterThan(0);
    expect(screen.queryByText('Résultat numérologique')).not.toBeInTheDocument();
  });

  it('enregistre les données et navigue vers les résultats', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText(/prénom\(s\) de naissance/i), 'Camille');
    await user.type(screen.getByLabelText(/nom de famille de naissance/i), 'Dupont');
    await user.type(screen.getByLabelText(/date de naissance/i), '1994-10-14');
    await user.click(screen.getByRole('button', { name: /calculer mes nombres/i }));
    expect(await screen.findByRole('heading', { name: 'Résultat numérologique' })).toBeInTheDocument();
    const stored = sessionStorage.getItem('astralis:numerology-input:v1');
    expect(stored).toContain('Camille');
    expect(stored).toContain('1994-10-14');
  });
});
