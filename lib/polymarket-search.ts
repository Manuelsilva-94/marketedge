const GAMMA_SEARCH_URL = 'https://gamma-api.polymarket.com/public-search';

export type PolymarketSearchCandidate = {
  externalId: string;
  question: string;
  slug: string;
  volume24h: number;
  endDate: Date | null;
};

function toFiniteNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function normalizeWords(text: string): string[] {
  const stop = new Set([
    'will',
    'the',
    'be',
    'to',
    'in',
    'on',
    'at',
    'of',
    'a',
    'an',
    'or',
    'and',
    'for',
    'by',
    'with',
    'this',
    'that'
  ]);
  return text
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !stop.has(w.toLowerCase()));
}

export function extractSearchKeywords(question: string, maxWords = 5): string {
  const primary = question.split(' — ')[0]?.trim() ?? question.trim();
  const words = normalizeWords(primary);
  if (words.length === 0) return primary;
  return words.slice(0, maxWords).join(' ');
}

export async function searchPolymarketCandidates(
  query: string,
  limitPerType = 20
): Promise<PolymarketSearchCandidate[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    q: query,
    limit_per_type: String(limitPerType),
    search_tags: 'false',
    search_profiles: 'false'
  });

  const response = await fetch(`${GAMMA_SEARCH_URL}?${params}`, {
    headers: { Accept: 'application/json' }
  });

  if (!response.ok) return [];

  const data = (await response.json()) as {
    markets?: Array<Record<string, unknown>>;
    events?: Array<Record<string, unknown>>;
  };

  const rawMarkets = Array.isArray(data.markets) ? data.markets : [];

  const seen = new Set<string>();
  const fromMarkets = rawMarkets
    .map((m): PolymarketSearchCandidate | null => {
      const externalId = String(m.id ?? m.conditionId ?? m.slug ?? '').trim();
      const question = String(m.question ?? m.title ?? '').trim();
      const slug = String(m.slug ?? externalId).trim();
      if (!externalId || !question || !slug) return null;
      if (m.closed === true || m.active === false) return null;
      if (seen.has(externalId)) return null;
      seen.add(externalId);

      const endDateRaw = m.endDate;
      const endDate =
        typeof endDateRaw === 'string' && endDateRaw.length > 0 ? new Date(endDateRaw) : null;

      return {
        externalId,
        question,
        slug,
        volume24h: toFiniteNumber(m.volume24hr ?? m.volume24h),
        endDate: endDate && !Number.isNaN(endDate.getTime()) ? endDate : null
      };
    })
    .filter((m): m is PolymarketSearchCandidate => m !== null);

  return fromMarkets;
}
