import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSiteBaseUrl } from '@/lib/site-url';
import { ComparisonService } from '@/lib/services/comparison.service';
import { TelegramService } from '@/lib/services/telegram.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';
import { requireCronAuth } from '@/lib/cron-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;
export const preferredRegion = 'iad1';

function effectiveYesPrice(price: number, platform: 'POLYMARKET' | 'KALSHI'): number {
  if (platform === 'KALSHI') return price + 0.07 * price * (1 - price);
  return price;
}

export async function GET(req: NextRequest) {
  const authError = requireCronAuth(req);
  if (authError) return authError;

  const startedAt = Date.now();
  const MIN_ROI = 0.005; // 0.5% mínimo
  const BATCH_SIZE = 10;
  const newOpportunities: string[] = [];
  const closedOpportunities: string[] = [];
  let telegramService: TelegramService | null = null;
  try {
    telegramService = new TelegramService();
  } catch {
    console.warn('[CronScanner] Telegram not configured, alerts disabled');
  }

  try {
    const polyService = new PolymarketService();
    let kalshiService: KalshiService | null = null;
    try {
      kalshiService = new KalshiService();
    } catch {
      return NextResponse.json({ error: 'Kalshi auth not configured' }, { status: 500 });
    }

    const comparisonService = new ComparisonService();

    // PASO 1: Cargar pares verificados con volumen
    const verifiedPairs = await prisma.marketMatch.findMany({
      where: {
        isEquivalent: true,
        confidence: { gte: 0.82 },
        marketA: { active: true },
        marketB: { active: true }
      },
      include: {
        marketA: {
          select: {
            id: true,
            platform: true,
            question: true,
            externalId: true,
            slug: true,
            volume24h: true,
            url: true,
            category: true
          }
        },
        marketB: {
          select: {
            id: true,
            platform: true,
            question: true,
            externalId: true,
            slug: true,
            volume24h: true,
            url: true,
            category: true
          }
        }
      }
    });

    const pairsWithNulls = verifiedPairs.map(
      (pair: (typeof verifiedPairs)[number]) => {
        const poly = pair.marketA.platform === 'POLYMARKET' ? pair.marketA : pair.marketB;
        const kalshi = pair.marketA.platform === 'KALSHI' ? pair.marketA : pair.marketB;
        if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') return null;
        return { matchId: pair.id, poly, kalshi };
      }
    );
    type PairItem = NonNullable<(typeof pairsWithNulls)[number]>;
    const pairs = pairsWithNulls
      .filter((p: PairItem | null): p is PairItem => p !== null)
      .filter((p: PairItem) => (p.poly.volume24h ?? 0) + (p.kalshi.volume24h ?? 0) > 100);

    console.log(`[CronScanner] ${pairs.length} pairs to scan`);

    // PASO 2: Fetch precios en batches y calcular arbitraje
    const detectedThisScan = new Map<
      string,
      { roi: number; polyPrice: number; kalshiPrice: number; buyYesOn: string; buyNoOn: string }
    >();

    for (let i = 0; i < pairs.length; i += BATCH_SIZE) {
      const batch = pairs.slice(i, i + BATCH_SIZE);

      await Promise.allSettled(
        batch.map(async (pair: PairItem) => {
          try {
            const [polyLive, kalshiLive] = await Promise.all([
              polyService.getLiveMarket({
                externalId: pair.poly.externalId,
                platform: 'POLYMARKET',
                slug: pair.poly.slug
              }),
              kalshiService!.getLiveMarket({
                externalId: pair.kalshi.externalId,
                platform: 'KALSHI'
              })
            ]);

            if (!polyLive?.yesPrice || !kalshiLive?.yesPrice) return;

            const arbitrage = comparisonService.detectArbitrage({
              sourceMarket: { ...polyLive, platform: 'POLYMARKET' },
              matches: [{ ...kalshiLive, platform: 'KALSHI' }]
            });

            if (
              arbitrage.detected &&
              arbitrage.roi !== null &&
              arbitrage.roi / 100 >= MIN_ROI
            ) {
              detectedThisScan.set(pair.matchId, {
                roi: arbitrage.roi,
                polyPrice: polyLive.yesPrice,
                kalshiPrice: kalshiLive.yesPrice,
                buyYesOn: arbitrage.buyYesOn ?? 'POLYMARKET',
                buyNoOn: arbitrage.buyNoOn ?? 'KALSHI'
              });
            }
          } catch {
            // Silenciar errores individuales
          }
        })
      );

      // Pausa entre batches
      if (i + BATCH_SIZE < pairs.length) {
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    // Deduplicar por kalshi market: si el mismo market de Kalshi aparece en múltiples
    // oportunidades, quedarse solo con la de mayor ROI
    const deduplicatedScan = new Map<
      string,
      { matchId: string; roi: number; polyPrice: number; kalshiPrice: number; buyYesOn: string; buyNoOn: string }
    >();

    for (const [matchId, data] of detectedThisScan.entries()) {
      // Obtener el kalshi market id para este matchId
      const pair = pairs.find((p: PairItem) => p.matchId === matchId);
      if (!pair) continue;
      const kalshiId = pair.kalshi.id;

      const existing = deduplicatedScan.get(kalshiId);
      if (!existing || data.roi > existing.roi) {
        deduplicatedScan.set(kalshiId, { matchId, ...data });
      }
    }

    // Convertir de vuelta a Map<matchId, data>
    const finalScan = new Map<
      string,
      { roi: number; polyPrice: number; kalshiPrice: number; buyYesOn: string; buyNoOn: string }
    >();
    for (const data of deduplicatedScan.values()) {
      const { matchId, ...rest } = data;
      finalScan.set(matchId, rest);
    }

    console.log(
      `[CronScanner] ${detectedThisScan.size} opportunities detected, ${finalScan.size} after deduplication`
    );

    // PASO 3: Sincronizar con tabla ArbitrageOpportunity

    // 3a: Oportunidades activas actuales en DB
    const activeInDb = await prisma.arbitrageOpportunity.findMany({
      where: { active: true },
      select: { id: true, matchId: true }
    });

    type ActiveOpp = { id: string; matchId: string };
    const activeMatchIds = new Set(activeInDb.map((o: ActiveOpp) => o.matchId));

    // 3b: Nuevas oportunidades (detectadas pero no en DB activa)
    for (const [matchId, data] of finalScan.entries()) {
      if (!activeMatchIds.has(matchId)) {
        await prisma.arbitrageOpportunity.create({
          data: {
            matchId,
            roiPercent: data.roi,
            buyYesOn: data.buyYesOn as 'POLYMARKET' | 'KALSHI',
            buyNoOn: data.buyNoOn as 'POLYMARKET' | 'KALSHI',
            polyPrice: data.polyPrice,
            kalshiPrice: data.kalshiPrice,
            active: true
          }
        });
        newOpportunities.push(matchId);
        console.log(`[CronScanner] NEW opportunity: matchId=${matchId} ROI=${data.roi.toFixed(2)}%`);

        const siteBase = getSiteBaseUrl();

        if (data.roi >= 1.0) {
          try {
            const match = await prisma.marketMatch.findUnique({
              where: { id: matchId },
              include: {
                marketA: { select: { question: true, category: true, url: true, platform: true } },
                marketB: { select: { question: true, category: true, url: true, platform: true } }
              }
            });

            if (match) {
              const polyMarket = match.marketA.platform === 'POLYMARKET' ? match.marketA : match.marketB;
              const kalshiMarket = match.marketA.platform === 'KALSHI' ? match.marketA : match.marketB;

              if (telegramService) {
                const message = telegramService.formatArbitrageAlert({
                  question: polyMarket.question,
                  roi: data.roi,
                  category: polyMarket.category,
                  buyYesOn: data.buyYesOn,
                  buyNoOn: data.buyNoOn,
                  polymarket: {
                    yesPrice: data.polyPrice,
                    noPrice: 1 - data.polyPrice,
                    url: polyMarket.url
                  },
                  kalshi: {
                    yesPrice: data.kalshiPrice,
                    noPrice: 1 - data.kalshiPrice,
                    url: kalshiMarket.url
                  }
                });
                await telegramService.sendMessage(message).catch((e) => console.error('[Telegram global]', e));
              }

              const botToken = process.env.TELEGRAM_BOT_TOKEN;
              if (botToken) {
                const telegramUsers = await prisma.user.findMany({
                  where: { telegramChatId: { not: null } },
                  select: { telegramChatId: true }
                });
                for (const u of telegramUsers) {
                  if (!u.telegramChatId) continue;
                  const text = `⚡ <b>New Arbitrage</b>\n\n${polyMarket.question}\n\n💰 ROI: <b>${data.roi.toFixed(2)}%</b>\n📊 Buy YES on ${data.buyYesOn}\n\n<a href="${siteBase}/arbitrage">View on MarketEdge</a>`;
                  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      chat_id: u.telegramChatId,
                      text,
                      parse_mode: 'HTML',
                      disable_web_page_preview: true
                    })
                  }).catch((e) => console.error('[Telegram personal]', e));
                }
              }

              const emailUsers = await prisma.user.findMany({
                where: { emailNotifications: true, email: { not: null } },
                select: { email: true }
              });
              if (emailUsers.length > 0 && process.env.RESEND_API_KEY) {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);
                const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
                for (const u of emailUsers) {
                  if (!u.email) continue;
                  await resend.emails
                    .send({
                      from: fromEmail,
                      to: u.email,
                      subject: `⚡ ${data.roi.toFixed(1)}% ROI Arbitrage — ${polyMarket.question.slice(0, 60)}`,
                      html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:24px;border-radius:12px">
                <h2 style="color:#00ff88;margin-top:0">⚡ New Arbitrage Opportunity</h2>
                <p style="font-size:18px;font-weight:bold">${polyMarket.question}</p>
                <div style="background:#1a1a2e;border-radius:8px;padding:16px;margin:16px 0">
                  <p style="margin:0;font-size:24px;font-weight:bold;color:#00ff88">${data.roi.toFixed(2)}% ROI</p>
                  <p style="margin:4px 0 0;color:#888">Buy YES on ${data.buyYesOn} · Buy NO on ${data.buyNoOn}</p>
                </div>
                <a href="${siteBase}/arbitrage" style="display:inline-block;background:#00ff88;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">View Opportunity →</a>
                <p style="margin-top:24px;font-size:12px;color:#555">You're receiving this because you enabled email alerts in MarketEdge. <a href="${siteBase}/dashboard" style="color:#555">Manage preferences</a></p>
              </div>
            `
                    })
                    .catch((e) => console.error('[Email alert]', e));
                }
              }
            }
          } catch (e) {
            console.error('[CronScanner] Notification error:', e);
          }
        }
      } else {
        // Actualizar precio y ROI de oportunidad existente
        const existing = activeInDb.find((o: ActiveOpp) => o.matchId === matchId);
        if (existing) {
          await prisma.arbitrageOpportunity.update({
            where: { id: existing.id },
            data: {
              roiPercent: data.roi,
              polyPrice: data.polyPrice,
              kalshiPrice: data.kalshiPrice,
              buyYesOn: data.buyYesOn as 'POLYMARKET' | 'KALSHI',
              buyNoOn: data.buyNoOn as 'POLYMARKET' | 'KALSHI'
            }
          });
        }
      }
    }

    // 3c: Cerrar oportunidades que ya no tienen arbitraje
    for (const active of activeInDb) {
      if (!finalScan.has(active.matchId)) {
        await prisma.arbitrageOpportunity.update({
          where: { id: active.id },
          data: { active: false, closedAt: new Date() }
        });
        closedOpportunities.push(active.matchId);
        console.log(`[CronScanner] CLOSED opportunity: matchId=${active.matchId}`);
      }
    }

    const duration = Date.now() - startedAt;

    return NextResponse.json({
      success: true,
      scannedPairs: pairs.length,
      detectedCount: finalScan.size,
      newOpportunities: newOpportunities.length,
      closedOpportunities: closedOpportunities.length,
      durationMs: duration,
      runAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[CronScanner] Fatal error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
