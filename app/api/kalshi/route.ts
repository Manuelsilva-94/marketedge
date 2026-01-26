import { NextResponse } from 'next/server'
import { API_URLS } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const revalidate = 300 // 5 minutes

/**
 * Retry a fetch request with exponential backoff
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...options.headers,
        },
      })

      if (response.ok) {
        return response
      }

      // Check for rate limiting (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000
        console.warn(`Rate limited. Waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries}`)
        
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, waitTime))
          continue
        }
      }

      // Don't retry on 4xx errors (except 429)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(`Client error: ${response.status} ${response.statusText}`)
      }

      lastError = new Error(`Server error: ${response.status} ${response.statusText}`)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
    }

    // Exponential backoff: wait 1s, 2s, 4s
    if (attempt < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }

  throw lastError || new Error('Failed to fetch after retries')
}

export async function GET() {
  try {
    console.log('Fetching Kalshi markets from:', `${API_URLS.KALSHI}/trade-api/v2/markets`)
    
    const response = await fetchWithRetry(`${API_URLS.KALSHI}/trade-api/v2/markets`, {
      next: { revalidate: 300 },
    })

    const data = await response.json()
    const markets = data.markets || []
    
    console.log('Kalshi API response:', {
      isArray: Array.isArray(markets),
      count: markets.length,
      sample: markets.length > 0 ? markets[0] : null,
    })

    if (!Array.isArray(markets) || markets.length === 0) {
      console.warn('Kalshi API returned empty or invalid markets array')
      return NextResponse.json([])
    }

    // Filter open markets and limit to first 50
    const openMarkets = markets
      .filter((m: any) => m.status === 'open')
      .slice(0, 50)

    console.log(`Returning ${openMarkets.length} open Kalshi markets`)

    return NextResponse.json(openMarkets)
  } catch (error) {
    console.error('Error fetching Kalshi markets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Kalshi markets', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
