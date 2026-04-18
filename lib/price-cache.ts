import { prisma } from '@/lib/prisma';
import { effectiveKalshiBuyYes, effectivePolymarketBuyYes, resolvePolymarketTakerFee } from '@/lib/fees';

/** Same freshness window as previous Redis path in arbitrage/opportunities (3 min). */
export const PRICE_CACHE_STALE_MS = 180_000;

/** Shape stored in DB + returned to API consumers (matches former Redis JSON). */
export interface CachedPricesPayload {
  poly: {
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
  };
  kalshi: {
    yesPrice: number;
    noPrice: number;
    effectiveYesPrice: number;
  };
  updatedAt: string;
}

function polyTakerFromMatchRow(match: {
  marketA: { platform: string; takerFee: number | null };
  marketB: { platform: string; takerFee: number | null };
}): number | null {
  if (match.marketA.platform === 'POLYMARKET') return match.marketA.takerFee;
  if (match.marketB.platform === 'POLYMARKET') return match.marketB.takerFee;
  return null;
}

function rowToPayload(
  row: {
    polyYesPrice: number;
    polyNoPrice: number;
    kalshiYesPrice: number;
    kalshiNoPrice: number;
    updatedAt: Date;
  },
  polymarketTakerFee: number | null | undefined
): CachedPricesPayload {
  const polyYes = row.polyYesPrice;
  const kalshiYes = row.kalshiYesPrice;
  const r = resolvePolymarketTakerFee(polymarketTakerFee);
  return {
    poly: {
      yesPrice: polyYes,
      noPrice: row.polyNoPrice,
      effectiveYesPrice: effectivePolymarketBuyYes(polyYes, r)
    },
    kalshi: {
      yesPrice: kalshiYes,
      noPrice: row.kalshiNoPrice,
      effectiveYesPrice: effectiveKalshiBuyYes(kalshiYes)
    },
    updatedAt: row.updatedAt.toISOString()
  };
}

/**
 * Reads cached prices for a match from PostgreSQL (replaces Upstash Redis).
 * Returns null if missing or older than `maxAgeMs` (default: stale after 3 min).
 */
export async function getCachedPricesFromDb(
  matchId: string,
  maxAgeMs: number = PRICE_CACHE_STALE_MS
): Promise<CachedPricesPayload | null> {
  const row = await prisma.priceCache.findUnique({
    where: { matchId },
    include: {
      match: {
        include: {
          marketA: { select: { platform: true, takerFee: true } },
          marketB: { select: { platform: true, takerFee: true } }
        }
      }
    }
  });
  if (!row) return null;
  const age = Date.now() - row.updatedAt.getTime();
  if (age > maxAgeMs) return null;
  const polyFee = polyTakerFromMatchRow(row.match);
  return rowToPayload(row, polyFee);
}

export function priceCacheRowToPayload(
  row: {
    polyYesPrice: number;
    polyNoPrice: number;
    kalshiYesPrice: number;
    kalshiNoPrice: number;
    updatedAt: Date;
  },
  polymarketTakerFee?: number | null
): CachedPricesPayload {
  return rowToPayload(row, polymarketTakerFee);
}

/** True if the Railway worker likely owns fresh prices for this match (skip cron HTTP fetch). */
export async function isPriceCacheFreshFromWorker(
  matchId: string,
  withinMs: number = 300_000
): Promise<boolean> {
  const row = await prisma.priceCache.findUnique({
    where: { matchId },
    select: { updatedAt: true }
  });
  if (!row) return false;
  return Date.now() - row.updatedAt.getTime() < withinMs;
}
