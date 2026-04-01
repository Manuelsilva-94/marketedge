export default function CompareLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="h-4 w-24 animate-pulse rounded bg-white/5" />
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`rounded-lg border ${i === 0 ? 'border-blue-500/30' : 'border-purple-500/30'} bg-white/5 p-6 space-y-4`}
            >
              <div className="flex items-center gap-2">
                <div className={`h-5 w-24 animate-pulse rounded ${i === 0 ? 'bg-blue-500/20' : 'bg-purple-500/20'}`} />
                <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-white/5" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/5" />
              </div>
              <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 animate-pulse rounded-lg bg-white/5" />
                <div className="h-20 animate-pulse rounded-lg bg-white/5" />
              </div>
              <div className="flex gap-3">
                <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
              </div>
              <div className="h-9 w-full animate-pulse rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
