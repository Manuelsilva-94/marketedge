import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { PinType } from '@/lib/db-types';

async function getUserId(session: Awaited<ReturnType<typeof auth>>): Promise<string | null> {
  if (!session?.user?.email) return null;
  if (session.user.id) return session.user.id;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });
  return user?.id ?? null;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const type = req.nextUrl.searchParams.get('type') as PinType | null;
  const pins = await prisma.pin.findMany({
    where: { userId, ...(type && { type }) },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ pins });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, targetId, notes } = await req.json();
  if (!type || !targetId) return NextResponse.json({ error: 'type and targetId required' }, { status: 400 });

  const pin = await prisma.pin.upsert({
    where: { userId_type_targetId: { userId, type, targetId } },
    update: { notes },
    create: { userId, type, targetId, notes }
  });
  return NextResponse.json({ pin });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userId = await getUserId(session);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { type, targetId } = await req.json();
  await prisma.pin.deleteMany({ where: { userId, type, targetId } });
  return NextResponse.json({ success: true });
}
