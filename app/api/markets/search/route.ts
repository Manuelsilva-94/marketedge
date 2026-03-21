import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Platform } from '@/lib/db-types';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

type SortOption = 'volume' | 'recent' | 'liquidity';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const platform = searchParams.get('platform') as Platform | null;
    const category = searchParams.get('category');
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const sortParam = searchParams.get('sort') || 'volume';
    const sort: SortOption =
      sortParam === 'recent' || sortParam === 'liquidity' ? sortParam : 'volume';

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        markets: [],
        total: 0,
        offset: 0,
        limit,
        message: 'Query must be at least 2 characters'
      });
    }

    const terms = query.trim().split(/\s+/).filter(t => t.length >= 2);
    const searchTerms = terms.length > 0 ? terms : [query.trim()];

    const questionConditions = searchTerms.map(term => ({
      question: { contains: term, mode: 'insensitive' as const }
    }));

    const baseWhere = {
      active: true,
      AND: questionConditions,
      ...(platform && ['POLYMARKET', 'KALSHI'].includes(platform) ? { platform: platform as Platform } : {}),
      ...(category ? { category: { contains: category, mode: 'insensitive' as const } } : {})
    };

    const where = baseWhere;

    const orderBy =
      sort === 'recent'
        ? [{ updatedAt: 'desc' as const }, { volume24h: 'desc' as const }]
        : sort === 'liquidity'
          ? [{ liquidity: 'desc' as const }, { volume24h: 'desc' as const }]
          : [{ volume24h: 'desc' as const }, { liquidity: 'desc' as const }];

    const select = {
      id: true,
      platform: true,
      question: true,
      category: true,
      volume24h: true,
      liquidity: true,
      active: true,
      endDate: true,
      url: true,
      eventTitle: true,
      tags: true
    };

    const [markets, total] = await Promise.all([
      prisma.market.findMany({
        where: where as Prisma.MarketWhereInput,
        orderBy,
        take: limit,
        skip: offset,
        select
      }),
      prisma.market.count({ where: where as Prisma.MarketWhereInput })
    ]);

    return NextResponse.json({
      markets,
      total,
      offset,
      limit,
      query: query.trim(),
      filters: {
        platform: platform || 'all',
        category: category || 'all'
      }
    });
  } catch (error) {
    console.error('❌ Search error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Search failed',
        markets: [],
        total: 0,
        offset: 0,
        limit: 20
      },
      { status: 500 }
    );
  }
}
