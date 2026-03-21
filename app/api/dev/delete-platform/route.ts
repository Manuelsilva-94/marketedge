import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Platform } from '@/lib/db-types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const { platform } = await request.json();

    if (!platform || !['POLYMARKET', 'KALSHI'].includes(platform)) {
      return NextResponse.json(
        {
          error: 'Invalid platform. Must be POLYMARKET or KALSHI'
        },
        { status: 400 }
      );
    }

    console.log(`🗑️  Deleting all ${platform} markets...`);

    const result = await prisma.market.deleteMany({
      where: { platform: platform as Platform }
    });

    console.log(`✅ Deleted ${result.count} markets`);

    return NextResponse.json({
      success: true,
      deleted: result.count,
      platform
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
