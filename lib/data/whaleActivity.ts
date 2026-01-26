import type { Market } from '../platforms/types'

export interface WhaleTrade {
  id: string
  marketId: string
  marketTitle: string
  platform: 'polymarket' | 'kalshi'
  amount: number
  direction: 'YES' | 'NO'
  timestamp: Date
  walletAddress?: string
  isWhaleAlert: boolean // >$100k
}

/**
 * Mock whale activity data
 * In production, this would come from API endpoints that track large trades
 */
export const mockWhaleTrades: WhaleTrade[] = [
  {
    id: 'whale-1',
    marketId: 'poly-1',
    marketTitle: 'Will Bitcoin reach $100,000 by end of 2024?',
    platform: 'polymarket',
    amount: 50000,
    direction: 'YES',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    walletAddress: '0x1234...5678',
    isWhaleAlert: false,
  },
  {
    id: 'whale-2',
    marketId: 'kalshi-1',
    marketTitle: 'Will the S&P 500 close above 5000 by end of 2024?',
    platform: 'kalshi',
    amount: 120000,
    direction: 'YES',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    walletAddress: '0xabcd...efgh',
    isWhaleAlert: true,
  },
  {
    id: 'whale-3',
    marketId: 'poly-2',
    marketTitle: 'Will there be a recession in 2024?',
    platform: 'polymarket',
    amount: 75000,
    direction: 'NO',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    walletAddress: '0x9876...5432',
    isWhaleAlert: false,
  },
]

/**
 * Get whale trades for a specific market
 */
export function getWhaleTradesForMarket(marketId: string): WhaleTrade[] {
  return mockWhaleTrades.filter(trade => trade.marketId === marketId)
}

/**
 * Get recent whale trades (last 24 hours)
 */
export function getRecentWhaleTrades(hours: number = 24): WhaleTrade[] {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000)
  return mockWhaleTrades
    .filter(trade => trade.timestamp >= cutoff)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
