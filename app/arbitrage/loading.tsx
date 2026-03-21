import { Card, CardContent } from '@/components/ui/card';
import { ArbitrageLoadingProgress } from '@/components/arbitrage/ArbitrageLoadingProgress';

export default function ArbitrageLoading() {
  return (
    <div className="container px-4 py-8">
      <ArbitrageLoadingProgress />

      <div className="space-y-4">
        <div className="h-10 w-64 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-96 animate-pulse rounded bg-white/10" />
        <div className="flex flex-wrap gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded bg-white/10"
            />
          ))}
        </div>
        <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <div className="h-10 w-[120px] animate-pulse rounded-md bg-white/10" />
        <div className="h-10 w-[130px] animate-pulse rounded-md bg-white/10" />
        <div className="h-10 w-[160px] animate-pulse rounded-md bg-white/10" />
      </div>

      <ul className="mt-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i}>
            <Card className="overflow-hidden border-white/10 bg-white/5">
              <CardContent className="p-5">
                <div className="flex gap-2">
                  <div className="h-5 w-16 animate-pulse rounded bg-white/10" />
                  <div className="h-5 w-20 animate-pulse rounded bg-white/10" />
                </div>
                <div className="mt-3 h-5 w-full max-w-md animate-pulse rounded bg-white/10" />
                <div className="mt-4 flex gap-6">
                  <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="h-6 w-20 animate-pulse rounded bg-white/10" />
                  <div className="h-6 w-16 animate-pulse rounded bg-white/10" />
                  <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
