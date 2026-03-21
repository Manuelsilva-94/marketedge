export type Platform = 'POLYMARKET' | 'KALSHI';

export interface Market {
  id: string;
  platform: Platform;
  externalId: string;
  question: string;
  slug: string;
  description?: string;
  category?: string;
  tags: string[];
  /** From live data - not stored in DB */
  yesPrice?: number;
  noPrice?: number;
  midPrice?: number;
  yesBid?: number;
  yesAsk?: number;
  noBid?: number;
  noAsk?: number;
  makerFee?: number;
  takerFee?: number;
  feeStructure?: string;
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  openInterest?: number;
  active: boolean;
  endDate?: string;
  resolvedAt?: string;
  outcome?: string;
  imageUrl?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
  lastSyncedAt: string;
}

export interface MatchedMarket {
  market: Market;
  score: number;
  flags: string[];
}

export interface ComparisonResult {
  sourceMarket: Market;
  matches: MatchedMarket[];
  bestDeal: {
    yes: { market: Market; effectivePrice: number };
    no: { market: Market; effectivePrice: number };
  } | null;
  arbitrage: {
    exists: boolean;
    roi?: number;
    profit?: number;
    strategy?: string;
  } | null;
}
