/**
 * Construye la URL correcta de Kalshi a partir de los campos disponibles en DB.
 * Formato: https://kalshi.com/markets/{series}/{eventId}
 * Ejemplo: https://kalshi.com/markets/kxucl/kxucl-26
 */
export function buildKalshiUrl(market: {
  externalId: string;
  seriesId?: string | null;
  eventId?: string | null;
  url?: string | null;
}): string {
  const { externalId, seriesId, eventId } = market;

  if (seriesId && eventId) {
    return `https://kalshi.com/markets/${seriesId.toLowerCase()}/${eventId.toLowerCase()}`;
  }

  // Fallback: derivar del ticker
  const parts = externalId.split('-');
  if (parts.length >= 3) {
    const series = parts[0].toLowerCase();
    const event = parts.slice(0, -1).join('-').toLowerCase();
    return `https://kalshi.com/markets/${series}/${event}`;
  }

  // Último fallback: solo el ticker en lowercase
  return `https://kalshi.com/markets/${externalId.toLowerCase()}`;
}
