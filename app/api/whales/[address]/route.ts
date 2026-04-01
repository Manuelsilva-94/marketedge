import { NextResponse } from 'next/server';
import {
  buildWhaleProfileResponse,
  type WhaleProfileApiResponse
} from '@/lib/whales/whale-profile-response';

export const dynamic = 'force-dynamic';
export const preferredRegion = 'iad1';

export type { WhaleProfileApiResponse };

export async function GET(
  _request: Request,
  context: { params: Promise<{ address: string }> }
) {
  const { address } = await context.params;
  const normalized = address?.trim().toLowerCase();

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(normalized ?? '');
  if (!normalized || !isValidAddress) {
    return NextResponse.json(
      {
        error: 'Invalid wallet address format',
        address: '',
        displayName: '',
        stats: {} as WhaleProfileApiResponse['stats'],
        recentTrades: [],
        topPositions: []
      },
      { status: 404 }
    );
  }

  const response = await buildWhaleProfileResponse(normalized);

  if (response.error) {
    return NextResponse.json(response, { status: 200 });
  }

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120'
    }
  });
}
