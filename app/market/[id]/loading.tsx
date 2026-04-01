import { Card, CardContent } from '@/components/ui/card';

export default function MarketLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-4 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-4 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-48 animate-pulse rounded bg-white/5" />
      </div>

      <div className="mx-auto max-w-4xl space-y-10">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="h-6 w-8 animate-pulse rounded-full bg-white/5" />
            <div className="h-6 w-20 animate-pulse rounded bg-white/5" />
          </div>
          <div className="h-9 w-28 animate-pulse rounded bg-white/5" />
        </div>
        <div className="h-10 w-3/4 animate-pulse rounded bg-white/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardContent className="p-4">
                <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
                <div className="mt-2 h-8 w-20 animate-pulse rounded bg-white/5" />
                <div className="mt-2 h-2 w-full animate-pulse rounded-full bg-white/5" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <div className="mb-4 h-6 w-48 animate-pulse rounded bg-white/5" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="h-6 w-8 animate-pulse rounded-full bg-white/5" />
                <div className="h-4 flex-1 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-12 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-12 animate-pulse rounded bg-white/5" />
                <div className="h-4 w-14 animate-pulse rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 h-6 w-32 animate-pulse rounded bg-white/5" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
