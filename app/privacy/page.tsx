import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — MarketEdge',
    description: 'Privacy Policy for MarketEdge'
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm mb-10">Last updated: March 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Who we are</h2>
                    <p>MarketEdge is a prediction market comparison tool operated by Manuel Silva Montes de Oca. The service is accessible at marketedge-chi.vercel.app. You can contact us at any time through the links provided in this policy.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. What data we collect</h2>
                    <p>We collect only the minimum data necessary to provide the service:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong className="text-white">Account data:</strong> When you sign in with Google, we receive your name, email address, and profile picture from Google. We store your email to identify your account.</li>
                        <li><strong className="text-white">Preferences:</strong> We store your pinned markets, tracked whales, saved comparisons, and notification preferences.</li>
                        <li><strong className="text-white">Telegram ID:</strong> If you choose to link Telegram, we store your Telegram chat ID to send you alerts.</li>
                        <li><strong className="text-white">Usage data:</strong> We do not use analytics trackers. Basic request logs may be retained by our hosting provider (Vercel) for up to 30 days.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. How we use your data</h2>
                    <p>Your data is used exclusively to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Authenticate you and maintain your session</li>
                        <li>Save and display your pins, tracked whales, and comparisons</li>
                        <li>Send arbitrage alerts if you have enabled email or Telegram notifications</li>
                    </ul>
                    <p className="mt-3">We do not sell your data. We do not share your data with third parties except as described below.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Third-party services</h2>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong className="text-white">Google OAuth:</strong> Used for authentication. Governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Google's Privacy Policy</a>.</li>
                        <li><strong className="text-white">Vercel:</strong> Our hosting provider. May retain server logs. Governed by <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Vercel's Privacy Policy</a>.</li>
                        <li><strong className="text-white">Supabase:</strong> Our database provider. Your data is stored in Supabase-managed PostgreSQL. Governed by <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Supabase's Privacy Policy</a>.</li>
                        <li><strong className="text-white">Resend:</strong> Used to send email alerts if you opt in. Governed by <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Resend's Privacy Policy</a>.</li>
                        <li><strong className="text-white">Telegram:</strong> Used to send alerts if you link your account. Governed by <a href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">Telegram's Privacy Policy</a>.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Data retention</h2>
                    <p>We retain your account data for as long as your account is active. If you delete your account or request deletion, we will remove your personal data within 30 days. Pins and preferences are deleted immediately upon account deletion.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">6. Your rights</h2>
                    <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights or to delete your account, contact us via GitHub or the MarketEdge dashboard. We will respond within 30 days.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">7. Cookies</h2>
                    <p>We use a single session cookie to keep you logged in. We do not use advertising cookies or third-party tracking cookies.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">8. Changes to this policy</h2>
                    <p>We may update this policy as the service evolves. Material changes will be noted by updating the date at the top of this page.</p>
                </section>

            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← Back to MarketEdge
                </Link>
            </div>
        </div>
    );
}