'use client'

import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useMarketStore } from '@/lib/store/marketStore'
import type { Platform } from '@/lib/platforms/types'

export function PlatformTabs() {
  const { selectedPlatform, setSelectedPlatform } = useMarketStore()

  return (
    <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as Platform | 'all')}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All Markets</TabsTrigger>
        <TabsTrigger value="polymarket">Polymarket</TabsTrigger>
        <TabsTrigger value="kalshi">Kalshi</TabsTrigger>
        <TabsTrigger value="arbitrage">Arbitrage</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
