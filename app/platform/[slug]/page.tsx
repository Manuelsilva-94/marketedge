'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { MarketTable } from '@/components/MarketTable'
import { FilterBar } from '@/components/FilterBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { fetchPolymarketMarkets, fetchKalshiMarkets } from '@/lib/platforms'
import type { Market, Platform } from '@/lib/platforms/types'
import { formatCompactNumber } from '@/lib/utils/formatting'
import { useMemo } from 'react'

export default function PlatformPage() {
  const params = useParams()
  const slug = params.slug as string

  const platform: Platform | null =
    slug === 'polymarket' ? 'polymarket' : slug === 'kalshi' ? 'kalshi' : null

  const { data: polymarketMarkets = [], isLoading: isLoadingPoly } = useQuery<Market[]>({
    queryKey: ['polymarket-markets'],
    queryFn: fetchPolymarketMarkets,
  })

  const { data: kalshiMarkets = [], isLoading: isLoadingKalshi } = useQuery<Market[]>({
    queryKey: ['kalshi-markets'],
    queryFn: fetchKalshiMarkets,
  })

  const markets = useMemo(() => {
    if (platform === 'polymarket') return polymarketMarkets
    if (platform === 'kalshi') return kalshiMarkets
    return []
  }, [platform, polymarketMarkets, kalshiMarkets])

  const isLoading = platform === 'polymarket' ? isLoadingPoly : isLoadingKalshi

  const stats = useMemo(() => {
    const totalVolume = markets.reduce((sum, m) => sum + m.volume24h, 0)
    const categoryCounts = new Map<string, number>()
    markets.forEach((m) => {
      categoryCounts.set(m.category, (categoryCounts.get(m.category) || 0) + 1)
    })
    const topCategories = Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalVolume,
      activeMarkets: markets.length,
      topCategories,
    }
  }, [markets])

  if (!platform) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
        <p className="text-muted-foreground">
          The platform &quot;{slug}&quot; does not exist.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight capitalize">{platform}</h1>
        <p className="text-muted-foreground mt-2">
          All markets from {platform}
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCompactNumber(stats.totalVolume)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Markets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMarkets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.topCategories[0]?.category || '—'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.topCategories[0]?.count || 0} markets
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Categories */}
      {stats.topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.topCategories.map(({ category, count }) => (
                <div
                  key={category}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{category}</span>
                  <span className="text-muted-foreground">{count} markets</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Markets Table */}
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <FilterBar />
          <MarketTable markets={markets} isLoading={isLoading} />
        </div>

        <div className="space-y-6">
          <AdPlaceholder width={300} height={600} />
        </div>
      </div>
    </div>
  )
}
