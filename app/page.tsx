'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { DiscoveryCard } from '@/components/DiscoveryCard'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { useAllMarkets } from '@/lib/hooks/useMarkets'
import {
  getTrendingMarkets,
  getBestOddsMarkets,
  getWhaleActivityMarkets,
  getArbitrageMarkets,
  getWTFMarkets,
  getWidestSpreadMarkets,
} from '@/lib/utils/categorizeMarkets'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, DollarSign, AlertTriangle, Zap, Meh, BarChart3, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DiscoveryTab = 'trending' | 'best-odds' | 'whale' | 'arbitrage' | 'wtf' | 'spread'

export default function Home() {
  const [activeTab, setActiveTab] = useState<DiscoveryTab>('trending')
  const { data: allMarkets = [], isLoading, refetch } = useAllMarkets()

  // Categorize markets based on active tab
  const categorizedMarkets = useMemo(() => {
    if (isLoading || allMarkets.length === 0) return []

    switch (activeTab) {
      case 'trending':
        return getTrendingMarkets(allMarkets)
      case 'best-odds':
        return getBestOddsMarkets(allMarkets)
      case 'whale':
        return getWhaleActivityMarkets(allMarkets)
      case 'arbitrage':
        return getArbitrageMarkets(allMarkets)
      case 'wtf':
        return getWTFMarkets(allMarkets)
      case 'spread':
        return getWidestSpreadMarkets(allMarkets)
      default:
        return []
    }
  }, [allMarkets, activeTab, isLoading])

  const tabConfig = {
    trending: {
      icon: TrendingUp,
      label: '🔥 Trending',
      description: 'Markets exploding in volume',
      color: 'text-red-400',
    },
    'best-odds': {
      icon: DollarSign,
      label: '💰 Best Odds',
      description: 'Highest ROI potential',
      color: 'text-green-400',
    },
    whale: {
      icon: AlertTriangle,
      label: '🐋 Whale Activity',
      description: 'Big money moves',
      color: 'text-blue-400',
    },
    arbitrage: {
      icon: Zap,
      label: '⚡ Arbitrage',
      description: 'Cross-platform opportunities',
      color: 'text-yellow-400',
    },
    wtf: {
      icon: Meh,
      label: '🤯 WTF Markets',
      description: 'Weird, absurd, controversial',
      color: 'text-pink-400',
    },
    spread: {
      icon: BarChart3,
      label: '📊 Widest Spreads',
      description: 'Market maker opportunities',
      color: 'text-yellow-400',
    },
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Discover the Most{' '}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Interesting Bets
          </span>{' '}
          on the Internet
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find trending markets, whale activity, arbitrage opportunities, and the weirdest predictions
          across Polymarket and Kalshi
        </p>
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="mt-4"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Markets
        </Button>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as DiscoveryTab)}>
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto p-1">
          {Object.entries(tabConfig).map(([key, config]) => {
            const Icon = config.icon
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 data-[state=active]:bg-background"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{config.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="mt-6">
          <TabsContent value={activeTab} className="mt-0">
            <div className="mb-4">
              <p className="text-muted-foreground">
                {tabConfig[activeTab].description}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {categorizedMarkets.length} {categorizedMarkets.length === 1 ? 'market' : 'markets'} found
              </p>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : categorizedMarkets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No markets found in this category.</p>
                <p className="text-sm mt-2">
                  Try refreshing or check back later for new opportunities.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {categorizedMarkets.map((item, index) => (
                  <div key={`${item.market.id}-${index}`}>
                    <DiscoveryCard
                      market={item.market}
                      variant={activeTab}
                      metric={item.metric}
                      insight={item.insight}
                    />
                    {/* Show ad every 6 cards */}
                    {(index + 1) % 6 === 0 && index < categorizedMarkets.length - 1 && (
                      <div className="mt-6">
                        <AdPlaceholder width={728} height={90} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Sidebar Ad (Desktop) */}
      <div className="hidden lg:block fixed right-4 top-20">
        <AdPlaceholder width={300} height={600} />
      </div>
    </div>
  )
}
