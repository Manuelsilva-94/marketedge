import { SearchBar } from '@/components/markets/SearchBar';
import { Card, CardContent } from '@/components/ui/card';

export default function HomeLoading() {
  return (
    <div className="bg-[#0a0a0f]">
      {/* Section 1: Hero */}
      <section className="border-b border-white/10 px-4 pt-24 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mx-auto h-12 w-3/4 animate-pulse rounded bg-white/5" />
          <div className="mx-auto mt-4 h-6 w-1/2 animate-pulse rounded bg-white/5" />
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar size="lg" placeholder="Search markets..." />
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
            <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </section>

      {/* Section 2: Arbitrage skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-8 w-64 animate-pulse rounded bg-white/5" />
            <div className="h-5 w-40 animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="space-y-4 p-5">
                  <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 animate-pulse rounded bg-white/5" />
                    <div className="h-6 w-20 animate-pulse rounded bg-white/5" />
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
                  </div>
                  <div className="flex justify-between pt-2">
                    <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
                    <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Stats skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="flex flex-col gap-2 p-6">
                  <div className="h-10 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Whales skeleton */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-8 w-56 animate-pulse rounded bg-white/5" />
            <div className="h-5 w-36 animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5">
                <CardContent className="space-y-4 p-5">
                  <div className="flex justify-between">
                    <div className="h-6 w-6 animate-pulse rounded-full bg-white/5" />
                    <div className="h-5 w-28 animate-pulse rounded bg-white/5" />
                  </div>
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                  <div className="h-7 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-2 w-full animate-pulse rounded-full bg-white/5" />
                  <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: How it works skeleton */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <div className="h-8 w-40 animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-white/10 bg-white/5 text-center">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-white/5" />
                  <div className="mx-auto mb-2 h-5 w-28 animate-pulse rounded bg-white/5" />
                  <div className="mx-auto h-4 w-40 animate-pulse rounded bg-white/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
