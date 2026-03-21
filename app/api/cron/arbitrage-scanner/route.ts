import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComparisonService } from '@/lib/services/comparison.service';
import { TelegramService } from '@/lib/services/telegram.service';
import { PolymarketService } from '@/lib/services/polymarket.service';
import { KalshiService } from '@/lib/services/kalshi.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function effectiveYesPrice(price: number, platform: 'POLYMARKET' | 'KALSHI'): number {
  if (platform === 'KALSHI') return price + 0.07 * price * (1 - price);
  return price;
}

export async function GET(req: NextRequest) {
  // Verificar authorization para evitar llamadas no autorizadas
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    // Normalizar: poly siempre es poly, kalshi siempre es kalshi
    const pairs = verifiedPairs
      .map((pair) => {
        const poly = pair.marketA.platform === 'POLYMARKET' ? pair.marketA : pair.marketB;
        const kalshi = pair.marketA.platform === 'KALSHI' ? pair.marketA : pair.marketB;
        if (poly.platform !== 'POLYMARKET' || kalshi.platform !== 'KALSHI') return null;
        return { matchId: pair.id, poly, kalshi };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .filter((p) => (p.poly.volume24h ?? 0) + (p.kalshi.volume24h ?? 0) > 100);

    console.log(`[CronScanner] ${pairs.length} pairs to scan`);

    // PASO 2: Fetch precios en batches y calcular arbitraje
    const detectedThisScan = new Map<
      string,
      { roi: number; polyPrice: number; kalshiPrice: number; buyYesOn: string; buyNoOn: string }
    >();

    for (let i = 0; i < pairs.length; i += BATCH_SIZE) {
      const batch = pairs.slice(i, i + BATCH_SIZE);

      await Promise.allSettled(
        batch.map(async (pair) => {
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
      const pair = pairs.find((p) => p.matchId === matchId);
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

    const activeMatchIds = new Set(activeInDb.map((o) => o.matchId));

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

        // Enviar alerta por Telegram
        if (telegramService && data.roi >= 1.0) {
          try {
            // Buscar datos del market para formatear el mensaje
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

              await telegramService.sendMessage(message);
            }
          } catch (e) {
            console.error('[CronScanner] Telegram alert failed:', e);
          }
        }
      } else {
        // Actualizar precio y ROI de oportunidad existente
        const existing = activeInDb.find((o) => o.matchId === matchId);
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
