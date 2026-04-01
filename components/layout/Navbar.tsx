'use client';

import Link from 'next/link';
import { TrendingUp, Menu, X } from 'lucide-react';
import { SearchBar } from '@/components/markets/SearchBar';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-white hover:opacity-90"
          onClick={() => setMenuOpen(false)}
        >
          <TrendingUp className="h-6 w-6 text-[#00ff88]" />
          <span>MarketEdge</span>
        </Link>

        {/* SearchBar — solo desktop */}
        <div className="hidden flex-1 max-w-md md:block">
          <SearchBar size="sm" placeholder="Search markets..." />
        </div>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          <Link href="/search" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">Markets</Link>
          <Link href="/arbitrage" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">Arbitrage</Link>
          <Link href="/whales" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">Whales</Link>
          <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">Dashboard</Link>
          {session?.user ? (
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
              {session.user.image ? (
                <img src={session.user.image} alt="" className="h-8 w-8 rounded-full" />
              ) : (
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
                  {session.user.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? '?'}
                </span>
              )}
              <button
                onClick={() => signOut()}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground ml-2">
              Sign in
            </Link>
          )}
        </nav>

        {/* Hamburger — solo mobile */}
        <div className="flex items-center gap-2 ml-auto md:hidden">
          {session?.user?.image && (
            <img src={session.user.image} alt="" className="h-7 w-7 rounded-full" />
          )}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — flotante, no empuja el layout */}
      {menuOpen && (
        <div
          className="absolute inset-x-0 top-full z-[60] md:hidden border-y border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl shadow-xl px-4 py-4 space-y-1 max-h-[min(70dvh,calc(100dvh-4rem))] overflow-y-auto"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div className="mb-3">
            <SearchBar size="sm" placeholder="Search markets..." />
          </div>
          {[
            { href: '/search', label: 'Markets' },
            { href: '/arbitrage', label: 'Arbitrage' },
            { href: '/whales', label: 'Whales' },
            { href: '/dashboard', label: 'Dashboard' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            {session?.user ? (
              <button
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="block w-full text-left rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
