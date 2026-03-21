import { NextResponse } from 'next/server';
import { PolymarketService } from '@/lib/services/polymarket.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 600; // 10 minutos

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const service = new PolymarketService();

    console.log('🧪 Testing Polymarket FULL AUTO sync (2 parts)...');

    // Parte 1
    console.log('\n📦 PART 1: Syncing first 25K...');
    const synced1 = await service.syncFullToDB(25000, 0);
    console.log(`✅ Part 1 complete: ${synced1} markets`);

    // Pequeño delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Parte 2
    console.log('\n📦 PART 2: Syncing next 25K...');
    const synced2 = await service.syncFullToDB(25000, 2500);
    console.log(`✅ Part 2 complete: ${synced2} markets`);

    const total = synced1 + synced2;

    return NextResponse.json({
      success: true,
      part1: synced1,
      part2: synced2,
      total,
      message: `Full sync completed: ${total} markets`
    });
  } catch (error) {
    console.error('❌ Full auto sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
