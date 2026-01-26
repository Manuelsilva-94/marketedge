'use client'

import React, { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { AdPlaceholder } from './AdPlaceholder'
import type { Market } from '@/lib/platforms/types'
import { formatPercentage, formatCompactNumber, formatDate } from '@/lib/utils/formatting'
import { ExternalLink } from 'lucide-react'

interface MarketTableProps {
  markets: Market[]
  isLoading?: boolean
}

type SortField = 'title' | 'platform' | 'volume24h' | 'spread' | 'activeTraders'
type SortDirection = 'asc' | 'desc'

export function MarketTable({ markets, isLoading }: MarketTableProps) {
  const [sortField, setSortField] = useState<SortField>('volume24h')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const sortedMarkets = useMemo(() => {
    const sorted = [...markets].sort((a, b) => {
      let aValue: number | string
      let bValue: number | string

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case 'platform':
          aValue = a.platform
          bValue = b.platform
          break
        case 'volume24h':
          aValue = a.volume24h
          bValue = b.volume24h
          break
        case 'spread':
          aValue = a.spread
          bValue = b.spread
          break
        case 'activeTraders':
          aValue = a.activeTraders
          bValue = b.activeTraders
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortDirection === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })

    return sorted
  }, [markets, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const platformColors = {
    polymarket: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    kalshi: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  }

  const getSpreadColor = (spread: number) => {
    if (spread > 5) return 'text-green-400'
    if (spread > 3) return 'text-yellow-400'
    return 'text-muted-foreground'
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (sortedMarkets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No markets found. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleSort('title')}
            >
              Title
              {sortField === 'title' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleSort('platform')}
            >
              Platform
              {sortField === 'platform' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleSort('volume24h')}
            >
              Volume 24h
              {sortField === 'volume24h' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleSort('spread')}
            >
              Spread
              {sortField === 'spread' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:text-foreground"
              onClick={() => handleSort('activeTraders')}
            >
              Traders
              {sortField === 'activeTraders' && (
                <span className="ml-2">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMarkets.map((market, index) => (
            <React.Fragment key={market.id}>
              <TableRow className="hover:bg-muted/50">
                <TableCell>
                  <div className="max-w-md">
                    <div className="font-medium line-clamp-1">
                      {market.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {market.category}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={platformColors[market.platform]}>
                    {market.platform}
                  </Badge>
                </TableCell>
                <TableCell>{formatCompactNumber(market.volume24h)}</TableCell>
                <TableCell>
                  <span className={getSpreadColor(market.spread)}>
                    {formatPercentage(market.spread)}
                  </span>
                </TableCell>
                <TableCell>{market.activeTraders}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a
                      href={market.affiliateUrl || market.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Trade
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
              {/* Show ad every 10 rows */}
              {(index + 1) % 10 === 0 && index < sortedMarkets.length - 1 && (
                <TableRow key={`ad-${market.id}-${index}`}>
                  <TableCell colSpan={6} className="p-4">
                    <AdPlaceholder width={728} height={90} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
