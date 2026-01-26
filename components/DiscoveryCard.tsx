import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { StatBadge } from './StatBadge'
import type { Market } from '@/lib/platforms/types'
import { formatCompactNumber, formatPercentage } from '@/lib/utils/formatting'
import { ExternalLink, Share2, TrendingUp, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import React from 'react'

export interface DiscoveryCardProps {
  market: Market
  variant: 'trending' | 'best-odds' | 'whale' | 'arbitrage' | 'wtf' | 'spread'
  metric?: {
    label: string
    value: string
    icon?: React.ReactNode
  }
  insight?: string
  className?: string
}

const variantStyles = {
  trending: {
    gradient: 'from-red-500/20 to-orange-500/20',
    border: 'border-red-500/30',
    accent: 'text-red-400',
  },
  'best-odds': {
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  whale: {
    gradient: 'from-blue-500/20 to-purple-500/20',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  arbitrage: {
    gradient: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
  },
  wtf: {
    gradient: 'from-pink-500/20 to-purple-500/20',
    border: 'border-pink-500/30',
    accent: 'text-pink-400',
  },
  spread: {
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
  },
}

const platformColors = {
  polymarket: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  kalshi: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
}

export function DiscoveryCard({ market, variant, metric, insight, className }: DiscoveryCardProps) {
  const styles = variantStyles[variant]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: market.title,
        text: `Check out this prediction market: ${market.title}`,
        url: market.url,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(market.url)
    }
  }

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-all duration-300 hover:scale-[1.02]',
        `bg-gradient-to-br ${styles.gradient}`,
        `border-2 ${styles.border}`,
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
              {market.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={platformColors[market.platform]}>
                {market.platform}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {market.category}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Metric */}
        {metric && (
          <div className={cn('flex items-center gap-2 text-lg font-semibold', styles.accent)}>
            {metric.icon}
            <span>{metric.label}:</span>
            <span>{metric.value}</span>
          </div>
        )}

        {/* Market Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatBadge
            label="Volume 24h"
            value={formatCompactNumber(market.volume24h)}
            icon={<DollarSign className="h-3 w-3" />}
          />
          <StatBadge
            label="Traders"
            value={market.activeTraders.toLocaleString()}
            icon={<TrendingUp className="h-3 w-3" />}
          />
          <StatBadge
            label="YES Price"
            value={formatPercentage(market.yesPrice)}
            variant="success"
          />
          <StatBadge
            label="Spread"
            value={formatPercentage(market.spread)}
            variant={market.spread > 5 ? 'warning' : 'default'}
          />
        </div>

        {/* Insight */}
        {insight && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
            💡 {insight}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            className="flex-1"
            asChild
          >
            <a
              href={market.affiliateUrl || market.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Trade Now
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
