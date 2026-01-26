import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import type { ArbitrageOpportunity } from '@/lib/platforms/types'
import { formatPercentage, formatCompactNumber } from '@/lib/utils/formatting'
import { HIGH_CONFIDENCE_THRESHOLD } from '@/lib/constants'
import { ExternalLink } from 'lucide-react'

interface ArbitrageCardProps {
  opportunity: ArbitrageOpportunity
}

export function ArbitrageCard({ opportunity }: ArbitrageCardProps) {
  const { marketA, marketB, potentialProfit, confidence } = opportunity
  const isHighConfidence = confidence >= HIGH_CONFIDENCE_THRESHOLD

  const platformColors = {
    polymarket: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    kalshi: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  }

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">
            {marketA.title}
          </CardTitle>
          <Badge
            variant={isHighConfidence ? 'default' : 'secondary'}
            className="ml-2 shrink-0"
          >
            {confidence.toFixed(0)}% match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Platform A</div>
            <Badge className={platformColors[marketA.platform]}>
              {marketA.platform}
            </Badge>
            <div className="mt-2 text-sm">
              <div>YES: {formatPercentage(marketA.yesPrice)}</div>
              <div>Volume: {formatCompactNumber(marketA.volume24h)}</div>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Platform B</div>
            <Badge className={platformColors[marketB.platform]}>
              {marketB.platform}
            </Badge>
            <div className="mt-2 text-sm">
              <div>YES: {formatPercentage(marketB.yesPrice)}</div>
              <div>Volume: {formatCompactNumber(marketB.volume24h)}</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Potential Profit</span>
            <span className="text-lg font-bold text-green-400">
              {formatPercentage(potentialProfit)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a
                href={marketA.affiliateUrl || marketA.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on {marketA.platform}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a
                href={marketB.affiliateUrl || marketB.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on {marketB.platform}
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
