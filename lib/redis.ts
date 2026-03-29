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