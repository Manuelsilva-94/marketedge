  import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Platform } from '@prisma/client';
import { ComparisonService } from '@/lib/services/comparison.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const TIMEOUT_MS = 55_000;

// Categorías temáticas válidas (vienen de Kalshi)
const VALID_KALSHI_CATEGORIES = new Set([
  'Sports', 'Politics', 'Crypto', 'Economics', 'Entertainment',
  'Science', 'Climate', 'Health', 'Elections', 'Companies',
  'Soccer', 'Financials', 'Mentions', 'World'
]);

const CATEGORY_ALIASES: Record<string, string> = {
  'sport': 'Sports',
  'nba': 'Sports',
  'nfl': 'Sports',
  'nhl': 'Sports',
  'mlb': 'Sports',
  'mls': 'Soccer',
  'golf': 'Sports',
  'tennis': 'Sports',
  'f1': 'Sports',
  'formula': 'Sports',
  'racing': 'Sports',
  'boxing': 'Sports',
  'mma': 'Sports',
  'ufc': 'Sports',
  'olympic': 'Sports',
  'football': 'Sports',
  'basketball': 'Sports',
  'baseball': 'Sports',
  'hockey': 'Sports',
  'political': 'Politics',
  'election': 'Elections',
  'democrat': 'Elections',
  'republican': 'Elections',
  'president': 'Elections',
  'congress': 'Politics',
  'senate': 'Politics',
  'bitcoin': 'Crypto',
  'ethereum': 'Crypto',
  'crypto': 'Crypto',
  'defi': 'Crypto',
  'token': 'Crypto',
  'blockchain': 'Crypto',
  'stock': 'Financials',
  'market': 'Financials',
  'fed': 'Economics',
  'inflation': 'Economics',
  'gdp': 'Economics',
  'recession': 'Economics',
  'rate': 'Economics',
  'oscar': 'Entertainment',
  'emmy': 'Entertainment',
  'grammy': 'Entertainment',
  'academy': 'Entertainment',
  'movie': 'Entertainment',
  'film': 'Entertainment',
  'netflix': 'Entertainment',
  'music': 'Entertainment',
  'award': 'Entertainment',
  'climate': 'Climate',
  'weather': 'Climate',
  'hurricane': 'Climate',
  'temperature': 'Climate',
  'health': 'Health',
  'covid': 'Health',
  'fda': 'Health',
  'drug': 'Health',
  'la liga': 'Soccer',
  'premier league': 'Soccer',
  'champions league': 'Soccer',
  'bundesliga': 'Soccer',
  'serie a': 'Soccer',
  'world cup': 'Soccer',
};

function resolveCategory(category: string | null, question: string): string | null {
  // Primero intentar con la categoría existente del market
  if (category && VALID_KALSHI_CATEGORIES.has(category)) return category;

  // Buscar en aliases por categoría
  if (category) {
    const lower = category.toLowerCase();
    for (const [alias, resolved] of Object.entries(CATEGORY_ALIASES)) {
      if (lower.includes(alias)) return resolved;
    }
  }

  // Buscar en aliases por texto de la pregunta
  const questionLower = question.toLowerCase();
  for (const [alias, resolved] of Object.entries(CATEGORY_ALIASES)) {
    if (questionLower.includes(alias)) return resolved;
  }

  return null;
}

type MatchType = 'STRICT' | 'FUZZY' | 'RELATED';

export interface ArbitrageOpportunitiesResponse {
  opportunities: Array<{
    id: string;
    matchId: string;
    question: string;
    category: string | null;
    roi: number;
    matchScore: number;
    matchType: MatchType;
    polymarket: {
      id: string;
      yesPrice: number;
      noPrice: number;
      effectiveYesPrice: number;
      volume24h: number;
      url: string | null;
    };
    kalshi: {
      id: string;
      externalId: string;
      seriesId?: string | null;
      eventId?: string | null;
      yesPrice: number;
      noPrice: number;
      effectiveYesPrice: number;
      volume24h: number;
      url: string | null;
    };
    buyYesOn: Platform;
    buyNoOn: Platform;
    totalVolume24h: number;
    detectedAt: string;
  }>;
  count: number;
  scannedPairs: number;
  generatedAt: string;
}

function effectiveYesPrice(price: number, platform: Platform): number {
  if (platform === 'POLYMARKET') return price;
  if (platform === 'KALSHI') return price + 0.07 * price * (1 - price);
  return price;
}

export async function GET(req: NextRequest) {
  const generatedAt = new Date().toISOString();
  const searchParams = req.nextUrl.searchParams;
  const minRoiParam = searchParams.get('minRoi') ?? '0.01';
  const category = searchParams.get('category') || undefined;
  const sort = searchParams.get('sort') ?? 'roi';
  const limitParam = searchParams.get('limit') ?? '20';
  const limit = Math.min(Math.max(parseInt(limitParam, 10) || 20, 1), 50);
  const minRoiPercent = parseFloat(minRoiParam) * 100;

  const polyService = new PolymarketService();
  let kalshiService: KalshiService | null = null;
  try {
    kalshiService = new KalshiService();
  } catch {
    // Kalshi auth not configured
  }

  const select = {
    id: true,
    platform: true,
    question: true,
    category: true,
    eventTitle: true,
    volume24h: true,
    url: true,
    externalId: true,
    seriesId: true,
    eventId: true,
    slug: true,
    takerFee: true
  };

  const timeoutPromise = new Promise<ArbitrageOpportunitiesResponse>((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS);
  });

  const scanPromise = (async (): Promise<ArbitrageOpportunitiesResponse> => {
    const comparisonService = new ComparisonService();

    // PASO 1: Obtener pares verificados como equivalentes desde DB
    const verifiedPairs = await prisma.marketMatch.findMany({
      where: {
        isEquivalent: true,
        confidence: { gt: 0 },
        OR: [
          {
            marketA: {
              platform: 'POLYMARKET',
              active: true,
              ...(category && {
                category: { contains: category, mode: 'insensitive' as const }
              })
            },
            marketB: { platform: 'KALSHI', active: true }
          },
          {
            marketA: { platform: 'KALSHI', active: true },
            marketB: {
              platform: 'POLYMARKET',
              active: true,
              ...(category && {
                category: { contains: category, mode: 'insensitive' as const }
              })
            }
          }
        ]
      },
      include: {
        marketA: { select },
        marketB: { select }
      },
      orderBy: { confidence: 'desc' }
    });

    // Normalizar para que polymarket siempre sea A y kalshi sea B
    const confirmedPairs = verifiedPairs
      .map((pair) => {
        const poly = pair.marketA.platform === 'POLYMARKET' ? pair.marketA : pair.marketB;
        const kalshi = pair.marketA.platform === 'KALSHI' ? pair.marketA : pair.marketB;

        if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') return null;

        return {
          polymarket: { ...poly, volume24h: poly.volume24h ?? 0 },
          kalshiMarket: {
            id: kalshi.id,
            externalId: kalshi.externalId,
            seriesId: kalshi.seriesId,
            eventId: kalshi.eventId,
            slug: kalshi.slug,
            volume24h: kalshi.volume24h ?? 0,
            url: kalshi.url
          },
          matchId: pair.id,
          matchScore: pair.confidence,
          matchType: 'STRICT' as const
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    console.log(`[Scanner] Loaded ${confirmedPairs.length} verified pairs from DB`);

    // FILTRO: Ordenar por volumen combinado y tomar solo los top N
    // para no exceder el timeout al fetchear precios
    const MAX_PAIRS_TO_PRICE = 100;

    const filteredPairs = confirmedPairs
      .filter((pair) => {
        const polyVol = pair.polymarket.volume24h ?? 0;
        const kalshiVol = pair.kalshiMarket.volume24h ?? 0;
        // Excluir pares donde AMBOS tienen volumen 0 (markets resueltos/inactivos)
        // También excluir si el volumen combinado es menor a 100 (ruido)
        return (polyVol + kalshiVol) > 100;
      })
      .sort((a, b) => {
        const volA = (a.polymarket.volume24h ?? 0) + a.kalshiMarket.volume24h;
        const volB = (b.polymarket.volume24h ?? 0) + b.kalshiMarket.volume24h;
        return volB - volA;
      })
      .slice(0, MAX_PAIRS_TO_PRICE);

    console.log(
      `[Scanner] ${confirmedPairs.length} verified pairs → ${filteredPairs.length} after volume filter`
    );

    // PASO 2: Fetchear precios en batches de CONCURRENCY
    const opportunities: ArbitrageOpportunitiesResponse['opportunities'] = [];
    const minRoiFraction = parseFloat(minRoiParam);

    if (kalshiService) {
      const PRICE_CONCURRENCY = 5; // máximo 5 pares simultáneos

      for (let i = 0; i < filteredPairs.length; i += PRICE_CONCURRENCY) {
        const batch = filteredPairs.slice(i, i + PRICE_CONCURRENCY);

        await Promise.allSettled(
          batch.map(async (pair) => {
            try {
              const [polyLive, kalshiLive] = await Promise.all([
                polyService.getLiveMarket({
                  externalId: pair.polymarket.externalId,
                  platform: 'POLYMARKET',
                  slug: pair.polymarket.slug
                }),
                kalshiService!.getLiveMarket({
                  externalId: pair.kalshiMarket.externalId,
                  platform: 'KALSHI'
                })
              ]);

              if (!polyLive?.yesPrice || !kalshiLive?.yesPrice) return;

              const arbitrage = comparisonService.detectArbitrage({
                sourceMarket: { ...polyLive, platform: 'POLYMARKET' },
                matches: [{ ...kalshiLive, platform: 'KALSHI' }]
              });

              if (
                arbitrage.detected &&
                arbitrage.roi !== null &&
                arbitrage.roi / 100 >= minRoiFraction
              ) {
                // Buscar la categoría del market de Kalshi en el par
                const kalshiDbMarket = verifiedPairs.find(
                  (p) =>
                    (p.marketA.platform === 'KALSHI' && p.marketA.id === pair.kalshiMarket.id) ||
                    (p.marketB.platform === 'KALSHI' && p.marketB.id === pair.kalshiMarket.id)
                );
                const kalshiCategory =
                  kalshiDbMarket?.marketA.platform === 'KALSHI'
                    ? kalshiDbMarket.marketA.category
                    : kalshiDbMarket?.marketB.category ?? null;

                const resolvedCategory = VALID_KALSHI_CATEGORIES.has(kalshiCategory ?? '')
                  ? kalshiCategory
                  : null;

                opportunities.push({
                  id: `${pair.polymarket.id}-${pair.kalshiMarket.id}`,
                  matchId: pair.matchId,
                  question: pair.polymarket.question,
                  category: resolvedCategory,
                  roi: arbitrage.roi,
                  matchScore: pair.matchScore,
                  matchType: pair.matchType as MatchType,
                  polymarket: {
                    id: pair.polymarket.id,
                    yesPrice: polyLive.yesPrice,
                    noPrice: polyLive.noPrice,
                    effectiveYesPrice: polyLive.effectiveYesPrice,
                    volume24h: pair.polymarket.volume24h ?? 0,
                    url: pair.polymarket.url
                  },
                  kalshi: {
                    id: pair.kalshiMarket.id,
                    externalId: pair.kalshiMarket.externalId,
                    seriesId: pair.kalshiMarket.seriesId,
                    eventId: pair.kalshiMarket.eventId,
                    yesPrice: kalshiLive.yesPrice,
                    noPrice: kalshiLive.noPrice,
                    effectiveYesPrice: kalshiLive.effectiveYesPrice,
                    volume24h: pair.kalshiMarket.volume24h,
                    url: pair.kalshiMarket.url
                  },
                  buyYesOn: (arbitrage.buyYesOn ?? 'POLYMARKET') as Platform,
                  buyNoOn: (arbitrage.buyNoOn ?? 'KALSHI') as Platform,
                  totalVolume24h: (pair.polymarket.volume24h ?? 0) + pair.kalshiMarket.volume24h,
                  detectedAt: new Date().toISOString()
                });
              }
            } catch {
              // silenciar errores individuales de precio
            }
          })
        );

        // Pequeña pausa entre batches para no saturar las APIs
        if (i + PRICE_CONCURRENCY < confirmedPairs.length) {
          await new Promise((r) => setTimeout(r, 200));
        }
      }
    }

    const scannedPairs = confirmedPairs.length;

    if (sort === 'volume') {
      opportunities.sort((a, b) => b.totalVolume24h - a.totalVolume24h);
    } else if (sort === 'newest') {
      opportunities.sort(
        (a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime()
      );
    } else {
      opportunities.sort((a, b) => b.roi - a.roi);
    }

    // Deduplicar por kalshi.id — quedarse con la oportunidad de mayor ROI por market de Kalshi
    const seenKalshiIds = new Set<string>();
    const deduplicated = opportunities.filter((opp) => {
      if (seenKalshiIds.has(opp.kalshi.id)) return false;
      seenKalshiIds.add(opp.kalshi.id);
      return true;
    });

    const top = deduplicated.slice(0, limit);

    return {
      opportunities: top,
      count: top.length,
      scannedPairs,
      generatedAt
    };
  })();

  try {
    const data = await Promise.race([scanPromise, timeoutPromise]);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
      }
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'TIMEOUT') {
      return NextResponse.json(
        {
          opportunities: [],
          count: 0,
          scannedPairs: 0,
          generatedAt,
          error: 'Scan timed out after 55s'
        },
        { status: 200 }
      );
    }
    console.error('❌ Arbitrage opportunities error:', err);
    return NextResponse.json(
      {
        opportunities: [],
        count: 0,
        scannedPairs: 0,
        generatedAt,
        error: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 200 }
    );
  }
}
