export interface ServiceResult {
  ok: boolean;
  message: string;
  code?: string;
}

interface ApiError {
  error?: string;
  message?: string;
  code?: string;
}

async function parseResponse(response: Response): Promise<ApiError | null> {
  try {
    return (await response.json()) as ApiError;
  } catch {
    return null;
  }
}

/**
 * Inscription à la lettre d'information. Le service n'est réellement actif
 * que lorsque la fonction serverless et Resend sont configurés. En local, on
 * affiche un message honnête plutôt qu'un faux succès.
 */
export async function subscribeToNewsletter(email: string): Promise<ServiceResult> {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, consent: true }),
    });

    const payload = await parseResponse(response);
    if (response.ok) {
      return {
        ok: true,
        message:
          payload?.message ??
          'Merci. Votre inscription a bien été transmise. Vous pourrez vous désinscrire à tout moment.',
      };
    }

    if (response.status === 404) {
      return {
        ok: false,
        code: 'SERVICE_NOT_CONFIGURED',
        message:
          "Le service d’inscription n’est pas actif sur cette version locale. Il s’active après configuration de Resend et déploiement sur Vercel (voir le README).",
      };
    }

    return {
      ok: false,
      code: payload?.code ?? `HTTP_${response.status}`,
      message:
        payload?.error ??
        payload?.message ??
        "L’inscription n’a pas pu être enregistrée. Réessayez dans quelques instants.",
    };
  } catch {
    return {
      ok: false,
      code: 'NETWORK_ERROR',
      message:
        "Impossible de joindre le service d’inscription. Vérifiez votre connexion, ou réessayez plus tard.",
    };
  }
}

export function mailtoLink(subject: string): string {
  return `mailto:astralis.spiritualite@gmail.com?subject=${encodeURIComponent(subject)}`;
}
