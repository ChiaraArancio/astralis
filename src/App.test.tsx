import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('navigation et pages', () => {
  it('affiche la page d’accueil et ses trois parcours', async () => {
    renderAt('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /mieux vous connaître/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /découvrir mon thème astral/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /découvrir ma numérologie/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /découvrir mon human design/i }).length).toBeGreaterThan(0);
  });

  it('affiche la page de numérologie', async () => {
    renderAt('/numerologie');
    expect(
      await screen.findByRole('heading', { level: 1, name: /numérologie/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculer mes nombres/i })).toBeInTheDocument();
  });

  it('affiche la page Human Design', async () => {
    renderAt('/human-design');
    expect(
      await screen.findByRole('heading', { level: 1, name: /human design/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /révéler mon schéma corporel/i })).toBeInTheDocument();
  });

  it('affiche l’état « bientôt disponible » des cours', async () => {
    renderAt('/les-cours');
    expect((await screen.findAllByText(/bientôt disponible/i)).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /rejoindre/i })).not.toBeInTheDocument();
  });

  it('affiche la page 404', async () => {
    renderAt('/une-page-inconnue');
    expect(await screen.findByText(/cette page n’existe pas/i)).toBeInTheDocument();
  });

  it('le lien de navigation mène à la numérologie', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const links = await screen.findAllByRole('link', { name: /découvrir ma numérologie/i });
    await user.click(links[0]);
    expect(await screen.findByRole('heading', { level: 1, name: /numérologie/i })).toBeInTheDocument();
  });
});
