import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NewsletterForm } from './NewsletterForm';

describe('formulaire de newsletter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('affiche un message honnête lorsque le service n’est pas configuré', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Service non configuré' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <NewsletterForm />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/votre adresse e-mail/i), 'camille@example.com');
    await user.click(screen.getByRole('button', { name: /s’inscrire à la lettre d’information/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/service non configuré/i);
  });

  it('refuse une adresse invalide sans appeler le serveur', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <NewsletterForm />
      </MemoryRouter>,
    );
    await user.type(screen.getByLabelText(/votre adresse e-mail/i), 'invalide');
    await user.click(screen.getByRole('button', { name: /s’inscrire à la lettre d’information/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/ne semble pas valide/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
