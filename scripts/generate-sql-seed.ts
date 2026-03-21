import fs from 'fs';
import path from 'path';

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
}

function escapeSQLString(str: string | null | undefined): string {
  if (str == null || typeof str !== 'string') return 'NULL';
  const escaped = str.replace(/'/g, "''");
  return `'${escaped}'`;
}

function generateSQLInserts(markets: MarketData[]): string {
  const inserts: string[] = [];

  for (const m of markets) {
    const tagsArray =
      m.tags.length > 0
        ? `ARRAY[${m.tags.map((t) => escapeSQLString(t)).join(', ')}]`
        : 'ARRAY[]::text[]';

    const insert = `INSERT INTO "Market" (
  "id",
  "platform",
  "externalId",
  "question",
  "slug",
  "description",
  "category",
  "tags",
  "makerFee",
  "takerFee",
  "feeStructure",
  "volume24h",
  "volumeTotal",
  "liquidity",
  "active",
  "endDate",
  "imageUrl",
  "url",
  "eventId",
  "eventSlug",
  "eventTitle",
  "createdAt",
  "updatedAt",
  "lastSyncedAt"
) VALUES (
  gen_random_uuid(),
  ${escapeSQLString(m.platform)},
  ${escapeSQLString(m.externalId)},
  ${escapeSQLString(m.question)},
  ${escapeSQLString(m.slug)},
  ${escapeSQLString(m.description)},
  ${escapeSQLString(m.category)},
  ${tagsArray},
  0.02,
  0.02,
  'flat',
  ${m.volume24h},
  ${m.volumeTotal},
  ${m.liquidity},
  ${m.active},
  ${m.endDate ? escapeSQLString(m.endDate) : 'NULL'},
  ${escapeSQLString(m.imageUrl)},
  ${escapeSQLString(m.url)},
  ${escapeSQLString(m.eventId)},
  ${escapeSQLString(m.eventSlug)},
  ${escapeSQLString(m.eventTitle)},
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT ("platform", "externalId") DO UPDATE SET
  "question" = EXCLUDED."question",
  "slug" = EXCLUDED."slug",
  "description" = EXCLUDED."description",
  "category" = EXCLUDED."category",
  "tags" = EXCLUDED."tags",
  "volume24h" = EXCLUDED."volume24h",
  "volumeTotal" = EXCLUDED."volumeTotal",
  "liquidity" = EXCLUDED."liquidity",
  "active" = EXCLUDED."active",
  "endDate" = EXCLUDED."endDate",
  "imageUrl" = EXCLUDED."imageUrl",
  "url" = EXCLUDED."url",
  "eventId" = EXCLUDED."eventId",
  "eventSlug" = EXCLUDED."eventSlug",
  "eventTitle" = EXCLUDED."eventTitle",
  "updatedAt" = NOW(),
  "lastSyncedAt" = NOW();`;

    inserts.push(insert);
  }

  return inserts.join('\n\n');
}

async function generateSQLSeed() {
  console.log('🔄 Generating SQL seed file...\n');

  const jsonPath = path.join(process.cwd(), 'data', 'polymarket-markets.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ JSON file not found. Run fetch-polymarket.ts first.');
    process.exit(1);
  }

  const marketsData = JSON.parse(
    fs.readFileSync(jsonPath, 'utf-8')
  ) as MarketData[];

  console.log(`📊 Loaded ${marketsData.length} markets from JSON`);

  const sql = `-- Polymarket Markets Seed
-- Generated: ${new Date().toISOString()}
-- Total markets: ${marketsData.length}

BEGIN;

${generateSQLInserts(marketsData)}

COMMIT;
`;

  const outputPath = path.join(process.cwd(), 'data', 'seed-polymarket.sql');
  fs.writeFileSync(outputPath, sql);

  const fileSize = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);

  console.log(`\n✅ SQL seed generated!`);
  console.log(`   📄 File: ${outputPath}`);
  console.log(`   📊 Size: ${fileSize} MB`);
  console.log(`   🔢 Statements: ${marketsData.length}`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Get your DATABASE_URL from .env`);
  console.log(`   2. Run: psql "YOUR_DATABASE_URL" -f data/seed-polymarket.sql`);
  console.log(`\n   Or use Supabase SQL Editor to paste and run the file.`);
}

generateSQLSeed().catch(console.error);
