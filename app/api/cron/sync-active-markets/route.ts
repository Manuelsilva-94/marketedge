import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startedAt = Date.now();
  let updated = 0;
  let markedInactive = 0;
  let errors = 0;

  try {
    const polyService = new PolymarketService();
    let kalshiService: KalshiService | null = null;
    try {
      kalshiService = new KalshiService();
    } catch {
      return NextResponse.json({ error: 'Kalshi auth not configured' }, { status: 500 });
    }

    // Obtener todos los markets únicos que están en pares verificados
    const verifiedPairs = await prisma.marketMatch.findMany({
      where: { isEquivalent: true },
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
    });

    // Deduplicar markets por id
    const marketsMap = new Map<
      string,
      {
        id: string;
        platform: string;
        externalId: string;
        slug: string;
        active: boolean;
      }
    >();

    for (const pair of verifiedPairs) {
      marketsMap.set(pair.marketA.id, pair.marketA);
      marketsMap.set(pair.marketB.id, pair.marketB);
    }

    const markets = Array.from(marketsMap.values());
    console.log(`[SyncMarkets] Syncing ${markets.length} unique markets`);

    const BATCH_SIZE = 10;

    for (let i = 0; i < markets.length; i += BATCH_SIZE) {
      const batch = markets.slice(i, i + BATCH_SIZE);

      await Promise.allSettled(
        batch.map(async (market) => {
          try {
            let liveData: { yesPrice: number; volume24h?: number } | null = null;

            if (market.platform === 'POLYMARKET') {
              liveData = await polyService.getLiveMarket({
                externalId: market.externalId,
                platform: 'POLYMARKET',
                slug: market.slug
              });
            } else if (market.platform === 'KALSHI' && kalshiService) {
              liveData = await kalshiService.getLiveMarket({
                externalId: market.externalId,
                platform: 'KALSHI'
              });
            }

            if (!liveData) {
              errors++;
              return;
            }

            // Detectar si el market está resuelto (precio extremo)
            const isResolved = liveData.yesPrice <= 0.001 || liveData.yesPrice >= 0.999;

            await prisma.market.update({
              where: { id: market.id },
              data: {
                active: !isResolved,
                volume24h: liveData.volume24h ?? undefined,
                lastSyncedAt: new Date()
              }
            });

            if (isResolved && market.active) {
              markedInactive++;
              console.log(`[SyncMarkets] Marked inactive: ${market.externalId}`);
            } else {
              updated++;
            }
          } catch {
            errors++;
          }
        })
      );

      // Pausa entre batches
      if (i + BATCH_SIZE < markets.length) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    const duration = Date.now() - startedAt;
    console.log(
      `[SyncMarkets] Done: ${updated} updated, ${markedInactive} inactive, ${errors} errors in ${duration}ms`
    );

    return NextResponse.json({
      success: true,
      totalMarkets: markets.length,
      updated,
      markedInactive,
      errors,
      durationMs: duration,
      runAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[SyncMarkets] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
