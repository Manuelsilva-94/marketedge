import { useQuery } from '@tanstack/react-query'
import { fetchPolymarketMarkets, fetchKalshiMarkets } from '../platforms'
import type { Market } from '../platforms/types'

const CACHE_TIME = 5 * 60 * 1000 // 5 minutes

/**
 * React Query hook to fetch Polymarket markets
 * 
 * @returns Query result with Polymarket markets data
 */
export function usePolymarketMarkets() {
  return useQuery<Market[]>({
    queryKey: ['polymarket-markets'],
    queryFn: fetchPolymarketMarkets,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  })
}

/**
 * React Query hook to fetch Kalshi markets
 * 
 * @returns Query result with Kalshi markets data
 */
export function useKalshiMarkets() {
  return useQuery<Market[]>({
    queryKey: ['kalshi-markets'],
    queryFn: fetchKalshiMarkets,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME * 2, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  })
}

/**
 * React Query hook to fetch all markets from both platforms
 * 
 * @returns Query result with combined markets from both platforms
 */
export function useAllMarkets() {
  const polymarketQuery = usePolymarketMarkets()
  const kalshiQuery = useKalshiMarkets()

  const allMarkets: Market[] = [
    ...(polymarketQuery.data || []),
    ...(kalshiQuery.data || []),
  ]

  return {
    data: allMarkets,
    isLoading: polymarketQuery.isLoading || kalshiQuery.isLoading,
    isError: polymarketQuery.isError || kalshiQuery.isError,
    error: polymarketQuery.error || kalshiQuery.error,
    refetch: () => {
      polymarketQuery.refetch()
      kalshiQuery.refetch()
    },
  }
}
