import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat?.id?.toString();
    const text = message.text?.trim();
    if (!chatId || !text) return NextResponse.json({ ok: true });

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) return NextResponse.json({ ok: true });

    const sendReply = async (msg: string) => {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'HTML' })
      });
    };

    if (text.startsWith('/start')) {
      const parts = text.split(' ');
      const code = parts[1]?.trim();

      // Deep link con código: /start 123456
      if (code) {
        const user = await prisma.user.findFirst({
          where: {
            telegramVerifyCode: code,
            telegramVerifyExpiry: { gt: new Date() }
          }
        });

        if (!user) {
          await sendReply('❌ Invalid or expired code. Generate a new one from your Dashboard.');
          return NextResponse.json({ ok: true });
        }

        await prisma.user.update({
          where: { id: user.id },
          data: {
            telegramChatId: chatId,
            telegramVerifyCode: null,
            telegramVerifyExpiry: null
          }
        });

        await sendReply('✅ Your Telegram is now linked to MarketEdge!\n\nYou\'ll receive alerts when new arbitrage opportunities are detected (ROI ≥ 1%).\n\nSend /stop anytime to unsubscribe.');
        return NextResponse.json({ ok: true });
      }

      // /start sin código — bienvenida
      await sendReply(
        '👋 Welcome to <b>MarketEdge</b> alerts!\n\nTo link your account:\n1. Go to your <a href="https://marketedge-chi.vercel.app/dashboard">Dashboard</a>\n2. Click the Notifications tab\n3. Tap "Connect Telegram"\n\nThat\'s it — one click!'
      );
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith('/verify ')) {
      const code = text.replace('/verify ', '').trim();

      const user = await prisma.user.findFirst({
        where: {
          telegramVerifyCode: code,
          telegramVerifyExpiry: { gt: new Date() }
        }
      });

      if (!user) {
        await sendReply('❌ Invalid or expired code. Generate a new one from your Dashboard.');
        return NextResponse.json({ ok: true });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          telegramChatId: chatId,
          telegramVerifyCode: null,
          telegramVerifyExpiry: null
        }
      });

      await sendReply(
        "✅ Your Telegram is now linked to MarketEdge!\n\nYou'll receive alerts when new arbitrage opportunities are detected (ROI ≥ 1%)."
      );
      return NextResponse.json({ ok: true });
    }

    if (text === '/stop') {
      await prisma.user.updateMany({
        where: { telegramChatId: chatId },
        data: { telegramChatId: null }
      });
      await sendReply(
        '🔕 Notifications disabled. You can re-link anytime from your Dashboard.'
      );
      return NextResponse.json({ ok: true });
    }

    await sendReply('Commands:\n/verify CODE — Link your account\n/stop — Disable notifications');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[TelegramWebhook] Error:', err);
    return NextResponse.json({ ok: true });
  }
}
