import type { Market } from '../platforms/types'

/**
 * Calculate volume growth percentage (24h vs 7d average)
 */
export function calculateVolumeGrowth(market: Market & { volume7d?: number }): number {
  if (!market.volume7d || market.volume7d === 0) {
    return 0
  }
  const avg7d = market.volume7d / 7
  if (avg7d === 0) return 0
  return ((market.volume24h - avg7d) / avg7d) * 100
}

/**
 * Calculate potential ROI for a bet
 */
export function calculateROI(market: Market, betAmount: number = 100): number {
  // ROI = (payout - bet) / bet
  // Payout = (100 / price) * bet
  const price = market.yesPrice
  if (price === 0 || price === 100) return 0
  
  const payout = (100 / price) * betAmount
  const profit = payout - betAmount
  return (profit / betAmount) * 100
}

/**
 * Check if market has high confidence odds (>70% or <30%)
 */
export function isHighConfidenceOdds(market: Market): boolean {
  return market.yesPrice > 70 || market.yesPrice < 30
}

/**
 * Calculate potential profit from arbitrage
 */
export function calculateArbitrageProfit(marketA: Market, marketB: Market): number {
  // Find the market with lower YES price
  const buyMarket = marketA.yesPrice < marketB.yesPrice ? marketA : marketB
  const sellMarket = marketA.yesPrice < marketB.yesPrice ? marketB : marketA
  
  // Profit = sell price - buy price
  return sellMarket.yesPrice - buyMarket.yesPrice
}

/**
 * Detect if a market is "WTF" worthy (weird, absurd, controversial)
 */
export function isWTFMarket(market: Market): { isWTF: boolean; score: number; reasons: string[] } {
  const wtfKeywords = [
    'alien', 'aliens', 'ufo', 'extraterrestrial',
    'elon', 'musk', 'zuckerberg', 'bezos',
    'fight', 'boxing', 'vs', 'versus',
    'trump', 'biden', 'president',
    'celebrity', 'celebrity',
    'bizarre', 'weird', 'strange', 'absurd',
    'apocalypse', 'zombie', 'robot',
    'marry', 'divorce', 'pregnant',
  ]
  
  const title = market.title.toLowerCase()
  const description = market.description.toLowerCase()
  const text = `${title} ${description}`
  
  let score = 0
  const reasons: string[] = []
  
  wtfKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 1
      reasons.push(keyword)
    }
  })
  
  // Bonus points for controversial categories
  if (market.category.toLowerCase().includes('entertainment') || 
      market.category.toLowerCase().includes('crypto')) {
    score += 0.5
  }
  
  return {
    isWTF: score >= 2,
    score,
    reasons: [...new Set(reasons)],
  }
}

/**
 * Calculate time remaining until market closes
 */
export function getTimeRemaining(endDate: Date): {
  days: number
  hours: number
  minutes: number
  isUrgent: boolean
} {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isUrgent: true }
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const isUrgent = days === 0 && hours < 24
  
  return { days, hours, minutes, isUrgent }
}

/**
 * Format time remaining as string
 */
export function formatTimeRemaining(endDate: Date): string {
  const { days, hours, minutes, isUrgent } = getTimeRemaining(endDate)
  
  if (days > 0) {
    return `${days}d ${hours}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}
