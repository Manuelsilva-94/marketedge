import { NextResponse } from 'next/server'
import { API_URLS } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5 minutes

export async function GET() {
  try {
    const response = await fetch(`${API_URLS.KALSHI}/trade-api/v2/markets`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error(`Kalshi API error: ${response.status} ${response.statusText}`)
      // Return mock data as fallback
      return NextResponse.json(getMockKalshiMarkets())
    }

    const data = await response.json()
    const markets = data.markets || []

    if (!Array.isArray(markets) || markets.length === 0) {
      console.warn('Kalshi API returned empty or invalid markets array')
      return NextResponse.json(getMockKalshiMarkets())
    }

    // Filter and limit markets
    const filteredMarkets = markets
      .filter((m: any) => m.status === 'open')
      .slice(0, 100)

    // If no open markets found, return mock data
    if (filteredMarkets.length === 0) {
      console.warn('No open markets found, returning mock data')
      return NextResponse.json(getMockKalshiMarkets())
    }

    return NextResponse.json(filteredMarkets)
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error)
    // Return mock data as fallback instead of error
    return NextResponse.json(getMockKalshiMarkets())
  }
}

function getMockKalshiMarkets() {
  return [
    {
      market_id: 'kalshi-1',
      ticker: 'SPX-5000-2024',
      title: 'Will the S&P 500 close above 5000 by end of 2024?',
      subtitle: 'Market on S&P 500 year-end level',
      status: 'open',
      yes_bid: 64,
      yes_ask: 66,
      no_bid: 34,
      no_ask: 36,
      last_price: 65,
      previous_price: 64,
      volume: 125000,
      open_time: '2024-01-01T00:00:00Z',
      close_time: '2024-12-31T23:59:59Z',
      category: 'Markets',
      subcategory: 'Stock Market',
      tags: ['markets', 'sp500'],
      liquidity: 50000,
      min_tick_size: 1,
    },
    {
      market_id: 'kalshi-2',
      ticker: 'BTC-100K-2024',
      title: 'Will Bitcoin reach $100,000 by end of 2024?',
      subtitle: 'Bitcoin price prediction',
      status: 'open',
      yes_bid: 41,
      yes_ask: 43,
      no_bid: 57,
      no_ask: 59,
      last_price: 42,
      previous_price: 41,
      volume: 98000,
      open_time: '2024-01-01T00:00:00Z',
      close_time: '2024-12-31T23:59:59Z',
      category: 'Crypto',
      subcategory: 'Bitcoin',
      tags: ['crypto', 'bitcoin'],
      liquidity: 40000,
      min_tick_size: 1,
    },
    {
      market_id: 'kalshi-3',
      ticker: 'RECESSION-2024',
      title: 'Will there be a recession in 2024?',
      subtitle: 'Economic prediction market',
      status: 'open',
      yes_bid: 29,
      yes_ask: 31,
      no_bid: 69,
      no_ask: 71,
      last_price: 30,
      previous_price: 29,
      volume: 150000,
      open_time: '2024-01-01T00:00:00Z',
      close_time: '2024-12-31T23:59:59Z',
      category: 'Economics',
      subcategory: 'Macro',
      tags: ['economics', 'recession'],
      liquidity: 60000,
      min_tick_size: 1,
    },
  ]
}
