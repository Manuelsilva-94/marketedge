import { Card, CardContent } from '@/components/ui/card';

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-10 w-full max-w-xl animate-pulse rounded bg-white/5" />
        <div className="flex gap-4">
          <div className="h-10 w-[180px] animate-pulse rounded bg-white/5" />
          <div className="h-10 w-[160px] animate-pulse rounded bg-white/5" />
        </div>
        <div className="h-5 w-64 animate-pulse rounded bg-white/5" />
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardContent className="space-y-3 p-5">
                <div className="flex gap-2">
                  <div className="h-5 w-8 animate-pulse rounded-full bg-white/5" />
                  <div className="h-5 w-16 animate-pulse rounded bg-white/5" />
                </div>
                <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="flex gap-4 pt-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/5" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
                </div>
              </CardContent>
              <div className="flex gap-2 border-t border-white/10 px-5 pb-5">
                <div className="h-8 w-20 animate-pulse rounded bg-white/5" />
                <div className="h-8 w-16 animate-pulse rounded bg-white/5" />
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center gap-4 pt-8">
          <div className="h-9 w-20 animate-pulse rounded bg-white/5" />
          <div className="h-5 w-24 animate-pulse rounded bg-white/5" />
          <div className="h-9 w-16 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
