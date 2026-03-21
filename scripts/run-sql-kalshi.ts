import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { prisma } from '../lib/prisma';
import { Platform } from '@/lib/db-types';

interface MarketData {
  platform: string;
  externalId: string;
  question: string;
  slug: string;
  description: string | null;
  category: string | null;
  tags: string[];
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  active: boolean;
  endDate: string | null;
  imageUrl: string | null;
  url: string | null;
  eventId: string | null;
  eventSlug: string | null;
  eventTitle: string | null;
  seriesId?: string | null;
}

async function runSQLKalshi() {
  console.log('🔄 Running KALSHI seed from JSON...\n');

  const jsonPath = path.join(process.cwd(), 'data', 'kalshi-markets.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ JSON file not found. Run fetch-kalshi.ts first.');
    process.exit(1);
  }

  const marketsData = JSON.parse(
    fs.readFileSync(jsonPath, 'utf-8')
  ) as MarketData[];

  console.log(`📊 Loaded ${marketsData.length} KALSHI markets from JSON`);

  const startTime = Date.now();
  let synced = 0;
  let errors = 0;
  const BATCH_SIZE = 50;

  for (let i = 0; i < marketsData.length; i += BATCH_SIZE) {
    const batch = marketsData.slice(i, i + BATCH_SIZE);

    try {
      const operations = batch.map((m) => {
        const createData = {
          platform: Platform.KALSHI,
          externalId: m.externalId,
          question: m.question,
          slug: m.slug,
          description: m.description,
          category: m.category,
          tags: m.tags,
          makerFee: 0.07,
          takerFee: 0.07,
          feeStructure: 'payout_based',
          volume24h: m.volume24h,
          volumeTotal: m.volumeTotal,
          liquidity: m.liquidity,
          active: m.active,
          endDate: m.endDate ? new Date(m.endDate) : null,
          imageUrl: m.imageUrl,
          url: m.url,
          eventId: m.eventId,
          eventSlug: m.eventSlug,
          eventTitle: m.eventTitle,
          seriesId: m.seriesId ?? null
        };

        return prisma.market.upsert({
          where: {
            platform_externalId: {
              platform: Platform.KALSHI,
              externalId: m.externalId
            }
          },
          update: {
            question: createData.question,
            slug: createData.slug,
            description: createData.description,
            category: createData.category,
            tags: createData.tags,
            volume24h: createData.volume24h,
            volumeTotal: createData.volumeTotal,
            liquidity: createData.liquidity,
            active: createData.active,
            endDate: createData.endDate,
            url: createData.url,
            eventId: createData.eventId,
            eventSlug: createData.eventSlug,
            eventTitle: createData.eventTitle,
            seriesId: createData.seriesId,
            lastSyncedAt: new Date(),
            updatedAt: new Date()
          },
          create: createData
        });
      });

      await prisma.$transaction(operations);
      synced += batch.length;

      if (synced % 500 === 0 || i + BATCH_SIZE >= marketsData.length) {
        console.log(`  ⏳ Saved ${synced}/${marketsData.length} KALSHI markets...`);
      }
    } catch (error) {
      errors += batch.length;
      console.error(
        `  ❌ Batch error at ${i}:`,
        error instanceof Error ? error.message : error
      );

      for (const m of batch) {
        try {
          const createData = {
            platform: Platform.KALSHI,
            externalId: m.externalId,
            question: m.question,
            slug: m.slug,
            description: m.description,
            category: m.category,
            tags: m.tags,
            makerFee: 0.07,
            takerFee: 0.07,
            feeStructure: 'payout_based',
            volume24h: m.volume24h,
            volumeTotal: m.volumeTotal,
            liquidity: m.liquidity,
            active: m.active,
            endDate: m.endDate ? new Date(m.endDate) : null,
            imageUrl: m.imageUrl,
            url: m.url,
            eventId: m.eventId,
            eventSlug: m.eventSlug,
            eventTitle: m.eventTitle,
            seriesId: m.seriesId ?? null
          };

          await prisma.market.upsert({
            where: {
              platform_externalId: {
                platform: Platform.KALSHI,
                externalId: m.externalId
              }
            },
            update: {
              question: createData.question,
              slug: createData.slug,
              description: createData.description,
              category: createData.category,
              tags: createData.tags,
              volume24h: createData.volume24h,
              volumeTotal: createData.volumeTotal,
              liquidity: createData.liquidity,
              active: createData.active,
              endDate: createData.endDate,
              url: createData.url,
              eventId: createData.eventId,
              eventSlug: createData.eventSlug,
              eventTitle: createData.eventTitle,
              seriesId: createData.seriesId,
              lastSyncedAt: new Date(),
              updatedAt: new Date()
            },
            create: createData
          });
          synced++;
          errors--;
        } catch (singleError) {
          console.error(`    ❌ Individual error: ${m.externalId}`);
        }
      }
    }
  }

  const duration = Math.round((Date.now() - startTime) / 1000);

  await prisma.syncLog.create({
    data: {
      platform: Platform.KALSHI,
      lastSyncedAt: new Date(),
      marketsCount: synced,
      duration,
      errors
    }
  });

  console.log(`\n✅ KALSHI seed complete!`);
  console.log(`   - Synced: ${synced}`);
  console.log(`   - Errors: ${errors}`);
  console.log(`   - Duration: ${duration}s`);
}

runSQLKalshi()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
