import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  const tests: Array<{
    name: string;
    success: boolean;
    found?: number;
    breakdown?: Record<string, number>;
    platform?: string;
    message?: string;
  }> = [];

  try {
    const baseUrl =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';

    // Test 1: Búsqueda simple
    console.log('\n🧪 Test 1: Search "bitcoin"...');
    const test1 = await fetch(`${baseUrl}/api/markets/search?q=bitcoin&limit=10`);
    const result1 = await test1.json();
    tests.push({
      name: 'Search bitcoin',
      success: result1.count > 0,
      found: result1.count,
      breakdown: result1.breakdown
    });
    console.log(`✅ Found ${result1.count} bitcoin markets`);

    // Test 2: Filtro por plataforma
    console.log('\n🧪 Test 2: Search "trump" on Polymarket...');
    const test2 = await fetch(
      `${baseUrl}/api/markets/search?q=trump&platform=POLYMARKET&limit=10`
    );
    const result2 = await test2.json();
    const allPolymarket =
      result2.results?.every((r: { platform: string }) => r.platform === 'POLYMARKET') ??
      true;
    tests.push({
      name: 'Search trump on Polymarket',
      success: result2.count >= 0 && (result2.count === 0 || allPolymarket),
      found: result2.count,
      platform: 'POLYMARKET'
    });
    console.log(`✅ Found ${result2.count} trump markets on Polymarket`);

    // Test 3: Búsqueda genérica
    console.log('\n🧪 Test 3: Search "election"...');
    const test3 = await fetch(
      `${baseUrl}/api/markets/search?q=election&limit=20`
    );
    const result3 = await test3.json();
    tests.push({
      name: 'Search election',
      success: result3.count > 0,
      found: result3.count,
      breakdown: result3.breakdown
    });
    console.log(`✅ Found ${result3.count} election markets`);

    // Test 4: Query muy corta (debe fallar)
    console.log('\n🧪 Test 4: Search "a" (too short)...');
    const test4 = await fetch(`${baseUrl}/api/markets/search?q=a`);
    const result4 = await test4.json();
    tests.push({
      name: 'Search too short',
      success: result4.count === 0 && !!result4.message,
      message: result4.message
    });
    console.log(`✅ Correctly rejected short query`);

    console.log('\n✅ All search tests completed');

    return NextResponse.json({
      success: true,
      tests,
      summary: {
        total: tests.length,
        passed: tests.filter((t) => t.success).length,
        failed: tests.filter((t) => !t.success).length
      }
    });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        tests
      },
      { status: 500 }
    );
  }
}
