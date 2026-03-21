import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { SearchBar } from '@/components/markets/SearchBar';
import { auth } from '@/auth';
import { signOut } from '@/auth';

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center gap-6 px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-white hover:opacity-90"
        >
          <TrendingUp className="h-6 w-6 text-[#00ff88]" />
          <span>MarketEdge</span>
        </Link>

        <div className="hidden flex-1 max-w-md md:block">
          <SearchBar size="sm" placeholder="Search markets..." />
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/search"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Markets
          </Link>
          <Link
            href="/arbitrage"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Arbitrage
          </Link>
          <Link
            href="/whales"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Whales
          </Link>
          <Link
            href="/dashboard"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            Dashboard
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
                  {session.user.name
                    ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                    : session.user.email?.[0]?.toUpperCase() ?? '?'}
                </span>
              )}
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground ml-2"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
