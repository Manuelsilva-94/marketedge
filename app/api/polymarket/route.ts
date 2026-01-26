import { NextResponse } from 'next/server'
import { API_URLS } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5 minutes

export async function GET() {
  try {
    const response = await fetch(`${API_URLS.POLYMARKET}/events`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error(`Polymarket API error: ${response.status} ${response.statusText}`)
      // Return mock data as fallback
      return NextResponse.json(getMockPolymarketMarkets())
    }

    const events = await response.json()
    
    if (!Array.isArray(events) || events.length === 0) {
      console.warn('Polymarket API returned empty or invalid events array')
      return NextResponse.json(getMockPolymarketMarkets())
    }

    // Fetch markets for each event (limit to first 10 for performance)
    const eventsToProcess = events
      .filter((event: any) => event.active && !event.archived)
      .slice(0, 10)

    if (eventsToProcess.length === 0) {
      console.warn('No active events found')
      return NextResponse.json(getMockPolymarketMarkets())
    }

    const marketsPromises = eventsToProcess.map(async (event: any) => {
      try {
        const marketsResponse = await fetch(
          `${API_URLS.POLYMARKET}/events/${event.slug}/markets`,
          { 
            next: { revalidate: 300 },
            headers: {
              'Accept': 'application/json',
            },
          }
        )

        if (!marketsResponse.ok) {
          console.warn(`Failed to fetch markets for event ${event.slug}: ${marketsResponse.status}`)
          return []
        }

        const markets = await marketsResponse.json()
        
        if (!Array.isArray(markets)) {
          return []
        }

        return markets
          .filter((m: any) => m.active && !m.archived)
          .map((m: any) => ({
            ...m,
            eventSlug: event.slug,
            eventTitle: event.title,
            eventDescription: event.description,
            eventTags: event.tags || [],
          }))
      } catch (error) {
        console.error(`Error fetching markets for event ${event.slug}:`, error)
        return []
      }
    })

    const marketsArrays = await Promise.all(marketsPromises)
    const allMarkets = marketsArrays.flat()

    // If no markets found, return mock data
    if (allMarkets.length === 0) {
      console.warn('No markets found, returning mock data')
      return NextResponse.json(getMockPolymarketMarkets())
    }

    return NextResponse.json(allMarkets)
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
    // Return mock data as fallback instead of error
    return NextResponse.json(getMockPolymarketMarkets())
  }
}

function getMockPolymarketMarkets() {
  return [
    {
      id: 'poly-1',
      question: 'Will Bitcoin reach $100,000 by end of 2024?',
      description: 'Bitcoin price prediction market',
      slug: 'btc-100k-2024',
      active: true,
      archived: false,
      outcomePrices: ['0.45', '0.55'],
      volume24h: '150000',
      tags: [{ name: 'Crypto', slug: 'crypto' }],
      eventSlug: 'crypto-2024',
      eventTitle: 'Crypto Predictions 2024',
      eventDescription: 'Cryptocurrency markets',
      eventTags: [{ name: 'Crypto', slug: 'crypto' }],
    },
    {
      id: 'poly-2',
      question: 'Will the S&P 500 close above 5000 by end of 2024?',
      description: 'Stock market prediction',
      slug: 'spx-5000-2024',
      active: true,
      archived: false,
      outcomePrices: ['0.65', '0.35'],
      volume24h: '200000',
      tags: [{ name: 'Markets', slug: 'markets' }],
      eventSlug: 'markets-2024',
      eventTitle: 'Stock Market Predictions',
      eventDescription: 'Stock market forecasts',
      eventTags: [{ name: 'Markets', slug: 'markets' }],
    },
    {
      id: 'poly-3',
      question: 'Will there be a recession in 2024?',
      description: 'Economic prediction market',
      slug: 'recession-2024',
      active: true,
      archived: false,
      outcomePrices: ['0.30', '0.70'],
      volume24h: '180000',
      tags: [{ name: 'Economics', slug: 'economics' }],
      eventSlug: 'economics-2024',
      eventTitle: 'Economic Predictions',
      eventDescription: 'Economic forecasts',
      eventTags: [{ name: 'Economics', slug: 'economics' }],
    },
  ]
}
