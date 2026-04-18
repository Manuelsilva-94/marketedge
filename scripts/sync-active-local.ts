/**
 * Same behavior as GET /api/cron/sync-active-markets — run locally for large pair counts / no timeout.
 */
import 'dotenv/config';
import { prisma } from '@/lib/prisma';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';

async function main() {
  const polyService = new PolymarketService();
  let kalshiService: KalshiService;
  try {
    kalshiService = new KalshiService();
  } catch {
    console.error('Kalshi auth not configured');
    process.exit(1);
  }

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

  const marketsMap = new Map<
    string,
    { id: string; platform: string; externalId: string; slug: string; active: boolean }
  >();

  for (const pair of verifiedPairs) {
    marketsMap.set(pair.marketA.id, pair.marketA);
    marketsMap.set(pair.marketB.id, pair.marketB);
  }

  const markets = Array.from(marketsMap.values());
  console.log(`[sync-active-local] ${markets.length} unique markets in verified pairs`);

  const BATCH_SIZE = 10;
  let updated = 0;
  let markedInactive = 0;
  let errors = 0;

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
          } else if (market.platform === 'KALSHI') {
            liveData = await kalshiService.getLiveMarket({
              externalId: market.externalId,
              platform: 'KALSHI'
            });
          }
          if (!liveData) {
            errors++;
            return;
          }
          const isResolved = liveData.yesPrice <= 0.001 || liveData.yesPrice >= 0.999;
          await prisma.market.update({
            where: { id: market.id },
            data: {
              active: !isResolved,
              resolvedAt: isResolved ? new Date() : null,
              volume24h: liveData.volume24h ?? undefined,
              lastSyncedAt: new Date()
            }
          });
          if (isResolved) {
            await prisma.arbitrageOpportunity.updateMany({
              where: {
                active: true,
                match: {
                  OR: [{ marketAId: market.id }, { marketBId: market.id }]
                }
              },
              data: { active: false, closedAt: new Date() }
            });
          }
          if (isResolved && market.active) markedInactive++;
          else updated++;
        } catch {
          errors++;
        }
      })
    );
    if (i + BATCH_SIZE < markets.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  console.log(
    `[sync-active-local] done: updated ${updated}, markedInactive ${markedInactive}, errors ${errors}`
  );
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
