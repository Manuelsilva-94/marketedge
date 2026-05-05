import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComparisonService } from '@/lib/services/comparison.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import type { Platform } from '@/lib/db-types';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'iad1';

export interface CompareApiResponse {
  market: {
    id: string;
    platform: 'POLYMARKET' | 'KALSHI';
    question: string;
    category: string | null;
    tags: string[];
    endDate: string | null;
    volume24h: number;
    volumeTotal: number;
    liquidity: number;
    url: string | null;
    externalId: string;
    seriesId: string | null;
    eventId: string | null;
    eventTitle: string | null;
    yesPrice: number | null;
    noPrice: number | null;
    effectiveYesPrice: number | null;
    makerFee: number | null;
    takerFee: number | null;
  };
  matches: Array<{
    market: {
      id: string;
      platform: 'POLYMARKET' | 'KALSHI';
      question: string;
      url: string | null;
      yesPrice: number | null;
      noPrice: number | null;
      effectiveYesPrice: number | null;
    };
    matchScore: number;
    matchType: 'STRICT' | 'FUZZY' | 'RELATED';
  }>;
  arbitrage: {
    detected: boolean;
    roi: number | null;
    buyYesOn: Platform | null;
    sellYesOn: Platform | null;
    buyNoOn: Platform | null;
    explanation: string | null;
  } | null;
  error: string | null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: marketId } = await context.params;
    const url = new URL(request.url);
    const platform = url.searchParams.get('platform') as Platform | null;
    const externalId = url.searchParams.get('externalId');

    // Try DB first
    let dbMarket = await prisma.market.findUnique({
      where: { id: marketId },
      select: {
        id: true,
        platform: true,
        question: true,
        category: true,
        tags: true,
        endDate: true,
        volume24h: true,
        volumeTotal: true,
        liquidity: true,
        url: true,
        eventTitle: true,
        makerFee: true,
        takerFee: true,
        externalId: true,
        seriesId: true,
        eventId: true
      }
    });

    // Fallback: try to fetch from APIs if not in DB
    if (!dbMarket && platform && externalId) {
      console.log(`[Compare] Market ${marketId} not in DB, trying live fetch: ${platform} ${externalId}`);
      
      try {
        if (platform === 'KALSHI') {
          const kalshiService = new KalshiService();
          const liveData = await kalshiService.getLiveMarket({ externalId, platform });
          
          if (liveData) {
            // Fetch full market data
            const response = await fetch(`https://api.elections.kalshi.com/trade-api/v2/markets/${externalId}`, {
              headers: kalshiService['auth'].getHeaders('GET', `/trade-api/v2/markets/${externalId}`)
            });
            
            if (response.ok) {
              const { market: rawMarket } = await response.json();
              const normalized = kalshiService.normalizeMarket(rawMarket);
              
              dbMarket = {
                id: marketId,
                platform: 'KALSHI',
                question: normalized.question,
                category: normalized.category ?? null,
                tags: [],
                endDate: normalized.endDate ?? null,
                volume24h: normalized.volume24h ?? 0,
                volumeTotal: 0,
                liquidity: 0,
                url: normalized.url ?? null,
                eventTitle: null,
                makerFee: null,
                takerFee: null,
                externalId: normalized.externalId,
                seriesId: normalized.seriesId ?? null,
                eventId: normalized.eventId ?? null
              };
            }
          }
        } else if (platform === 'POLYMARKET') {
          const polyService = new PolymarketService();
          
          // Try to fetch from Gamma API
          const response = await fetch(
            `https://gamma-api.polymarket.com/markets?slug=${encodeURIComponent(externalId)}&limit=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            const rawMarket = data[0];
            
            if (rawMarket) {
              const normalized = polyService.normalizeMarket(rawMarket);
              
              dbMarket = {
                id: marketId,
                platform: 'POLYMARKET',
                question: normalized.question,
                category: null,
                tags: [],
                endDate: normalized.endDate ?? null,
                volume24h: normalized.volume24h ?? 0,
                volumeTotal: normalized.volumeTotal ?? 0,
                liquidity: normalized.liquidity ?? 0,
                url: normalized.url ?? null,
                eventTitle: null,
                makerFee: normalized.makerFee ?? null,
                takerFee: normalized.takerFee ?? null,
                externalId: normalized.externalId,
                seriesId: null,
                eventId: null
              };
            }
          }
        }
      } catch (error) {
        console.error('[Compare] Live fetch error:', error);
      }
    }

    if (!dbMarket) {
      return NextResponse.json(
        { market: null, matches: [], arbitrage: null, error: 'Market not found' },
        { status: 404 }
      );
    }

    const comparisonService = new ComparisonService();
    const result = await comparisonService.compareMarket(marketId);

    const effectiveYes =
      result.sourceMarket.yesPrice != null
        ? result.sourceMarket.effectiveYes
        : null;

    const response: CompareApiResponse = {
      market: {
        id: dbMarket.id,
        platform: dbMarket.platform as 'POLYMARKET' | 'KALSHI',
        question: dbMarket.question,
        category: dbMarket.category,
        tags: dbMarket.tags ?? [],
        endDate: dbMarket.endDate?.toISOString() ?? null,
        volume24h: dbMarket.volume24h,
        volumeTotal: dbMarket.volumeTotal,
        liquidity: dbMarket.liquidity,
        url: dbMarket.url,
        externalId: dbMarket.externalId,
        seriesId: dbMarket.seriesId,
        eventId: dbMarket.eventId,
        eventTitle: dbMarket.eventTitle,
        yesPrice: result.sourceMarket.yesPrice ?? null,
        noPrice: result.sourceMarket.noPrice ?? null,
        effectiveYesPrice: effectiveYes,
        makerFee: dbMarket.makerFee,
        takerFee: dbMarket.takerFee
      },
      matches: result.matches.map((m) => ({
        market: {
          id: m.id,
          platform: m.platform as 'POLYMARKET' | 'KALSHI',
          question: m.question,
          url: m.url ?? null,
          yesPrice: m.yesPrice ?? null,
          noPrice: m.noPrice ?? null,
          effectiveYesPrice: m.effectiveYes ?? null
        },
        matchScore: m.matchScore,
        matchType: (m.matchType as 'STRICT' | 'FUZZY' | 'RELATED') || 'RELATED'
      })),
      arbitrage: result.arbitrage
        ? {
            detected: result.arbitrage.detected,
            roi: result.arbitrage.roi ?? null,
            buyYesOn: result.arbitrage.buyYesOn ?? null,
            sellYesOn: result.arbitrage.sellYesOn ?? null,
            buyNoOn: result.arbitrage.buyNoOn ?? null,
            explanation: result.arbitrage.explanation ?? null
          }
        : {
            detected: false,
            roi: null,
            buyYesOn: null,
            sellYesOn: null,
            buyNoOn: null,
            explanation: null
          },
      error: null
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Compare error:', error);

    if (error instanceof Error && error.message === 'Market not found') {
      return NextResponse.json(
        { market: null, matches: [], arbitrage: null, error: 'Market not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        market: null,
        matches: [],
        arbitrage: null,
        error: error instanceof Error ? error.message : 'Comparison failed'
      },
      { status: 500 }
    );
  }
}
