export class TelegramService {
  private botToken: string;
  private chatId: string;
  private baseUrl: string;

  constructor() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set');
    }

    this.botToken = token;
    this.chatId = chatId;
    this.baseUrl = `https://api.telegram.org/bot${token}`;
  }

  async sendMessage(text: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('[Telegram] Send failed:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('[Telegram] Error:', error);
      return false;
    }
  }

  formatArbitrageAlert(opportunity: {
    question: string;
    roi: number;
    category: string | null;
    buyYesOn: string;
    buyNoOn: string;
    polymarket: {
      yesPrice: number;
      noPrice: number;
      url: string | null;
    };
    kalshi: {
      yesPrice: number;
      noPrice: number;
      url: string | null;
    };
  }): string {
    const categoryTag = opportunity.category ? `#${opportunity.category.replace(/\s+/g, '')}` : '';
    const roiStr = opportunity.roi.toFixed(2);

    const buyYesPrice = opportunity.buyYesOn === 'POLYMARKET'
      ? (opportunity.polymarket.yesPrice * 100).toFixed(1)
      : (opportunity.kalshi.yesPrice * 100).toFixed(1);

    const buyNoPrice = opportunity.buyNoOn === 'POLYMARKET'
      ? (opportunity.polymarket.noPrice * 100).toFixed(1)
      : (opportunity.kalshi.noPrice * 100).toFixed(1);

    const buyYesPlatform = opportunity.buyYesOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi';
    const buyNoPlatform = opportunity.buyNoOn === 'POLYMARKET' ? 'Polymarket' : 'Kalshi';

    const polyUrl = opportunity.polymarket.url ?? 'https://polymarket.com';
    const kalshiUrl = opportunity.kalshi.url ?? 'https://kalshi.com';

    return [
      `🔔 <b>Arbitrage Alert</b> ${categoryTag}`,
      ``,
      `<b>${opportunity.question}</b>`,
      ``,
      `💰 ROI: <b>+${roiStr}%</b>`,
      ``,
      `📈 Buy YES on <b>${buyYesPlatform}</b> @ ${buyYesPrice}¢`,
      `📉 Buy NO on <b>${buyNoPlatform}</b> @ ${buyNoPrice}¢`,
      ``,
      `🔗 <a href="${polyUrl}">Polymarket</a> | <a href="${kalshiUrl}">Kalshi</a>`
    ].join('\n');
  }
}
