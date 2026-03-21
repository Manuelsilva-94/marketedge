import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    console.log('🧪 Testing comparison endpoint...\n');

    const market = await prisma.market.findFirst({
      where: {
        platform: 'POLYMARKET',
        volume24h: { gt: 1000 }
      },
      orderBy: { volume24h: 'desc' }
    });

    if (!market) {
      throw new Error(
        'No suitable market found for testing (need Polymarket market with volume24h > 1000)'
      );
    }

    console.log(`Testing with market: "${market.question}"`);
    console.log(`Market ID: ${market.id}`);

    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/compare/${market.id}`);

    if (!response.ok) {
      throw new Error(`Comparison failed: ${response.status}`);
    }

    const result = await response.json();

    console.log('\n✅ Comparison successful');
    console.log(`   Matches found: ${result.matches.length}`);
    console.log(
      `   Best YES: ${result.bestDeal.yes.platform} at $${result.bestDeal.yes.effectivePrice.toFixed(3)}`
    );
    console.log(
      `   Best NO: ${result.bestDeal.no.platform} at $${result.bestDeal.no.effectivePrice.toFixed(3)}`
    );

    if (result.arbitrage) {
      console.log(
        `   🎯 ARBITRAGE DETECTED: ${result.arbitrage.roi.toFixed(2)}% ROI`
      );
    }

    return NextResponse.json({
      success: true,
      testedMarket: {
        id: market.id,
        question: market.question,
        platform: market.platform
      },
      comparisonResult: result
    });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
