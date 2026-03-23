import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComparisonService } from '@/lib/services/comparison.service';
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
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: marketId } = await context.params;

    const dbMarket = await prisma.market.findUnique({
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
