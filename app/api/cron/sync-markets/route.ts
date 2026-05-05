import { NextResponse } from 'next/server';
import { KalshiService } from '@/lib/services/kalshi.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { prisma } from '@/lib/prisma';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 55;
export const preferredRegion = 'iad1';
const MAX_DURATION_MS = 48_000;
const MAX_MARKETS_PER_RUN = 120;
const BATCH_SIZE = 8;

export async function GET(request: Request) {
  try {
    const authError = requireCronAuth(request);
    if (authError) return authError;

    const startedAt = Date.now();
    let updated = 0;
    let markedInactive = 0;
    let errors = 0;

    const [verifiedPairs, polyService, kalshiService] = await Promise.all([
      prisma.marketMatch.findMany({
        where: { isEquivalent: true, confidence: { gte: 0.82 } },
        select: {
          marketA: {
            select: {
              id: true,
              platform: true,
              externalId: true,
              slug: true,
              active: true
            }
          },
          marketB: {
            select: {
              id: true,
              platform: true,
              externalId: true,
              slug: true,
              active: true
            }
          }
        }
      }),
      Promise.resolve(new PolymarketService()),
      Promise.resolve(new KalshiService())
    ]);

    const marketsById = new Map<string, { id: string; platform: string; externalId: string; slug: string; active: boolean }>();
    for (const pair of verifiedPairs) {
      marketsById.set(pair.marketA.id, pair.marketA);
      marketsById.set(pair.marketB.id, pair.marketB);
    }
    const markets = [...marketsById.values()].slice(0, MAX_MARKETS_PER_RUN);
    let processed = 0;
    let timedOut = false;

    for (let i = 0; i < markets.length; i += BATCH_SIZE) {
      if (Date.now() - startedAt > MAX_DURATION_MS) {
        timedOut = true;
        break;
      }

      const batch = markets.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map(async (market) => {
          const liveData =
            market.platform === 'POLYMARKET'
              ? await polyService.getLiveMarket({
                  externalId: market.externalId,
                  platform: 'POLYMARKET',
                  slug: market.slug
                })
              : await kalshiService.getLiveMarket({
                  externalId: market.externalId,
                  platform: 'KALSHI'
                });

          if (!liveData) return { ok: false as const };

          const isResolved = liveData.yesPrice <= 0.001 || liveData.yesPrice >= 0.999;
          await prisma.market.update({
            where: { id: market.id },
            data: {
              active: !isResolved,
              resolvedAt: isResolved ? new Date() : null,
              lastSyncedAt: new Date()
            }
          });

          if (isResolved && market.active) {
            await prisma.arbitrageOpportunity.updateMany({
              where: {
                active: true,
                match: {
                  OR: [{ marketAId: market.id }, { marketBId: market.id }]
                }
              },
              data: { active: false, closedAt: new Date() }
            });
            return { ok: true as const, resolved: true as const };
          }
          return { ok: true as const, resolved: false as const };
        })
      );

      for (const result of results) {
        processed++;
        if (result.status !== 'fulfilled' || !result.value.ok) {
          errors++;
          continue;
        }
        if (result.value.resolved) markedInactive++;
        else updated++;
      }
    }

    return NextResponse.json({
      success: true,
      totalMarkets: markets.length,
      processed,
      updated,
      markedInactive,
      errors,
      timedOut,
      durationMs: Date.now() - startedAt,
      runAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ CRON FAILED:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
