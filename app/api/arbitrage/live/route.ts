import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'iad1';

const baseUrl =
  typeof process.env.VERCEL_URL === 'string'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000';

export async function GET(req: NextRequest) {
  const generatedAt = new Date().toISOString();

  try {
    const limitParam = req.nextUrl.searchParams.get('limit') || '10';
    const limit = Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 20);
    const response = await fetch(
      `${baseUrl}/api/arbitrage/opportunities?limit=${limit}&minRoi=0.005`,
      { cache: 'no-store' }
    );
    const payload = response.ok
      ? await response.json()
      : { opportunities: [], count: 0, generatedAt };

    return NextResponse.json(
      payload,
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=60'
        }
      }
    );
  } catch (error) {
    console.error('❌ Arbitrage live error:', error);
    return NextResponse.json(
      { opportunities: [], count: 0, generatedAt },
      { status: 200 }
    );
  }
}
