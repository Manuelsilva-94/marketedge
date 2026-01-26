import type { Market } from './types'
import { API_URLS, CACHE_DURATION } from '../constants'

/**
 * Polymarket API Market Response
 */
export interface PolymarketMarketResponse {
  id: string
  question: string
  description: string
  slug: string
  image?: string
  icon?: string
  active: boolean
  archived: boolean
  new?: boolean
  featured?: boolean
  liquidity?: string
  volume?: string
  endDate: string
  tags: Array<{ name: string; slug: string }>
  outcomes?: Array<{
    title: string
    price: string
    volume: string
  }>
  outcomePrices: string[]
  volume24h?: string
  liquidity24h?: string
  volume7d?: string
  liquidity7d?: string
}

let cache: { data: Market[]; timestamp: number } | null = null

/**
 * Fetch markets from Polymarket API via Next.js API route (to avoid CORS)
 * 
 * @returns Promise resolving to an array of Market objects
 * @throws Error if the API request fails after retries
 */
export async function fetchPolymarketMarkets(): Promise<Market[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('Returning cached Polymarket markets')
    return cache.data
  }

  try {
    // Use Next.js API route to avoid CORS issues
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    console.log('Fetching Polymarket markets from API route:', `${baseUrl}/api/polymarket`)
    
    const response = await fetch(`${baseUrl}/api/polymarket`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Polymarket API error: ${response.statusText} - ${errorData.error || ''}`)
    }

    const rawMarkets: PolymarketMarketResponse[] = await response.json()

    console.log(`Received ${rawMarkets.length} markets from Polymarket API`)

    // Transform the raw markets to our Market format
    const allMarkets = rawMarkets.map((market) => transformPolymarketMarket(market))

    // Update cache
    cache = {
      data: allMarkets,
      timestamp: Date.now(),
    }

    console.log(`Transformed ${allMarkets.length} Polymarket markets`)
    return allMarkets
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
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
 * Transform Polymarket market to unified Market format
 * 
 * @param market - Raw Polymarket market response
 * @returns Transformed Market object
 */
function transformPolymarketMarket(market: PolymarketMarketResponse): Market {
  // Polymarket prices are in 0-1 range, normalize to 0-100
  // Handle different possible price formats
  let yesPrice = 0
  let noPrice = 0
  
  if (market.outcomePrices && Array.isArray(market.outcomePrices) && market.outcomePrices.length >= 2) {
    yesPrice = parseFloat(String(market.outcomePrices[0] || '0')) * 100
    noPrice = parseFloat(String(market.outcomePrices[1] || '0')) * 100
  } else if (market.outcomes && Array.isArray(market.outcomes) && market.outcomes.length >= 2) {
    // Fallback to outcomes array if outcomePrices doesn't exist
    yesPrice = parseFloat(String(market.outcomes[0]?.price || '0')) * 100
    noPrice = parseFloat(String(market.outcomes[1]?.price || '0')) * 100
  } else {
    // Debug: log when we can't find prices
    console.warn('Polymarket market missing price data:', {
      id: market.id,
      hasOutcomePrices: !!market.outcomePrices,
      hasOutcomes: !!market.outcomes,
      outcomePrices: market.outcomePrices,
    })
  }
  
  // Ensure prices are valid numbers
  yesPrice = isNaN(yesPrice) ? 0 : Math.max(0, Math.min(100, yesPrice))
  noPrice = isNaN(noPrice) ? 0 : Math.max(0, Math.min(100, noPrice))
  
  // Calculate spread: 100 - yesPrice - noPrice (the gap between prices)
  // If prices don't add up to 100, the spread is the difference
  const spread = Math.max(0, Math.abs(100 - yesPrice - noPrice))
  
  // Ensure spread is a valid number
  const finalSpread = isNaN(spread) ? 0 : spread
  
  const volume24h = parseFloat(String(market.volume24h || market.volume || '0')) || 0
  const marketTags = market.tags || []

  return {
    id: market.id,
    platform: 'polymarket',
    title: market.question,
    description: market.description || '',
    category: marketTags[0]?.name || 'Uncategorized',
    volume24h,
    yesPrice,
    noPrice,
    spread: finalSpread,
    activeTraders: Math.floor((market.id.charCodeAt(0) || 0) * 7 + (market.id.length || 0) * 13) % 1000 + 10, // Deterministic placeholder based on market ID
    endDate: new Date(market.endDate || new Date()),
    url: `https://polymarket.com/event/${market.slug}`,
    affiliateUrl: `https://polymarket.com/event/${market.slug}?utm_source=marketedge`,
  }
}
