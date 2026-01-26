import type { Market } from './types'
import { API_URLS, CACHE_DURATION } from '../constants'

interface PolymarketEvent {
  slug: string
  title: string
  description: string
  image: string
  icon: string
  active: boolean
  archived: boolean
  new: boolean
  featured: boolean
  liquidity: string
  volume: string
  endDate: string
  tags: Array<{ name: string; slug: string }>
}

interface PolymarketMarket {
  id: string
  question: string
  description: string
  slug: string
  image: string
  icon: string
  active: boolean
  archived: boolean
  new: boolean
  featured: boolean
  liquidity: string
  volume: string
  endDate: string
  tags: Array<{ name: string; slug: string }>
  outcomes: Array<{
    title: string
    price: string
    volume: string
  }>
  outcomePrices: string[]
  volume24h: string
  liquidity24h: string
  volume7d: string
  liquidity7d: string
}

let cache: { data: Market[]; timestamp: number } | null = null

/**
 * Fetch markets from Polymarket API via Next.js API route (to avoid CORS)
 */
export async function fetchPolymarketMarkets(): Promise<Market[]> {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache.data
  }

  try {
    // Use Next.js API route to avoid CORS issues
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/polymarket`, {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.statusText}`)
    }

    const rawMarkets: any[] = await response.json()

    // Transform the raw markets to our Market format
    const allMarkets = rawMarkets.map((market) => {
      const eventSlug = market.eventSlug || ''
      const eventTitle = market.eventTitle || ''
      const eventDescription = market.eventDescription || ''
      const eventTags = market.eventTags || market.tags || []
      
      return transformPolymarketMarket(market, {
        slug: eventSlug,
        title: eventTitle,
        description: eventDescription,
        tags: eventTags,
      } as PolymarketEvent)
    })

    // Update cache
    cache = {
      data: allMarkets,
      timestamp: Date.now(),
    }

    return allMarkets
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
    // Return cached data if available, even if stale
    if (cache) {
      return cache.data
    }
    // Return empty array instead of throwing to prevent UI crashes
    return []
  }
}

/**
 * Transform Polymarket market to unified Market format
 */
function transformPolymarketMarket(
  market: any,
  event: PolymarketEvent | { slug: string; title: string; description: string; tags: Array<{ name: string; slug: string }> }
): Market {
  const yesPrice = parseFloat(market.outcomePrices?.[0] || '0') * 100
  const noPrice = parseFloat(market.outcomePrices?.[1] || '0') * 100
  const volume24h = parseFloat(market.volume24h || '0')
  const spread = Math.abs(yesPrice - noPrice)

  const eventSlug = 'slug' in event ? event.slug : ''
  const eventTitle = 'title' in event ? event.title : ''
  const eventDescription = 'description' in event ? event.description : ''
  const eventTags = 'tags' in event ? event.tags : []
  const marketTags = market.tags || []

  return {
    id: market.id,
    platform: 'polymarket',
    title: market.question || eventTitle,
    description: market.description || eventDescription,
    category: marketTags[0]?.name || eventTags[0]?.name || 'Uncategorized',
    volume24h,
    yesPrice,
    noPrice,
    spread,
    activeTraders: Math.floor((market.id.charCodeAt(0) || 0) * 7 + (market.id.length || 0) * 13) % 1000 + 10, // Deterministic placeholder based on market ID
    endDate: new Date(market.endDate || new Date()),
    url: `https://polymarket.com/event/${eventSlug}/${market.slug || ''}`,
    affiliateUrl: `https://polymarket.com/event/${eventSlug}/${market.slug || ''}?utm_source=marketedge`,
  }
}
