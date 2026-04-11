import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helpers para precios
export const PRICE_TTL = 120; // 2 minutos — si update-prices falla, los precios expiran solos

export function priceKey(matchId: string): string {
    return `prices:${matchId}`;
}

/** Evita cientos de GET fallidos cuando Upstash supera la cuota mensual. */
const REDIS_READ_COOLDOWN_MS = 5 * 60_000;
let redisPriceReadsDisabledUntil = 0;

function isRedisQuotaError(err: unknown): boolean {
    const s = err instanceof Error ? err.message : String(err);
    return (
        s.includes('max requests limit') ||
        s.includes('max request limit') ||
        s.includes('ERR max requests')
    );
}

function markRedisReadQuotaExceeded(): void {
    const now = Date.now();
    const already = now < redisPriceReadsDisabledUntil;
    redisPriceReadsDisabledUntil = now + REDIS_READ_COOLDOWN_MS;
    if (!already) {
        console.warn(
            '[Redis] Read quota exceeded (or repeated errors). Skipping price-cache reads for 5m — live prices only. Upgrade plan or set SKIP_REDIS_PRICE_CACHE=1 to silence.'
        );
    }
}

export function shouldSkipRedisPriceReads(): boolean {
    if (process.env.SKIP_REDIS_PRICE_CACHE === '1' || process.env.SKIP_REDIS_PRICE_CACHE === 'true') {
        return true;
    }
    return Date.now() < redisPriceReadsDisabledUntil;
}

/**
 * GET de caché de precios por match; ante cuota Upstash, desactiva lecturas unos minutos.
 */
export async function getCachedPricesForMatch(matchId: string): Promise<unknown | null> {
    if (shouldSkipRedisPriceReads()) return null;
    try {
        const cached = await redis.get(priceKey(matchId));
        return cached ?? null;
    } catch (e) {
        if (isRedisQuotaError(e)) {
            markRedisReadQuotaExceeded();
        } else {
            console.warn('[Redis] get price cache:', e instanceof Error ? e.message : e);
        }
        return null;
    }
}