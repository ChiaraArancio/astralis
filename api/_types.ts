/**
 * Types minimaux pour les fonctions serverless Vercel.
 * Ils évitent d'embarquer @vercel/node uniquement pour le typage.
 */

export interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

export interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): void;
}
