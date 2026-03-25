import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service — MarketEdge',
    description: 'Terms of Service for MarketEdge'
};

export default function TermsPage() {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground text-sm mb-10">Last updated: March 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance</h2>
                    <p>By accessing or using MarketEdge ("the Service"), you agree to be bound by these Terms. If you do not agree, do not use the Service. The Service is operated by Manuel Silva Montes de Oca.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">2. Description of service</h2>
                    <p>MarketEdge is an informational tool that aggregates and compares publicly available data from prediction market platforms (Polymarket and Kalshi). The Service displays market prices, identifies potential arbitrage opportunities, and tracks public trader activity.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">3. Not financial advice</h2>
                    <p className="text-amber-400/80">All information provided by MarketEdge is for informational purposes only and does not constitute financial, investment, or trading advice. Identified arbitrage opportunities may be inaccurate, stale, or may no longer exist by the time you act on them. You are solely responsible for any trading decisions you make. Past performance is not indicative of future results.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">4. Eligibility</h2>
                    <p>You must be of legal age in your jurisdiction to use prediction market platforms. MarketEdge does not facilitate trading — it only displays information. Compliance with local laws regarding prediction markets is your responsibility.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">5. Accuracy of data</h2>
                    <p>Market data is fetched from third-party APIs and may be delayed, inaccurate, or unavailable. We make no guarantees regarding the accuracy, completeness, or timeliness of any data displayed. Always verify prices directly on the respective platforms before trading.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">6. Acceptable use</h2>
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Scrape, crawl, or systematically extract data from the Service</li>
                        <li>Attempt to reverse engineer or interfere with the Service</li>
                        <li>Use the Service for any unlawful purpose</li>
                        <li>Attempt to access other users' accounts or data</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">7. Limitation of liability</h2>
                    <p>To the maximum extent permitted by law, MarketEdge and its operator shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service or reliance on any information provided. This includes but is not limited to trading losses.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">8. Service availability</h2>
                    <p>We do not guarantee continuous availability of the Service. We may modify, suspend, or discontinue the Service at any time without notice.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">9. Changes to terms</h2>
                    <p>We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
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