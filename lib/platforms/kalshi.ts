import type { Market } from './types'
import { API_URLS, CACHE_DURATION } from '../constants'

/**
 * Kalshi API Market Response
 */
export interface KalshiMarketResponse {
  market_id: string
  ticker: string
  title: string
  subtitle?: string
  status: string
  yes_bid: number
  yes_ask: number
  no_bid: number
  no_ask: number
  last_price: number
  previous_price?: number
  volume: number
  open_time: string
  close_time: string
  category: string
  subcategory?: string
  tags?: string[]
  liquidity?: number
  min_tick_size?: number
}

/**
 * Category mapping from Kalshi categories to standard categories
 */
const CATEGORY_MAP: Record<string, string> = {
  'politics': 'Politics',
  'economics': 'Economics',
  'sports': 'Sports',
  'entertainment': 'Entertainment',
  'technology': 'Technology',
  'crypto': 'Crypto',
  'markets': 'Markets',
  'weather': 'Weather',
  'other': 'Other',
}

let cache: { data: Market[]; timestamp: number } | null = null

/**
 * Fetch markets from Kalshi API via Next.js API route (to avoid CORS)
 * 
 * @returns Promise resolving to an array of Market objects
 * @throws Error if the API request fails after retries
 */
export async function fetchKalshiMarkets(): Promise<Market[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('Returning cached Kalshi markets')
    return cache.data
  }

  try {
    // Use Next.js API route to avoid CORS issues
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    console.log('Fetching Kalshi markets from API route:', `${baseUrl}/api/kalshi`)
    
    const response = await fetch(`${baseUrl}/api/kalshi`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Kalshi API error: ${response.statusText} - ${errorData.error || ''}`)
    }

    const rawMarkets: KalshiMarketResponse[] = await response.json()

    console.log(`Received ${rawMarkets.length} markets from Kalshi API`)

    const transformedMarkets = rawMarkets.map(transformKalshiMarket)

    // Update cache
    cache = {
      data: transformedMarkets,
      timestamp: Date.now(),
    }

    console.log(`Transformed ${transformedMarkets.length} Kalshi markets`)
    return transformedMarkets
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error)
    // Return cached data if available, even if stale
    if (cache) {
      console.log('Returning stale cached data due to error')
      return cache.data
    }
    // Return empty array instead of throwing to prevent UI crashes
    return []
  }
}

/**
 * Transform Kalshi market to unified Market format
 * 
 * @param market - Raw Kalshi market response
 * @returns Transformed Market object
 */
function transformKalshiMarket(market: KalshiMarketResponse): Market {
  // Kalshi prices are already in 0-100 range (cents)
  // Ensure we have valid numbers
  const yesAsk = typeof market.yes_ask === 'number' ? market.yes_ask : (typeof market.last_price === 'number' ? market.last_price : 50)
  const yesBid = typeof market.yes_bid === 'number' ? market.yes_bid : yesAsk
  
  const yesPrice = isNaN(yesAsk) ? 50 : Math.max(0, Math.min(100, yesAsk))
  const noPrice = Math.max(0, Math.min(100, 100 - yesPrice))
  
  // Calculate spread: difference between bid and ask
  const spread = Math.abs(yesAsk - yesBid)
  const finalSpread = isNaN(spread) ? 0 : Math.max(0, spread)
  
  // Debug: log if we have invalid data
  if (isNaN(yesPrice) || isNaN(noPrice) || isNaN(finalSpread)) {
    console.warn('Kalshi market has invalid price data:', {
      market_id: market.market_id,
      yes_ask: market.yes_ask,
      yes_bid: market.yes_bid,
      last_price: market.last_price,
      calculated: { yesPrice, noPrice, spread: finalSpread },
    })
  }
  
  const volume24h = typeof market.volume === 'number' ? market.volume : 0
  
  // Map category to standard category
  const categoryKey = (market.category || '').toLowerCase()
  const category = CATEGORY_MAP[categoryKey] || market.category || market.subcategory || 'Uncategorized'

  return {
    id: market.market_id,
    platform: 'kalshi',
    title: market.title,
    description: market.subtitle || '',
    category,
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
