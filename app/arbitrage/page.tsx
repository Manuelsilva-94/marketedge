'use client'

import { useQuery } from '@tanstack/react-query'
import { ArbitrageCard } from '@/components/ArbitrageCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { usePolymarketMarkets, useKalshiMarkets } from '@/lib/hooks/useMarkets'
import { findArbitrageOpportunities } from '@/lib/platforms'
import type { ArbitrageOpportunity } from '@/lib/platforms/types'
import { HIGH_CONFIDENCE_THRESHOLD } from '@/lib/constants'

export default function ArbitragePage() {
  const { data: polymarketMarkets = [], isLoading: isLoadingPoly } = usePolymarketMarkets()
  const { data: kalshiMarkets = [], isLoading: isLoadingKalshi } = useKalshiMarkets()

  const isLoading = isLoadingPoly || isLoadingKalshi
  const allMarkets = [...polymarketMarkets, ...kalshiMarkets]

  const opportunities = useQuery<ArbitrageOpportunity[]>({
    queryKey: ['arbitrage-opportunities', allMarkets.length],
    queryFn: () => findArbitrageOpportunities(allMarkets),
    enabled: !isLoading && allMarkets.length > 0,
  })

  const highConfidenceOpportunities = (opportunities.data || []).filter(
    (opp) => opp.confidence >= HIGH_CONFIDENCE_THRESHOLD
  )

  const stats = {
    total: opportunities.data?.length || 0,
    highConfidence: highConfidenceOpportunities.length,
    avgProfit: opportunities.data
      ? opportunities.data.reduce((sum, opp) => sum + opp.potentialProfit, 0) /
        opportunities.data.length
      : 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Arbitrage Opportunities</h1>
        <p className="text-muted-foreground mt-2">
          Cross-platform price discrepancies and trading opportunities
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{stats.highConfidence}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Profit Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgProfit > 0 ? `${stats.avgProfit.toFixed(2)}%` : '—'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Grid */}
      {isLoading || opportunities.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : opportunities.data && opportunities.data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.data.map((opportunity, index) => (
            <div key={`${opportunity.marketA.id}-${opportunity.marketB.id}`}>
              <ArbitrageCard opportunity={opportunity} />
              {/* Show ad every 6 cards */}
              {(index + 1) % 6 === 0 && index < opportunities.data!.length - 1 && (
                <div className="mt-4">
                  <AdPlaceholder width={300} height={250} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <p>No arbitrage opportunities found at this time.</p>
            <p className="text-sm mt-2">
              Opportunities appear when price gaps exceed 3% between platforms.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Sidebar Ad */}
      <div className="mt-8 flex justify-center">
        <AdPlaceholder width={728} height={90} />
      </div>
    </div>
  )
}
