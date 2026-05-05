import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { KalshiService } from '@/lib/services/kalshi.service';
import { searchPolymarketCandidates } from '@/lib/polymarket-search';
import type { MarketWhereInput, Platform } from '@/lib/db-types';

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
      tags: true,
      externalId: true,
      slug: true
    };

    // Search DB first
    const [dbMarkets, total] = await Promise.all([
      prisma.market.findMany({
        where: where as MarketWhereInput,
        orderBy,
        take: limit,
        skip: offset,
        select
      }),
      prisma.market.count({ where: where as MarketWhereInput })
    ]);

    // If we have enough results from DB, return them
    if (dbMarkets.length >= limit || offset > 0) {
      return NextResponse.json({
        markets: dbMarkets,
        total,
        offset,
        limit,
        query: query.trim(),
        source: 'database',
        filters: {
          platform: platform || 'all',
          category: category || 'all'
        }
      });
    }

    // Supplement with live API results
    let liveMarkets: Array<{
      id: string;
      platform: Platform;
      question: string;
      category: string | null;
      volume24h: number;
      liquidity: number;
      active: boolean;
      endDate: string | null;
      url: string | null;
      eventTitle: string | null;
      tags: string[];
      externalId: string;
      slug: string | null;
    }> = [];

    // Fetch from Polymarket if not filtering for Kalshi
    if (platform !== 'KALSHI') {
      try {
        const polyResults = await searchPolymarketCandidates(query.trim(), 20);
        const seen = new Set(dbMarkets.map(m => m.externalId));
        liveMarkets = [
          ...liveMarkets,
          ...polyResults
            .filter(m => !seen.has(m.externalId))
            .map(m => ({
              id: `live_poly_${m.externalId}`,
              platform: 'POLYMARKET' as Platform,
              question: m.question,
              category: null,
              volume24h: m.volume24h,
              liquidity: 0,
              active: true,
              endDate: m.endDate?.toISOString() ?? null,
              url: `https://polymarket.com/event/${m.slug}`,
              eventTitle: null,
              tags: [],
              externalId: m.externalId,
              slug: m.slug
            }))
        ];
      } catch (error) {
        console.error('[Search] Polymarket API error:', error);
      }
    }

    // Fetch from Kalshi if not filtering for Polymarket
    if (platform !== 'POLYMARKET') {
      try {
        const kalshiService = new KalshiService();
        const kalshiResults = await kalshiService.getMarkets({
          status: 'open',
          limit: 20
        });
        
        const seen = new Set(dbMarkets.map(m => m.externalId));
        const kalshiFiltered = (kalshiResults.markets || [])
          .filter(m => {
            const normalized = kalshiService.normalizeMarket(m);
            if (seen.has(normalized.externalId)) return false;
            // Basic text match
            return normalized.question.toLowerCase().includes(query.trim().toLowerCase());
          })
          .slice(0, 10);

        liveMarkets = [
          ...liveMarkets,
          ...kalshiFiltered.map(m => {
            const normalized = kalshiService.normalizeMarket(m);
            return {
              id: `live_kalshi_${normalized.externalId}`,
              platform: 'KALSHI' as Platform,
              question: normalized.question,
              category: normalized.category ?? null,
              volume24h: normalized.volume24h ?? 0,
              liquidity: 0,
              active: true,
              endDate: normalized.endDate?.toISOString() ?? null,
              url: normalized.url ?? null,
              eventTitle: null,
              tags: [],
              externalId: normalized.externalId,
              slug: normalized.slug
            };
          })
        ];
      } catch (error) {
        console.error('[Search] Kalshi API error:', error);
      }
    }

    // Sort live results by volume
    liveMarkets.sort((a, b) => b.volume24h - a.volume24h);

    // Combine and limit
    const combined = [...dbMarkets, ...liveMarkets.slice(0, limit - dbMarkets.length)];

    return NextResponse.json({
      markets: combined,
      total: total + liveMarkets.length,
      offset,
      limit,
      query: query.trim(),
      source: liveMarkets.length > 0 ? 'hybrid' : 'database',
      dbResults: dbMarkets.length,
      liveResults: Math.min(liveMarkets.length, limit - dbMarkets.length),
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
