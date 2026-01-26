import type { Market, ArbitrageOpportunity } from './types'
import { calculateSimilarity } from '../utils/fuzzyMatch'
import { ARBITRAGE_THRESHOLD } from '../constants'

/**
 * Find arbitrage opportunities across platforms
 */
export function findArbitrageOpportunities(
  markets: Market[]
): ArbitrageOpportunity[] {
  const opportunities: ArbitrageOpportunity[] = []
  const polymarketMarkets = markets.filter(m => m.platform === 'polymarket')
  const kalshiMarkets = markets.filter(m => m.platform === 'kalshi')

  // Compare each Polymarket market with each Kalshi market
  for (const polyMarket of polymarketMarkets) {
    for (const kalshiMarket of kalshiMarkets) {
      const confidence = calculateSimilarity(polyMarket, kalshiMarket)

      // Only consider if confidence is reasonable
      if (confidence < 50) continue

      // Calculate price difference
      const priceDiff = Math.abs(polyMarket.yesPrice - kalshiMarket.yesPrice)

      // Only show if gap is above threshold
      if (priceDiff >= ARBITRAGE_THRESHOLD) {
        // Calculate potential profit (simplified)
        const potentialProfit = priceDiff

        opportunities.push({
          marketA: polyMarket,
          marketB: kalshiMarket,
          potentialProfit,
          confidence,
        })
      }
    }
  }

  // Sort by potential profit (descending)
  return opportunities.sort((a, b) => b.potentialProfit - a.potentialProfit)
}

/**
 * Calculate potential profit from an arbitrage opportunity
 */
export function calculateArbitrageProfit(opportunity: ArbitrageOpportunity): number {
  const { marketA, marketB } = opportunity

  // Find the market with lower YES price and higher NO price
  const buyYesMarket = marketA.yesPrice < marketB.yesPrice ? marketA : marketB
  const sellYesMarket = marketA.yesPrice < marketB.yesPrice ? marketB : marketA

  // Simplified profit calculation
  // In reality, you'd need to account for fees, slippage, etc.
  const profit = sellYesMarket.yesPrice - buyYesMarket.yesPrice

  return Math.max(0, profit)
}
