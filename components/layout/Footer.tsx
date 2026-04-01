import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { BMC_DONATION_URL, PAYPAL_DONATION_URL } from '@/lib/donation-links';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#00ff88]" />
            <span className="font-semibold text-white">MarketEdge</span>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Compare prediction markets, find arbitrage
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <a
              href={BMC_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
            >
               Buy me a coffee
            </a>
            <a
              href={PAYPAL_DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
            >
              PayPal
            </a>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
            <p>© {new Date().getFullYear()} MarketEdge by Manuel Silva Montes de Oca. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
