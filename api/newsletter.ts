import type { ApiRequest, ApiResponse } from './_types.js';

/**
 * Fonction serverless d'inscription à la newsletter (Vercel).
 *
 * - Sans RESEND_API_KEY et destination, la fonction répond 503 : le client
 *   affiche un message honnête et n'enregistre rien.
 * - Les données de naissance ne passent jamais par cette fonction.
 * - Aucun secret n'est exposé au navigateur.
 */

interface RequestBody {
  email?: unknown;
  consent?: unknown;
}

interface RateEntry {
  count: number;
  resetAt: number;
}

const RATE_LIMIT = new Map<string, RateEntry>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function getClientKey(request: ApiRequest): string {
  const forwarded = request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown';
  if (Array.isArray(forwarded)) return forwarded[0] ?? 'unknown';
  return request.socket?.remoteAddress ?? 'unknown';
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(key);
  if (!entry || entry.resetAt < now) {
    RATE_LIMIT.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function addToAudience(
  apiKey: string,
  audienceId: string,
  email: string,
): Promise<{ ok: boolean; status: number; body: string }> {
  const response = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });
  return { ok: response.ok, status: response.status, body: await response.text() };
}

async function sendNotification(
  apiKey: string,
  from: string,
  to: string,
  email: string,
): Promise<{ ok: boolean; status: number; body: string }> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: 'Astralis — nouvelle inscription à la lettre d’information',
      html: `<p>Nouvelle inscription : <strong>${escapeHtml(email)}</strong></p><p>Consentement recueilli le ${new Date().toISOString()}.</p>`,
    }),
  });
  return { ok: response.ok, status: response.status, body: await response.text() };
}

export default async function handler(
  request: ApiRequest,
  response: ApiResponse,
): Promise<void> {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  if (rateLimited(getClientKey(request))) {
    response.status(429).json({
      error: 'Trop de tentatives. Réessayez dans une minute.',
      code: 'RATE_LIMITED',
    });
    return;
  }

  const body = (request.body ?? {}) as RequestBody;
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const consent = body.consent === true;

  if (!isValidEmail(email)) {
    response.status(400).json({ error: 'Adresse e-mail invalide.', code: 'INVALID_EMAIL' });
    return;
  }
  if (!consent) {
    response.status(400).json({
      error: 'Le consentement à recevoir la lettre d’information est requis.',
      code: 'CONSENT_REQUIRED',
    });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || (!audienceId && !contactTo)) {
    response.status(503).json({
      error:
        "Le service d’inscription n’est pas encore configuré. Ajoutez RESEND_API_KEY et RESEND_AUDIENCE_ID (ou CONTACT_TO_EMAIL) dans les variables d’environnement Vercel.",
      code: 'SERVICE_NOT_CONFIGURED',
    });
    return;
  }

  try {
    if (audienceId) {
      const result = await addToAudience(apiKey, audienceId, email);
      if (result.ok) {
        response.status(200).json({ message: 'Inscription confirmée. Merci !' });
        return;
      }
      if (result.status === 409) {
        response.status(200).json({ message: 'Cette adresse est déjà inscrite. Merci !' });
        return;
      }
      response.status(502).json({
        error: 'Le prestataire d’envoi a refusé l’inscription. Réessayez plus tard.',
        code: 'RESEND_ERROR',
      });
      return;
    }

    if (!from || !contactTo) {
      response.status(503).json({
        error:
          'Le service d’inscription est partiellement configuré : RESEND_FROM_EMAIL et CONTACT_TO_EMAIL sont nécessaires pour envoyer une notification.',
        code: 'SERVICE_NOT_CONFIGURED',
      });
      return;
    }

    const result = await sendNotification(apiKey, from, contactTo, email);
    if (!result.ok) {
      response.status(502).json({
        error: 'Le prestataire d’envoi a refusé l’e-mail. Réessayez plus tard.',
        code: 'RESEND_ERROR',
      });
      return;
    }
    response.status(200).json({ message: 'Inscription transmise. Merci !' });
  } catch {
    response.status(502).json({
      error: 'Le service d’inscription est momentanément indisponible.',
      code: 'UPSTREAM_ERROR',
    });
  }
}
