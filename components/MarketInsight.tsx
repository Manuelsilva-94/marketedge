import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import { Button } from './ui/button'
import { Info } from 'lucide-react'

interface MarketInsightProps {
  title: string
  content: string
  similarMarkets?: string[]
  sentiment?: {
    bullish: number
    bearish: number
  }
  children?: React.ReactNode
}

export function MarketInsight({ title, content, similarMarkets, sentiment, children }: MarketInsightProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Info className="h-3 w-3" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>

          {similarMarkets && similarMarkets.length > 0 && (
            <div>
              <h5 className="text-xs font-medium mb-1">Similar markets:</h5>
              <ul className="text-xs text-muted-foreground space-y-1">
                {similarMarkets.map((market, i) => (
                  <li key={i}>• {market}</li>
                ))}
              </ul>
            </div>
          )}

          {sentiment && (
            <div>
              <h5 className="text-xs font-medium mb-1">Community sentiment:</h5>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${sentiment.bullish}%` }}
                  />
                </div>
                <span className="text-muted-foreground">
                  {sentiment.bullish}% bullish
                </span>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
