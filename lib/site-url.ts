/** URL pública del sitio (emails, Telegram). */
export function getSiteBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://marketedge-chi.vercel.app';
}
