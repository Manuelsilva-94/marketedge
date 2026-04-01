import { Card, CardContent } from '@/components/ui/card';

export default function WhaleDetailLoading() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="space-y-4">
        <div className="h-9 w-48 animate-pulse rounded bg-white/10" />
        <div className="flex gap-2">
          <div className="h-9 w-28 animate-pulse rounded-md bg-white/10" />
          <div className="h-9 w-40 animate-pulse rounded-md bg-white/10" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-white/10" />
        ))}
      </div>
      <div className="mt-10">
        <div className="mb-4 h-6 w-40 animate-pulse rounded bg-white/10" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded bg-white/10" />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-white/10 bg-white/5">
              <CardContent className="p-4">
                <div className="h-5 w-full animate-pulse rounded bg-white/10" />
                <div className="mt-3 h-4 w-16 animate-pulse rounded bg-white/10" />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
