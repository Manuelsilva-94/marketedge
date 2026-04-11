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

/** Inserts per file (each file is one BEGIN … COMMIT transaction). */
const INSERTS_PER_PART = Number(process.env.POLY_SQL_PART_SIZE ?? '1000');

function escapeSQLString(str: string | null | undefined): string {
  if (str == null || typeof str !== 'string') return 'NULL';
  const escaped = str.replace(/'/g, "''");
  return `'${escaped}'`;
}

function buildInsertStatement(m: MarketData): string {
  const tagsArray =
    m.tags.length > 0
      ? `ARRAY[${m.tags.map((t) => escapeSQLString(t)).join(', ')}]`
      : 'ARRAY[]::text[]';

  return `INSERT INTO "Market" (
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
}

async function generateSQLSeed() {
  console.log('🔄 Generating Polymarket SQL seed parts...\n');

  const dataDir = path.join(process.cwd(), 'data');
  const jsonPath = path.join(dataDir, 'polymarket-markets.json');

  if (!fs.existsSync(jsonPath)) {
    console.error('❌ JSON file not found. Run fetch-polymarket.ts first.');
    process.exit(1);
  }

  const marketsData = JSON.parse(
    fs.readFileSync(jsonPath, 'utf-8')
  ) as MarketData[];

  console.log(`📊 Loaded ${marketsData.length} markets from JSON`);
  if (marketsData.length === 0) {
    console.error('❌ No markets in polymarket-markets.json');
    process.exit(1);
  }
  console.log(`📦 ${INSERTS_PER_PART} inserts per part (set POLY_SQL_PART_SIZE to change)\n`);

  const legacyPath = path.join(dataDir, 'seed-polymarket.sql');
  if (fs.existsSync(legacyPath)) {
    console.log(`⚠️  Removing legacy monolithic ${legacyPath} (replaced by parts)`);
    fs.unlinkSync(legacyPath);
  }

  for (const f of fs.readdirSync(dataDir)) {
    if (/^seed-polymarket-part-\d+\.sql$/.test(f)) {
      fs.unlinkSync(path.join(dataDir, f));
    }
  }

  const totalParts = Math.ceil(marketsData.length / INSERTS_PER_PART) || 1;
  let partIndex = 0;

  for (let offset = 0; offset < marketsData.length; offset += INSERTS_PER_PART) {
    partIndex++;
    const slice = marketsData.slice(offset, offset + INSERTS_PER_PART);
    const body = slice.map(buildInsertStatement).join('\n\n');

    const sql = `-- Polymarket seed part ${partIndex}/${totalParts}
-- Generated: ${new Date().toISOString()}
-- Rows in this part: ${slice.length}

BEGIN;

${body}

COMMIT;
`;

    const name = `seed-polymarket-part-${String(partIndex).padStart(4, '0')}.sql`;
    const outPath = path.join(dataDir, name);
    fs.writeFileSync(outPath, sql);

    const mb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
    console.log(`   ✓ ${name} (${mb} MB, ${slice.length} inserts)`);
  }

  console.log(`\n✅ Generated ${partIndex} part file(s) in data/`);
  console.log(`\n📋 Next: npx tsx scripts/run-sql-seed.ts polymarket`);
}

generateSQLSeed().catch(console.error);
