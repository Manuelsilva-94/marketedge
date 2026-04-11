import { prisma } from '@/lib/prisma';
import { getSiteBaseUrl } from '@/lib/site-url';
import { TelegramService } from '@/lib/services/telegram.service';
import type { Platform } from '@/lib/db-types';

const HIGH_ROI_PCT = 1.0;

export type NotifyArgs = {
  opportunityId: string;
  matchId: string;
  roiPercent: number;
  buyYesOn: Platform;
  buyNoOn: Platform;
  polyPrice: number;
  kalshiPrice: number;
};

/**
 * Telegram + email for ROI ≥ 1%, aligned with `arbitrage-scanner` cron.
 * Sets `notifiedAt` after a successful global Telegram send (or if Telegram is disabled but email sent).
 */
export async function notifyHighRoiIfNeeded(args: NotifyArgs): Promise<void> {
  if (args.roiPercent < HIGH_ROI_PCT) return;

  const opp = await prisma.arbitrageOpportunity.findUnique({
    where: { id: args.opportunityId },
    select: { notifiedAt: true }
  });
  if (opp?.notifiedAt) return;

  let telegramService: TelegramService | null = null;
  try {
    telegramService = new TelegramService();
  } catch {
    console.warn('[worker-notify] Telegram not configured');
  }

  const match = await prisma.marketMatch.findUnique({
    where: { id: args.matchId },
    include: {
      marketA: { select: { question: true, category: true, url: true, platform: true } },
      marketB: { select: { question: true, category: true, url: true, platform: true } }
    }
  });

  if (!match) return;

  const polyMarket =
    match.marketA.platform === 'POLYMARKET' ? match.marketA : match.marketB;
  const kalshiMarket =
    match.marketA.platform === 'KALSHI' ? match.marketA : match.marketB;

  const siteBase = getSiteBaseUrl();
  let notified = false;

  try {
    if (telegramService) {
      const message = telegramService.formatArbitrageAlert({
        question: polyMarket.question,
        roi: args.roiPercent,
        category: polyMarket.category,
        buyYesOn: args.buyYesOn,
        buyNoOn: args.buyNoOn,
        polymarket: {
          yesPrice: args.polyPrice,
          noPrice: 1 - args.polyPrice,
          url: polyMarket.url
        },
        kalshi: {
          yesPrice: args.kalshiPrice,
          noPrice: 1 - args.kalshiPrice,
          url: kalshiMarket.url
        }
      });
      const ok = await telegramService.sendMessage(message).catch((e) => {
        console.error('[worker-notify] Telegram global', e);
        return false;
      });
      if (ok) notified = true;
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (botToken) {
      const telegramUsers = await prisma.user.findMany({
        where: { telegramChatId: { not: null } },
        select: { telegramChatId: true }
      });
      for (const u of telegramUsers) {
        if (!u.telegramChatId) continue;
        const text = `⚡ <b>New Arbitrage</b>\n\n${polyMarket.question}\n\n💰 ROI: <b>${args.roiPercent.toFixed(2)}%</b>\n📊 Buy YES on ${args.buyYesOn}\n\n<a href="${siteBase}/arbitrage">View on MarketEdge</a>`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: u.telegramChatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        }).catch((e) => console.error('[worker-notify] Telegram personal', e));
      }
      notified = true;
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
            subject: `⚡ ${args.roiPercent.toFixed(1)}% ROI Arbitrage — ${polyMarket.question.slice(0, 60)}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#fff;padding:24px;border-radius:12px">
                <h2 style="color:#00ff88;margin-top:0">⚡ New Arbitrage Opportunity</h2>
                <p style="font-size:18px;font-weight:bold">${polyMarket.question}</p>
                <div style="background:#1a1a2e;border-radius:8px;padding:16px;margin:16px 0">
                  <p style="margin:0;font-size:24px;font-weight:bold;color:#00ff88">${args.roiPercent.toFixed(2)}% ROI</p>
                  <p style="margin:4px 0 0;color:#888">Buy YES on ${args.buyYesOn} · Buy NO on ${args.buyNoOn}</p>
                </div>
                <a href="${siteBase}/arbitrage" style="display:inline-block;background:#00ff88;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">View Opportunity →</a>
                <p style="margin-top:24px;font-size:12px;color:#555">You're receiving this because you enabled email alerts in MarketEdge. <a href="${siteBase}/dashboard" style="color:#555">Manage preferences</a></p>
              </div>
            `
          })
          .catch((e) => console.error('[worker-notify] Email', e));
      }
      notified = true;
    }

    if (notified) {
      await prisma.arbitrageOpportunity.update({
        where: { id: args.opportunityId },
        data: { notifiedAt: new Date() }
      });
    }
  } catch (e) {
    console.error('[worker-notify] Error:', e);
  }
}
