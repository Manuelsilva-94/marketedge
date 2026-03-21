import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MatcherService } from '@/lib/services/matcher.service';
import { NormalizerService } from '@/lib/services/normalizer.service';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    console.log('🧪 Testing matching algorithm...\n');

    const normalizer = new NormalizerService();
    const matcher = new MatcherService();

    // Test 1: Normalización de texto
    console.log('📝 Test 1: Text normalization...');
    const testCases = [
      'Will Bitcoin reach $100,000 by March 31, 2026?',
      'Bitcoin above $100K on March 31, 2026',
      'Will BTC hit $100k before end of March 2026?'
    ];

    const normalized = testCases.map((q) => {
      const result = normalizer.normalize(q);
      console.log(`   "${q}"`);
      console.log(`   → "${result.normalized}"`);
      console.log(`   → Keywords: [${result.keywords.join(', ')}]\n`);
      return result;
    });

    // Test 2: Buscar un market de Polymarket
    console.log('\n🔍 Test 2: Finding matches for a Polymarket market...');
    const polyMarket = await prisma.market.findFirst({
      where: {
        platform: 'POLYMARKET',
        question: {
          contains: 'election',
          mode: 'insensitive'
        }
      }
    });

    if (!polyMarket) {
      throw new Error(
        'No Polymarket election market found. Run sync first (Polymarket, Kalshi).'
      );
    }

    console.log(`\nSource market: "${polyMarket.question}"`);
    console.log(`Platform: ${polyMarket.platform}`);

    const matches = await matcher.findMatches(polyMarket, 0.6);

    console.log(`\n✅ Found ${matches.length} potential matches\n`);

    const top5 = matches.slice(0, 5);
    top5.forEach((m, i) => {
      console.log(`${i + 1}. [${m.matchType}] Score: ${(m.score * 100).toFixed(1)}%`);
      console.log(`   ${m.market.platform}: "${m.market.question}"`);
      console.log(`   Flags: ${m.flags.join(', ') || 'none'}\n`);
    });

    return NextResponse.json({
      success: true,
      normalizationTest: {
        inputs: testCases,
        outputs: normalized
      },
      matchingTest: {
        sourceMarket: {
          platform: polyMarket.platform,
          question: polyMarket.question
        },
        matchesFound: matches.length,
        topMatches: top5.map((m) => ({
          platform: m.market.platform,
          question: m.market.question,
          score: m.score,
          matchType: m.matchType,
          flags: m.flags
        }))
      }
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
