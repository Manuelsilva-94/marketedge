import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // Obtener todos los pins del usuario
  const pins = await prisma.pin.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  const arbitragePins = pins.filter(p => p.type === 'ARBITRAGE');
  const whalePins = pins.filter(p => p.type === 'WHALE');
  const comparisonPins = pins.filter(p => p.type === 'COMPARISON');

  // Arbitrage: buscar oportunidades activas pineadas
  const pinnedArbitrage = arbitragePins.length > 0
    ? await prisma.arbitrageOpportunity.findMany({
        where: {
          matchId: { in: arbitragePins.map(p => p.targetId) },
          active: true
        },
        include: {
          match: {
            include: {
              marketA: { select: { id: true, platform: true, question: true, category: true, url: true, volume24h: true, externalId: true, seriesId: true, eventId: true } },
              marketB: { select: { id: true, platform: true, question: true, category: true, url: true, volume24h: true, externalId: true, seriesId: true, eventId: true } }
            }
          }
        },
        orderBy: { roiPercent: 'desc' }
      })
    : [];

  // Whales: buscar datos de la tabla Market (posiciones abiertas no están en DB)
  // Solo devolvemos los addresses pineados
  const pinnedWhales = whalePins.map(p => ({
    address: p.targetId,
    pinnedAt: p.createdAt,
    notes: p.notes
  }));

  // Comparisons: el targetId tiene formato "marketAId:marketBId"
  const pinnedComparisons = await Promise.all(
    comparisonPins.map(async (pin) => {
      const [marketAId, marketBId] = pin.targetId.split(':');
      if (!marketAId || !marketBId) return null;
      const [marketA, marketB] = await Promise.all([
        prisma.market.findUnique({
          where: { id: marketAId },
          select: { id: true, platform: true, question: true, url: true }
        }),
        prisma.market.findUnique({
          where: { id: marketBId },
          select: { id: true, platform: true, question: true, url: true }
        })
      ]);
      if (!marketA || !marketB) return null;
      return {
        id: pin.targetId,
        createdAt: pin.createdAt.toISOString(),
        marketA,
        marketB
      };
    })
  ).then(results => results.filter(Boolean));

  return NextResponse.json({
    pinnedArbitrage,
    pinnedWhales,
    pinnedComparisons,
    stats: {
      totalArbitrage: arbitragePins.length,
      activeArbitrage: pinnedArbitrage.filter(a => a.active).length,
      totalWhales: whalePins.length,
      totalComparisons: comparisonPins.length
    }
  });
}
