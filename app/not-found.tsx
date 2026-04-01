import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex items-center gap-2 text-[#00ff88]">
        <TrendingUp className="h-8 w-8" />
        <span className="text-2xl font-bold text-white">MarketEdge</span>
      </div>

      <p className="text-8xl font-bold text-white/10 select-none">404</p>

      <h1 className="mt-2 text-2xl font-semibold text-white">
        This market doesn&apos;t exist
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for isn&apos;t here. Maybe the market resolved,
        or the link is wrong.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-[#00ff88] text-black hover:bg-[#00ff88]/90">
          <Link href="/">Go Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20">
          <Link href="/arbitrage">View Arbitrage</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20">
          <Link href="/search">Search Markets</Link>
        </Button>
      </div>
    </div>
  );
}