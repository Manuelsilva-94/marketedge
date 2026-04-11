/** URL pública del sitio (emails, Telegram). */
export function getSiteBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://marketedge-chi.vercel.app';
}

/**
 * Base URL para fetch server-side a rutas propias (ej. home → /api/arbitrage/opportunities).
 * En dev sin NEXT_PUBLIC_URL, usa localhost para no apuntar por error a producción.
 */
export function getInternalApiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === 'development') return 'http://127.0.0.1:3000';
  return 'https://marketedge-chi.vercel.app';
}
