import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { redis, priceKey, PRICE_TTL } from '@/lib/redis';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 55;
export const preferredRegion = 'iad1';

export async function GET(req: NextRequest) {
    const authError = requireCronAuth(req);
    if (authError) return authError;

    const startTime = Date.now();

    const polyService = new PolymarketService();
    let kalshiService: KalshiService;
    try {
        kalshiService = new KalshiService();
    } catch {
        return NextResponse.json({ error: 'Kalshi auth not configured' }, { status: 500 });
    }

    // Cargar pares verificados ordenados por volumen
    const pairs = await prisma.marketMatch.findMany({
        where: {
            isEquivalent: true,
            confidence: { gte: 0.82 },
            marketA: { active: true },
            marketB: { active: true }
        },
        include: {
            marketA: { select: { id: true, platform: true, externalId: true, slug: true, volume24h: true } },
            marketB: { select: { id: true, platform: true, externalId: true, slug: true, volume24h: true } }
        }
    });

    // Normalizar y ordenar por volumen, tomar top 60
    const normalized = pairs
        .map(p => {
            const poly = p.marketA.platform === 'POLYMARKET' ? p.marketA : p.marketB;
            const kalshi = p.marketA.platform === 'KALSHI' ? p.marketA : p.marketB;
            if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') return null;
            return {
                matchId: p.id,
                poly,
                kalshi,
                volume: (poly.volume24h ?? 0) + (kalshi.volume24h ?? 0)
            };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null && p.volume > 0)
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 60);

    console.log(`[update-prices] Processing ${normalized.length} pairs`);

    let updated = 0;
    let failed = 0;
    const BATCH = 5;

    for (let i = 0; i < normalized.length; i += BATCH) {
        // Hard stop a los 50s para no exceder timeout
        if (Date.now() - startTime > 50_000) {
            console.log(`[update-prices] Time limit reached at ${updated} updated`);
            break;
        }

        const batch = normalized.slice(i, i + BATCH);
        await Promise.allSettled(batch.map(async (pair) => {
            try {
                const [polyLive, kalshiLive] = await Promise.all([
                    polyService.getLiveMarket({
                        externalId: pair.poly.externalId,
                        platform: 'POLYMARKET',
                        slug: pair.poly.slug
                    }),
                    kalshiService.getLiveMarket({
                        externalId: pair.kalshi.externalId,
                        platform: 'KALSHI'
                    })
                ]);

                if (!polyLive?.yesPrice || !kalshiLive?.yesPrice) {
                    failed++;
                    return;
                }

                await redis.set(
                    priceKey(pair.matchId),
                    JSON.stringify({
                        poly: {
                            yesPrice: polyLive.yesPrice,
                            noPrice: polyLive.noPrice,
                            effectiveYesPrice: polyLive.effectiveYesPrice
                        },
                        kalshi: {
                            yesPrice: kalshiLive.yesPrice,
                            noPrice: kalshiLive.noPrice,
                            effectiveYesPrice: kalshiLive.effectiveYesPrice
                        },
                        updatedAt: new Date().toISOString()
                    }),
                    { ex: PRICE_TTL }
                );
                updated++;
            } catch {
                failed++;
            }
        }));

        if (i + BATCH < normalized.length) {
            await new Promise(r => setTimeout(r, 150));
        }
    }

    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log(`[update-prices] Done: ${updated} updated, ${failed} failed in ${duration}s`);

    return NextResponse.json({
        success: true,
        updated,
        failed,
        total: normalized.length,
        durationMs: Date.now() - startTime
    });
}