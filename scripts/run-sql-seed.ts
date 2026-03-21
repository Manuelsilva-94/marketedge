/**
 * Ejecuta el archivo SQL de seed generado (Polymarket o Kalshi).
 * Usar DATABASE_URL en .env
 *
 * Uso:
 *   npx tsx scripts/run-sql-seed.ts polymarket
 *   npx tsx scripts/run-sql-seed.ts kalshi
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const PLATFORM = process.argv[2] || 'polymarket';
const VALID = ['polymarket', 'kalshi'];
if (!VALID.includes(PLATFORM.toLowerCase())) {
  console.error(`Usage: npx tsx scripts/run-sql-seed.ts [polymarket|kalshi]`);
  process.exit(1);
}

const sqlFile =
  PLATFORM.toLowerCase() === 'kalshi'
    ? 'seed-kalshi.sql'
    : 'seed-polymarket.sql';
const sqlPath = path.join(process.cwd(), 'data', sqlFile);

async function runSeed() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL not set in .env');
    process.exit(1);
  }

  if (!fs.existsSync(sqlPath)) {
    console.error(`❌ SQL file not found: ${sqlPath}`);
    console.error(`   Run generate-sql-seed.ts (polymarket) or generate-sql-kalshi.ts (kalshi) first.`);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf-8');
  console.log(`🔄 Running ${sqlFile} (${(sql.length / 1024 / 1024).toFixed(2)} MB)...\n`);

  const client = new Client({ connectionString: dbUrl });
  const startTime = Date.now();

  try {
    await client.connect();
    await client.query(sql);
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log(`\n✅ Seed complete in ${duration}s`);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSeed().catch(console.error);
