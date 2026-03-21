/**
 * DB types - inferred from Prisma to avoid @prisma/client export issues in some build environments
 */
import { prisma } from '@/lib/prisma';

export type Market = Awaited<ReturnType<typeof prisma.market.findMany>>[number];
export type Platform = 'POLYMARKET' | 'KALSHI';
export type PinType = 'WHALE' | 'ARBITRAGE' | 'COMPARISON';

export const Platform = {
  POLYMARKET: 'POLYMARKET',
  KALSHI: 'KALSHI'
} as const satisfies Record<string, Platform>;

export const PinType = {
  WHALE: 'WHALE',
  ARBITRAGE: 'ARBITRAGE',
  COMPARISON: 'COMPARISON'
} as const satisfies Record<string, PinType>;
