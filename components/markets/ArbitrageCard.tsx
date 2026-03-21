import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ArbitrageCardProps {
  question: string;
  polymarketYesPrice: number;
  kalshiYesPrice: number;
  roi: number;
  volume24h: number;
  category: string;
}

function formatVolume(volume: number): string {
  if (volume >= 1_000_000) return `$${(volume / 1_000_000).toFixed(1)}M`;
  if (volume >= 1_000) return `$${(volume / 1_000).toFixed(0)}K`;
  return `$${Math.round(volume)}`;
}

export function ArbitrageCard({
  question,
  polymarketYesPrice,
  kalshiYesPrice,
  roi,
  volume24h,
  category
}: ArbitrageCardProps) {
  return (
    <Card className="group border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/[0.07]">
      <CardContent className="p-5">
        <div className="space-y-4">
          <p className="line-clamp-2 font-medium leading-tight">{question}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/20 text-muted-foreground">
              {category}
            </Badge>
            <Badge className="border-0 bg-[#00ff88]/20 text-[#00ff88]">
              +{(roi * 100).toFixed(1)}% ROI
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Polymarket <span className="font-mono font-semibold text-green-400">{(polymarketYesPrice * 100).toFixed(0)}%</span>
            </span>
            <span className="text-muted-foreground">vs</span>
            <span className="text-muted-foreground">
              Kalshi <span className="font-mono font-semibold text-amber-400">{(kalshiYesPrice * 100).toFixed(0)}%</span>
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">Vol: {formatVolume(volume24h)}</span>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-[#00ff88] hover:bg-[#00ff88]/10 hover:text-[#00ff88]">
              <Link href="/arbitrage">
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
