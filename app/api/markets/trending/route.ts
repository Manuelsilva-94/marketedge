import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get('limit') || '6';
    const limit = parseInt(limitParam, 10) || 6;

    const markets = await prisma.market.findMany({
      where: { active: true, volume24h: { gt: 0 } },
      orderBy: { volume24h: 'desc' },
      take: limit,
      select: {
        id: true,
        platform: true,
        question: true,
        category: true,
        volume24h: true,
        url: true
      }
    });

    return NextResponse.json({ markets });
  } catch {
    return NextResponse.json({ markets: [] });
  }
}
