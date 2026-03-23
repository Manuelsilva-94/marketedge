import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Platform } from '@/lib/db-types';

export const dynamic = 'force-dynamic';

interface ArbitrageOpportunity {
  id: string;
  question: string;
  category: string | null;
  polymarket: {
    id: string;
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    url: string | null;
  };
  kalshi: {
    id: string;
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
    url: string | null;
  };
  roi: number;
  matchScore: number;
  volume24h?: number;
}

/**
 * Derives polymarket and kalshi YES prices from Comparison bestYes/bestNo.
 * bestYesPlatform has the best (lowest) YES price; bestNoPlatform has the best (lowest) NO price.
 */
function derivePrices(
  bestYesPrice: number,
  bestNoPrice: number,
  bestYesPlatform: Platform,
  bestNoPlatform: Platform
): { polymarketYesPrice: number; kalshiYesPrice: number } {
  const polyYes =
    bestYesPlatform === 'POLYMARKET' ? bestYesPrice : 1 - bestNoPrice;
  const kalshiYes =
    bestYesPlatform === 'KALSHI' ? bestYesPrice : 1 - bestNoPrice;
  return { polymarketYesPrice: polyYes, kalshiYesPrice: kalshiYes };
}

/**
 * Effective price after fees: Polymarket ~2% taker, Kalshi ~7% on payout
 */
function effectiveYesPrice(price: number, platform: Platform): number {
  if (platform === 'POLYMARKET') return price * 1.02;
  if (platform === 'KALSHI') return price + 0.07 * (1 - price);
  return price;
}

const baseUrl =
  typeof process.env.VERCEL_URL === 'string'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const generatedAt = new Date().toISOString();

  try {
    const limitParam = req.nextUrl.searchParams.get('limit') || '10';
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 20);

    const comparisons = await prisma.comparison.findMany({
      where: { arbitrageExists: true },
      orderBy: { arbitrageROI: 'desc' },
      take: limit
    });

    const opportunities: ArbitrageOpportunity[] = [];

    for (const c of comparisons) {
      if (!c.marketIds || c.marketIds.length < 2) continue;

      const [polyId, kalshiId] = c.marketIds;
      const polyMarket = await prisma.market.findUnique({
        where: { id: polyId },
        select: { id: true, platform: true, question: true, category: true, url: true, volume24h: true }
      });
      const kalshiMarket = await prisma.market.findUnique({
        where: { id: kalshiId },
        select: { id: true, platform: true, question: true, category: true, url: true, volume24h: true }
      });

      if (!polyMarket || !kalshiMarket) continue;
      const polyIsPoly = polyMarket.platform === 'POLYMARKET';
      const polyM = polyIsPoly ? polyMarket : kalshiMarket;
      const kalshiM = polyIsPoly ? kalshiMarket : polyMarket;

      const bestYes = c.bestYesPrice ?? 0;
      const bestNo = c.bestNoPrice ?? 0;
      const { polymarketYesPrice, kalshiYesPrice } = derivePrices(
        bestYes,
        bestNo,
        c.bestYesPlatform,
        c.bestNoPlatform
      );
      const polymarketNoPrice = 1 - polymarketYesPrice;
      const kalshiNoPrice = 1 - kalshiYesPrice;

      const effectiveYesPoly = effectiveYesPrice(polymarketYesPrice, 'POLYMARKET');
      const effectiveYesKalshi = effectiveYesPrice(kalshiYesPrice, 'KALSHI');

      opportunities.push({
        id: c.id,
        question: polyM.question,
        category: polyM.category,
        polymarket: {
          id: polyM.id,
          yesPrice: polymarketYesPrice,
          noPrice: polymarketNoPrice,
          effectiveYesPrice: effectiveYesPoly,
          url: polyM.url
        },
        kalshi: {
          id: kalshiM.id,
          yesPrice: kalshiYesPrice,
          noPrice: kalshiNoPrice,
          effectiveYesPrice: effectiveYesKalshi,
          url: kalshiM.url
        },
        roi: c.arbitrageROI ?? 0,
        matchScore: 1,
        volume24h: (polyMarket.volume24h ?? 0) + (kalshiMarket.volume24h ?? 0)
      });
    }

    if (opportunities.length === 0) {
      const oppRes = await fetch(
        `${baseUrl}/api/arbitrage/opportunities?limit=${limit}&minRoi=0.005`,
        { cache: 'no-store' }
      ).catch(() => null);
      if (oppRes?.ok) {
        const oppData = await oppRes.json();
        const opps = oppData?.opportunities ?? [];
        if (opps.length > 0) {
          const mapped: ArbitrageOpportunity[] = opps.map((o: Record<string, unknown>) => ({
            id: String(o.id ?? ''),
            question: String(o.question ?? ''),
            category: (o.category as string | null) ?? null,
            polymarket: {
              id: (o.polymarket as Record<string, unknown>)?.id as string,
              yesPrice: (o.polymarket as Record<string, unknown>)?.yesPrice as number,
              noPrice: (o.polymarket as Record<string, unknown>)?.noPrice as number,
              effectiveYesPrice: (o.polymarket as Record<string, unknown>)?.effectiveYesPrice as number,
              url: (o.polymarket as Record<string, unknown>)?.url as string | null
            },
            kalshi: {
              id: (o.kalshi as Record<string, unknown>)?.id as string,
              yesPrice: (o.kalshi as Record<string, unknown>)?.yesPrice as number,
              noPrice: (o.kalshi as Record<string, unknown>)?.noPrice as number,
              effectiveYesPrice: (o.kalshi as Record<string, unknown>)?.effectiveYesPrice as number,
              url: (o.kalshi as Record<string, unknown>)?.url as string | null
            },
            roi: (o.roi as number) ?? 0,
            matchScore: (o.matchScore as number) ?? 1,
            volume24h: ((o.polymarket as Record<string, unknown>)?.volume24h as number) +
              ((o.kalshi as Record<string, unknown>)?.volume24h as number)
          }));
          return NextResponse.json(
            { opportunities: mapped, count: mapped.length, generatedAt },
            {
              headers: {
                'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
              }
            }
          );
        }
      }
    }

    return NextResponse.json(
      { opportunities, count: opportunities.length, generatedAt },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
        }
      }
    );
  } catch (error) {
    console.error('❌ Arbitrage live error:', error);
    return NextResponse.json(
      { opportunities: [], count: 0, generatedAt },
      { status: 200 }
    );
  }
}
