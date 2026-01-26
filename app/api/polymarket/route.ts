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

      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
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
    console.log('Fetching Polymarket markets from:', `${API_URLS.POLYMARKET}/markets`)
    
    const response = await fetchWithRetry(`${API_URLS.POLYMARKET}/markets`, {
      next: { revalidate: 300 },
    })

    const markets = await response.json()
    
    console.log('Polymarket API response:', {
      isArray: Array.isArray(markets),
      count: Array.isArray(markets) ? markets.length : 0,
      sample: Array.isArray(markets) && markets.length > 0 ? markets[0] : null,
    })

    if (!Array.isArray(markets) || markets.length === 0) {
      console.warn('Polymarket API returned empty or invalid markets array')
      return NextResponse.json([])
    }

    // Filter active markets and limit to first 50
    const activeMarkets = markets
      .filter((m: any) => m.active && !m.archived)
      .slice(0, 50)

    console.log(`Returning ${activeMarkets.length} active Polymarket markets`)

    return NextResponse.json(activeMarkets)
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Polymarket markets', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
