import type { Market } from '../platforms/types'
import { findArbitrageOpportunities } from '../platforms/arbitrage'
import {
  calculateVolumeGrowth,
  calculateROI,
  isHighConfidenceOdds,
  isWTFMarket,
  formatTimeRemaining,
} from './discovery'
import { getRecentWhaleTrades } from '../data/whaleActivity'
import { isCuratedWTF } from '../data/wtfMarkets'
import type React from 'react'

export interface CategorizedMarket {
  market: Market
  metric: {
    label: string
    value: string
    icon?: string | React.ReactNode
  }
  insight?: string
  score?: number
}

/**
 * Get trending markets (highest volume growth)
 */
export function getTrendingMarkets(markets: Market[]): CategorizedMarket[] {
  return markets
    .filter(m => m.volume24h > 10000) // Only markets with >$10k volume
    .map(market => {
      // Mock volume7d for now (in production, this would come from API)
      const volume7d = market.volume24h * 7 * 0.8 // Estimate
      const growth = calculateVolumeGrowth({ ...market, volume7d })
      
      return {
        market,
        metric: {
          label: 'Volume Growth',
          value: `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`,
        },
        insight: growth > 100 
          ? `This market exploded ${growth.toFixed(0)}% in the last 24 hours!`
          : growth > 50
          ? `Rapidly growing market with ${growth.toFixed(0)}% volume increase`
          : undefined,
        score: growth,
      }
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 20)
}

/**
 * Get best odds markets (high ROI potential)
 */
export function getBestOddsMarkets(markets: Market[]): CategorizedMarket[] {
  return markets
    .filter(m => isHighConfidenceOdds(m))
    .map(market => {
      const roi = calculateROI(market, 100)
      const payout = (100 / market.yesPrice) * 100
      
      return {
        market,
        metric: {
          label: 'ROI Potential',
          value: `${roi.toFixed(1)}% (${payout.toFixed(0)}x payout)`,
        },
        insight: market.yesPrice < 30
          ? `If you bet $100 today, you could win $${payout.toFixed(0)} if this happens`
          : `High confidence bet with ${market.yesPrice.toFixed(0)}% odds`,
        score: roi,
      }
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 20)
}

/**
 * Get whale activity markets
 */
export function getWhaleActivityMarkets(markets: Market[]): CategorizedMarket[] {
  const whaleTrades = getRecentWhaleTrades(24)
  
  // Map whale trades to markets
  const whaleMarkets = whaleTrades
    .map(trade => {
      const market = markets.find(m => m.id === trade.marketId || m.title === trade.marketTitle)
      if (!market) return null
      
      return {
        market,
        metric: {
          label: 'Whale Bet',
          value: `$${trade.amount.toLocaleString()} ${trade.direction}`,
        },
        insight: trade.isWhaleAlert
          ? `🚨 WHALE ALERT: Someone just bet $${trade.amount.toLocaleString()} on ${trade.direction}!`
          : `A whale bet $${trade.amount.toLocaleString()} on ${trade.direction} ${formatTimeRemaining(trade.timestamp)} ago`,
        score: trade.amount,
      } as CategorizedMarket
    })
    .filter((m): m is CategorizedMarket => m !== null)
  
  return whaleMarkets.sort((a, b) => (b.score || 0) - (a.score || 0))
}

/**
 * Get arbitrage opportunities
 */
export function getArbitrageMarkets(markets: Market[]): CategorizedMarket[] {
  const opportunities = findArbitrageOpportunities(markets)
  
  return opportunities
    .map(opp => {
      const profit = opp.potentialProfit
      const profitDollars = (profit / 100) * 1000 // Estimate for $1000 bet
      
      return {
        market: opp.marketA, // Use marketA as primary
        metric: {
          label: 'Arbitrage Profit',
          value: `${profit.toFixed(1)}% ($${profitDollars.toFixed(0)} on $1k bet)`,
        },
        insight: `Buy on ${opp.marketA.platform} at ${opp.marketA.yesPrice.toFixed(1)}%, sell on ${opp.marketB.platform} at ${opp.marketB.yesPrice.toFixed(1)}% = ${profit.toFixed(1)}% profit`,
        score: profit,
        // Store both markets for display
        marketB: opp.marketB,
      } as CategorizedMarket & { marketB?: Market }
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 20)
}

/**
 * Get WTF markets (weird, absurd, controversial)
 */
export function getWTFMarkets(markets: Market[]): CategorizedMarket[] {
  const wtfMarkets: CategorizedMarket[] = []
  
  for (const market of markets) {
    const wtf = isWTFMarket(market)
    const isCurated = isCuratedWTF(market)
    
    if (!wtf.isWTF && !isCurated) continue
    
    wtfMarkets.push({
      market,
      metric: {
        label: 'Absurdity Score',
        value: `${wtf.score.toFixed(1)}/10`,
      },
      insight: isCurated
        ? '🤯 Manually curated weird market'
        : `Detected keywords: ${wtf.reasons.slice(0, 3).join(', ')}`,
      score: wtf.score + (isCurated ? 2 : 0),
    })
  }
  
  return wtfMarkets
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 20)
}

/**
 * Get markets with widest spreads
 */
export function getWidestSpreadMarkets(markets: Market[]): CategorizedMarket[] {
  return markets
    .filter(m => m.spread > 3) // Only spreads > 3%
    .map(market => {
      const houseEdge = market.spread
      const profitPotential = (houseEdge / 100) * 10000 // Estimate for $10k market making
      
      return {
        market,
        metric: {
          label: 'House Edge',
          value: `${houseEdge.toFixed(1)}%`,
        },
        insight: `Market maker opportunity: ${houseEdge.toFixed(1)}% spread means you could profit $${profitPotential.toFixed(0)} on a $10k position`,
        score: houseEdge,
      }
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 20)
}
