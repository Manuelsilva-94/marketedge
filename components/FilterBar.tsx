'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useMarketStore } from '@/lib/store/marketStore'
import { usePolymarketMarkets, useKalshiMarkets } from '@/lib/hooks/useMarkets'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function FilterBar() {
  const {
    searchQuery,
    selectedCategory,
    minVolume,
    minSpread,
    setSearchQuery,
    setSelectedCategory,
    setMinVolume,
    setMinSpread,
  } = useMarketStore()

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    setSearchQuery(debouncedSearch)
  }, [debouncedSearch, setSearchQuery])

  // Get all markets to extract unique categories
  const { data: polymarketMarkets = [] } = usePolymarketMarkets()
  const { data: kalshiMarkets = [] } = useKalshiMarkets()
  const allMarkets = [...polymarketMarkets, ...kalshiMarkets]

  const categories = Array.from(
    new Set(allMarkets.map((m) => m.category))
  ).sort()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="volume">
              Min Volume: ${minVolume.toLocaleString()}
            </Label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={minVolume}
              onChange={(e) => setMinVolume(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spread">
              Min Spread: {minSpread.toFixed(1)}%
            </Label>
            <input
              id="spread"
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={minSpread}
              onChange={(e) => setMinSpread(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
