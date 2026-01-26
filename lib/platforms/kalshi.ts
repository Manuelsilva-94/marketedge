import type { Market } from './types'
import { API_URLS, CACHE_DURATION } from '../constants'

interface KalshiMarket {
  market_id: string
  ticker: string
  title: string
  subtitle: string
  status: string
  yes_bid: number
  yes_ask: number
  no_bid: number
  no_ask: number
  last_price: number
  previous_price: number
  volume: number
  open_time: string
  close_time: string
  category: string
  subcategory: string
  tags: string[]
  liquidity: number
  min_tick_size: number
}

let cache: { data: Market[]; timestamp: number } | null = null

/**
 * Fetch markets from Kalshi API via Next.js API route (to avoid CORS)
 */
export async function fetchKalshiMarkets(): Promise<Market[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data
  }

  try {
    // Use Next.js API route to avoid CORS issues
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/kalshi`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`Kalshi API error: ${response.statusText}`)
    }

    const rawMarkets: KalshiMarket[] = await response.json()

    const transformedMarkets = rawMarkets.map(transformKalshiMarket)

    // Update cache
    cache = {
      data: transformedMarkets,
      timestamp: Date.now(),
    }

    return transformedMarkets
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error)
    // Return cached data if available, even if stale
    if (cache) {
      return cache.data
    }
    // Return mock data for development if API fails
    return generateMockKalshiMarkets()
  }
}

/**
 * Transform Kalshi market to unified Market format
 */
function transformKalshiMarket(market: KalshiMarket): Market {
  // Kalshi prices are in cents (0-100), so we use them directly
  const yesPrice = market.yes_ask || market.last_price || 50
  const noPrice = 100 - yesPrice
  const spread = Math.abs(market.yes_ask - market.yes_bid) || 0
  const volume24h = market.volume || 0

  return {
    id: market.market_id,
    platform: 'kalshi',
    title: market.title,
    description: market.subtitle || '',
    category: market.category || market.subcategory || 'Uncategorized',
    volume24h,
    yesPrice,
    noPrice,
    spread,
    activeTraders: Math.floor((market.market_id.charCodeAt(0) || 0) * 5 + (market.market_id.length || 0) * 11) % 500 + 5, // Deterministic placeholder based on market ID
    endDate: new Date(market.close_time),
    url: `https://kalshi.com/trade/${market.ticker}`,
    affiliateUrl: `https://kalshi.com/trade/${market.ticker}?utm_source=marketedge`,
  }
}

/**
 * Generate mock Kalshi markets for development/testing
 */
function generateMockKalshiMarkets(): Market[] {
  const mockMarkets: Market[] = [
    {
      id: 'kalshi-1',
      platform: 'kalshi',
      title: 'Will the S&P 500 close above 5000 by end of 2024?',
      description: 'Market on S&P 500 year-end level',
      category: 'Markets',
      volume24h: 125000,
      yesPrice: 65,
      noPrice: 35,
      spread: 2,
      activeTraders: 450,
      endDate: new Date('2024-12-31'),
      url: 'https://kalshi.com/trade/SPX-5000-2024',
      affiliateUrl: 'https://kalshi.com/trade/SPX-5000-2024?utm_source=marketedge',
    },
    {
      id: 'kalshi-2',
      platform: 'kalshi',
      title: 'Will Bitcoin reach $100,000 by end of 2024?',
      description: 'Bitcoin price prediction',
      category: 'Crypto',
      volume24h: 98000,
      yesPrice: 42,
      noPrice: 58,
      spread: 3,
      activeTraders: 320,
      endDate: new Date('2024-12-31'),
      url: 'https://kalshi.com/trade/BTC-100K-2024',
      affiliateUrl: 'https://kalshi.com/trade/BTC-100K-2024?utm_source=marketedge',
    },
  ]

  return mockMarkets
}
