import { Card, CardContent } from '@/components/ui/card';

export default function WhalesLoading() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <div className="h-9 w-64 animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-5 w-96 animate-pulse rounded bg-white/10" />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="h-10 w-[140px] animate-pulse rounded-md bg-white/10" />
        <div className="h-10 w-[180px] animate-pulse rounded-md bg-white/10" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-white/10 bg-white/5">
            <CardContent className="p-5">
              <div className="flex justify-between">
                <div className="h-6 w-10 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
              </div>
              <div className="mt-3 h-5 w-24 animate-pulse rounded bg-white/10" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
              </div>
              <div className="mt-4 h-2 w-full animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-4 w-24 animate-pulse rounded bg-white/10" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
