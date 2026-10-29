import type { ApiRequest, ApiResponse } from '../_types';

/**
 * Préparation Stripe — endpoint volontairement fermé par défaut.
 *
 * Aucun paiement n'est actif dans cette version. Pour l'activer plus tard :
 * - créer un produit et un prix dans Stripe ;
 * - renseigner STRIPE_SECRET_KEY, STRIPE_PRICE_ID et APP_URL ;
 * - passer ENABLE_PAYMENTS=true.
 *
 * Le bouton d'achat côté client n'existe pas encore : ce endpoint est une
 * fondation pour la future offre payante, pas une fonctionnalité ouverte.
 */
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

  if (process.env.ENABLE_PAYMENTS !== 'true') {
    response.status(503).json({
      error: 'Les paiements ne sont pas ouverts. Aucun débit ne peut être effectué.',
      code: 'PAYMENTS_DISABLED',
    });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  const appUrl = process.env.APP_URL;

  if (!secretKey || !priceId || !appUrl) {
    response.status(500).json({
      error:
        'Configuration Stripe incomplète : STRIPE_SECRET_KEY, STRIPE_PRICE_ID et APP_URL sont requis.',
      code: 'STRIPE_NOT_CONFIGURED',
    });
    return;
  }

  try {
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('line_items[0][price]', priceId);
    params.set('line_items[0][quantity]', '1');
    params.set('success_url', `${appUrl.replace(/\/$/, '')}/mon-compte?paiement=succes`);
    params.set('cancel_url', `${appUrl.replace(/\/$/, '')}/les-cours?paiement=annule`);
    params.set('allow_promotion_codes', 'true');

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = (await stripeResponse.json()) as { url?: string; error?: { message?: string } };
    if (!stripeResponse.ok || !data.url) {
      response.status(502).json({
        error: 'Stripe n’a pas pu créer la session de paiement.',
        code: 'STRIPE_ERROR',
      });
      return;
    }
    response.status(200).json({ url: data.url });
  } catch {
    response.status(502).json({
      error: 'Le service de paiement est momentanément indisponible.',
      code: 'STRIPE_UNAVAILABLE',
    });
  }
}
