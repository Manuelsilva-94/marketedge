/**
 * Ejecuta el archivo SQL de seed generado (Polymarket o Kalshi).
 * Usar DATABASE_URL en .env
 *
 * Polymarket: si existen data/seed-polymarket-part-*.sql, se ejecutan en orden.
 * Si no, usa data/seed-polymarket.sql (legado).
 *
 * Kalshi: si existen data/seed-kalshi-part-*.sql, se ejecutan en orden.
 * Si no, usa data/seed-kalshi.sql (legado).
 *
 * Supabase: para cargas grandes usa Connection string "Session" o "Direct" (puerto 5432),
 * no Transaction pooler (6543). Opcional: DATABASE_URL_DIRECT en .env solo para este script.
 *
 * Uso:
 *   npx tsx scripts/run-sql-seed.ts polymarket
 *   npx tsx scripts/run-sql-seed.ts kalshi
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client, type ClientConfig } from 'pg';

const PLATFORM = process.argv[2] || 'polymarket';
const VALID = ['polymarket', 'kalshi'];
if (!VALID.includes(PLATFORM.toLowerCase())) {
  console.error(`Usage: npx tsx scripts/run-sql-seed.ts [polymarket|kalshi]`);
  process.exit(1);
}

const dataDir = path.join(process.cwd(), 'data');

function listPolymarketPartFiles(): string[] {
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir)
    .filter((f) => /^seed-polymarket-part-\d+\.sql$/.test(f))
    .sort((a, b) => {
      const na = parseInt(/part-(\d+)/.exec(a)?.[1] ?? '0', 10);
      const nb = parseInt(/part-(\d+)/.exec(b)?.[1] ?? '0', 10);
      return na - nb;
    })
    .map((f) => path.join(dataDir, f));
}

function listKalshiPartFiles(): string[] {
  if (!fs.existsSync(dataDir)) return [];
  return fs
    .readdirSync(dataDir)
    .filter((f) => /^seed-kalshi-part-\d+\.sql$/.test(f))
    .sort((a, b) => {
      const na = parseInt(/part-(\d+)/.exec(a)?.[1] ?? '0', 10);
      const nb = parseInt(/part-(\d+)/.exec(b)?.[1] ?? '0', 10);
      return na - nb;
    })
    .map((f) => path.join(dataDir, f));
}

const sqlFile =
  PLATFORM.toLowerCase() === 'kalshi'
    ? 'seed-kalshi.sql'
    : 'seed-polymarket.sql';
const sqlPath = path.join(process.cwd(), 'data', sqlFile);

function resolveConnectionString(): string {
  return (
    process.env.DATABASE_URL_DIRECT?.trim() ||
    process.env.DATABASE_URL?.trim() ||
    ''
  );
}

function pgConfig(): ClientConfig {
  const connectionString = resolveConnectionString();
  const hostish = connectionString.toLowerCase();
  const isSupabase = hostish.includes('supabase.co');
  const isNeon = hostish.includes('neon.tech');
  const needsSsl = isSupabase || isNeon || hostish.includes('sslmode=require');

  return {
    connectionString,
    connectionTimeoutMillis: 120_000,
    ...(needsSsl && {
      ssl: { rejectUnauthorized: false }
    })
  };
}

/** Una conexión por archivo: evita cortes del pooler y timeouts en sesiones largas. */
async function runSqlFileOnce(filePath: string): Promise<void> {
  const client = new Client(pgConfig());
  client.on('error', (err) => {
    console.error('   (pg socket):', err.message);
  });
  try {
    await client.connect();
    await client.query('SET statement_timeout = 0');
    await client.query("SET idle_in_transaction_session_timeout = '0'");
    const buf = fs.readFileSync(filePath, 'utf-8');
    await client.query(buf);
  } finally {
    try {
      await client.end();
    } catch {
      /* ignore */
    }
  }
}

async function runSeed() {
  const dbUrl = resolveConnectionString();
  if (!dbUrl) {
    console.error('❌ DATABASE_URL or DATABASE_URL_DIRECT not set in .env');
    process.exit(1);
  }

  if (dbUrl.includes(':6543')) {
    console.warn(
      '\n⚠️  DATABASE_URL usa puerto 6543 (pooler). Las cargas grandes suelen cortarse.\n' +
        '   En Supabase: Settings → Database → Connection string → Session mode o Direct (5432).\n' +
        '   Opcional: DATABASE_URL_DIRECT=postgresql://...5432... solo para este script.\n'
    );
  }

  const startTime = Date.now();

  try {
    if (PLATFORM.toLowerCase() === 'polymarket') {
      const parts = listPolymarketPartFiles();
      if (parts.length > 0) {
        console.log(`🔄 Running ${parts.length} Polymarket part file(s) (new connection each)...\n`);
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          const name = path.basename(p);
          const mb = (fs.statSync(p).size / 1024 / 1024).toFixed(2);
          console.log(`   [${i + 1}/${parts.length}] ${name} (${mb} MB)...`);
          const t0 = Date.now();
          await runSqlFileOnce(p);
          console.log(`       done in ${Math.round((Date.now() - t0) / 1000)}s`);
        }
        const duration = Math.round((Date.now() - startTime) / 1000);
        console.log(`\n✅ Polymarket seed complete in ${duration}s`);
        return;
      }

      if (!fs.existsSync(sqlPath)) {
        console.error(`❌ No part files (seed-polymarket-part-*.sql) and no ${sqlPath}`);
        console.error(`   Run: npx tsx scripts/generate-sql-seed.ts`);
        process.exit(1);
      }

      const mb = (fs.statSync(sqlPath).size / 1024 / 1024).toFixed(2);
      console.log(`🔄 Running legacy ${sqlFile} (${mb} MB)...\n`);
      await runSqlFileOnce(sqlPath);
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log(`\n✅ Seed complete in ${duration}s`);
      return;
    }

    const kalshiParts = listKalshiPartFiles();
    if (kalshiParts.length > 0) {
      console.log(`🔄 Running ${kalshiParts.length} Kalshi part file(s) (new connection each)...\n`);
      for (let i = 0; i < kalshiParts.length; i++) {
        const p = kalshiParts[i];
        const name = path.basename(p);
        const mb = (fs.statSync(p).size / 1024 / 1024).toFixed(2);
        console.log(`   [${i + 1}/${kalshiParts.length}] ${name} (${mb} MB)...`);
        const t0 = Date.now();
        await runSqlFileOnce(p);
        console.log(`       done in ${Math.round((Date.now() - t0) / 1000)}s`);
      }
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log(`\n✅ Kalshi seed complete in ${duration}s`);
      return;
    }

    if (!fs.existsSync(sqlPath)) {
      console.error(`❌ No part files (seed-kalshi-part-*.sql) and no ${sqlPath}`);
      console.error(`   Run: npx tsx scripts/generate-sql-kalshi.ts`);
      process.exit(1);
    }

    const mb = (fs.statSync(sqlPath).size / 1024 / 1024).toFixed(2);
    console.log(`🔄 Running legacy ${sqlFile} (${mb} MB)...\n`);

    await runSqlFileOnce(sqlPath);
    const duration = Math.round((Date.now() - startTime) / 1000);
    console.log(`\n✅ Seed complete in ${duration}s`);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

runSeed().catch(console.error);
