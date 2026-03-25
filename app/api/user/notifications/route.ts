import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { randomInt } from 'crypto';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { emailNotifications: true, telegramChatId: true }
  });

  return NextResponse.json({
    emailNotifications: user?.emailNotifications ?? false,
    telegramLinked: !!user?.telegramChatId
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { action } = body;

  if (action === 'toggle_email') {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { emailNotifications: true }
    });
    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: { emailNotifications: !user?.emailNotifications }
    });
    return NextResponse.json({ emailNotifications: updated.emailNotifications });
  }

  if (action === 'generate_telegram_code') {
    const code = randomInt(100000, 1000000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    await prisma.user.update({
      where: { email: session.user.email },
      data: { telegramVerifyCode: code, telegramVerifyExpiry: expiry }
    });
    return NextResponse.json({ code });
  }

  if (action === 'unlink_telegram') {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { telegramChatId: null, telegramVerifyCode: null, telegramVerifyExpiry: null }
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
