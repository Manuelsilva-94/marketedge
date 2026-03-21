import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/50">
      <div className="container px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#00ff88]" />
            <span className="font-semibold text-white">MarketEdge</span>
            <span className="hidden text-muted-foreground sm:inline">— Compare prediction markets, find arbitrage</span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/search" className="hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/arbitrage" className="hover:text-foreground transition-colors">
              Arbitrage
            </Link>
            <Link href="/whales" className="hover:text-foreground transition-colors">
              Whales
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MarketEdge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
