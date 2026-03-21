import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MarketNotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Market not found</h1>
      <p className="mt-2 text-muted-foreground">
        The market you&apos;re looking for doesn&apos;t exist or was removed.
      </p>
      <Button asChild className="mt-8 bg-[#00ff88] text-[#0a0a0f] hover:bg-[#00ff88]/90">
        <Link href="/search">Back to Search</Link>
      </Button>
    </div>
  );
}
