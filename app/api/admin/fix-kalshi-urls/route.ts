import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildKalshiUrl } from '@/lib/utils/kalshi-url';
import { requireAdminApiAuth } from '@/lib/cron-auth';

export async function GET(request: Request) {
  const authError = requireAdminApiAuth(request);
  if (authError) return authError;

  const markets = await prisma.market.findMany({
    where: { platform: 'KALSHI' },
    select: { id: true, externalId: true, seriesId: true, eventId: true }
  });

  let updated = 0;
  for (const market of markets) {
    const url = buildKalshiUrl(market);
    await prisma.market.update({
      where: { id: market.id },
      data: { url }
    });
    updated++;
  }

  return NextResponse.json({ updated });
}
