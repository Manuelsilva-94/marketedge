'use client'

import { useQuery } from '@tanstack/react-query'
import { PlatformTabs } from '@/components/PlatformTabs'
import { FilterBar } from '@/components/FilterBar'
import { MarketTable } from '@/components/MarketTable'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { useMarketStore } from '@/lib/store/marketStore'
import { fetchPolymarketMarkets, fetchKalshiMarkets, findArbitrageOpportunities } from '@/lib/platforms'
import type { Market } from '@/lib/platforms/types'
import { useMemo } from 'react'

export default function Home() {
  const { selectedPlatform, searchQuery, selectedCategory, minVolume, minSpread } = useMarketStore()

  // Fetch markets from both platforms
  const { data: polymarketMarkets = [], isLoading: isLoadingPoly } = useQuery<Market[]>({
    queryKey: ['polymarket-markets'],
    queryFn: fetchPolymarketMarkets,
  })

  const { data: kalshiMarkets = [], isLoading: isLoadingKalshi } = useQuery<Market[]>({
    queryKey: ['kalshi-markets'],
    queryFn: fetchKalshiMarkets,
  })

  const isLoading = isLoadingPoly || isLoadingKalshi

  // Combine and filter markets
  const allMarkets = useMemo(() => {
    let markets: Market[] = []

    if (selectedPlatform === 'all') {
      markets = [...polymarketMarkets, ...kalshiMarkets]
    } else if (selectedPlatform === 'polymarket') {
      markets = polymarketMarkets
    } else if (selectedPlatform === 'kalshi') {
      markets = kalshiMarkets
    }

    // Apply filters
    return markets.filter((market) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = market.title.toLowerCase().includes(query)
        const matchesDescription = market.description.toLowerCase().includes(query)
        const matchesCategory = market.category.toLowerCase().includes(query)
        if (!matchesTitle && !matchesDescription && !matchesCategory) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && market.category !== selectedCategory) {
        return false
      }

      // Volume filter
      if (market.volume24h < minVolume) {
        return false
      }

      // Spread filter
      if (market.spread < minSpread) {
        return false
      }

      return true
    })
  }, [
    polymarketMarkets,
    kalshiMarkets,
    selectedPlatform,
    searchQuery,
    selectedCategory,
    minVolume,
    minSpread,
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time prediction markets from Polymarket and Kalshi
          </p>
        </div>
      </div>

      <PlatformTabs />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <FilterBar />
          <MarketTable markets={allMarkets} isLoading={isLoading} />
        </div>

        <div className="space-y-6">
          <AdPlaceholder width={300} height={600} />
        </div>
      </div>
    </div>
  )
}
