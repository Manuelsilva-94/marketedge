export type Platform = 'polymarket' | 'kalshi'

export interface Market {
  id: string
  platform: Platform
  title: string
  description: string
  category: string
  volume24h: number
  yesPrice: number  // 0-100 normalized
  noPrice: number   // 0-100 normalized
  spread: number    // calculated gap
  activeTraders: number
  endDate: Date
  url: string       // direct link to platform
  affiliateUrl?: string
}

export interface ArbitrageOpportunity {
  marketA: Market
  marketB: Market
  potentialProfit: number  // percentage
  confidence: number       // 0-100 matching confidence
}

export interface PlatformStats {
  totalVolume: number
  activeMarkets: number
  topCategories: Array<{ category: string; count: number }>
}
