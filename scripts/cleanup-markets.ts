/**
 * Aggressive DB cleanup for Supabase free tier: run manually (e.g. weekly).
 * - Inactive markets with old endDate
 * - Resolved, unmatched, old
 * - Old SyncLog rows (optional)
 */
import 'dotenv/config';
import { prisma } from '@/lib/prisma';

async function main() {
  const inactiveDays = Number(process.env.CLEANUP_INACTIVE_DAYS ?? '7') || 7;
  const resolvedDays = Number(process.env.CLEANUP_RESOLVED_DAYS ?? '7') || 7;
  const syncLogKeepDays = Number(process.env.CLEANUP_SYNCLOG_DAYS ?? '30') || 30;

  const inactiveCut = new Date();
  inactiveCut.setDate(inactiveCut.getDate() - inactiveDays);

  const resolvedCut = new Date(Date.now() - resolvedDays * 24 * 60 * 60 * 1000);
  const syncLogCut = new Date(Date.now() - syncLogKeepDays * 24 * 60 * 60 * 1000);

  const d1 = await prisma.market.deleteMany({
    where: {
      active: false,
      endDate: { lt: inactiveCut }
    }
  });
  console.log(`[cleanup] Deleted ${d1.count} inactive markets (endDate < ${inactiveDays}d ago)`);

  const d2 = await prisma.market.deleteMany({
    where: {
      active: false,
      resolvedAt: { not: null, lt: resolvedCut },
      AND: [{ matchesAsA: { none: {} } }, { matchesAsB: { none: {} } }]
    }
  });
  console.log(`[cleanup] Deleted ${d2.count} resolved stale unmatched (>${resolvedDays}d)`);

  const d3 = await prisma.syncLog.deleteMany({
    where: { lastSyncedAt: { lt: syncLogCut } }
  });
  console.log(`[cleanup] Deleted ${d3.count} old SyncLog rows (>${syncLogKeepDays}d)`);

  console.log(
    `[cleanup] Totals: markets ${d1.count + d2.count}, syncLogs ${d3.count}. Run VACUUM in Supabase SQL if disk size stays high.`
  );

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
