import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlatformBadge } from '@/components/markets/PlatformBadge';

export interface ArbitrageAlertProps {
  roi: number;
  buyYesOn: 'POLYMARKET' | 'KALSHI';
  buyNoOn: 'POLYMARKET' | 'KALSHI';
  explanation: string | null;
}

export function ArbitrageAlert({ roi, buyYesOn, buyNoOn, explanation }: ArbitrageAlertProps) {
  return (
    <div className="rounded-lg border-2 border-[#00ff88]/50 bg-[#00ff88]/5 p-6">
      <div className="flex items-center gap-2 text-[#00ff88]">
        <Zap className="h-5 w-5" />
        <h2 className="text-lg font-semibold">ARBITRAGE OPPORTUNITY DETECTED</h2>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p>
          Buy YES on <PlatformBadge platform={buyYesOn} className="mx-1" />
        </p>
        <p>
          Buy NO on <PlatformBadge platform={buyNoOn} className="mx-1" />
        </p>
      </div>
      {explanation && (
        <p className="mt-3 text-muted-foreground text-xs">{explanation}</p>
      )}
      <p className="mt-4 animate-pulse text-2xl font-bold text-[#00ff88]">
        Potential ROI: +{roi.toFixed(1)}%
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="sm" className="bg-[#00ff88] text-[#0a0a0f] hover:bg-[#00ff88]/90">
          <a
            href={buyYesOn === 'POLYMARKET' ? 'https://polymarket.com' : 'https://kalshi.com'}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on {buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'} ↗
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="border-[#00ff88]/50 text-[#00ff88]">
          <a
            href={buyNoOn === 'POLYMARKET' ? 'https://polymarket.com' : 'https://kalshi.com'}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on {buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi'} ↗
          </a>
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Prices change rapidly. Verify before trading.
      </p>
    </div>
  );
}
