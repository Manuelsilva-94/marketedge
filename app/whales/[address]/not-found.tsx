import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WhaleNotFound() {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Whale not found</h1>
      <p className="mt-2 text-center text-muted-foreground">
        This address has no public activity on Polymarket or the address is invalid.
      </p>
      <Button asChild variant="outline" className="mt-6 border-white/20">
        <Link href="/whales">Back to Whale Tracker</Link>
      </Button>
    </div>
  );
}
