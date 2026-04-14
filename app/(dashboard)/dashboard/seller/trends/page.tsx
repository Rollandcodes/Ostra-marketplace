import Link from 'next/link';
import { ArrowLeft, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { getMarketTrendsSummary } from '@/lib/market-trends';

export default async function SellerTrendsPage() {
  const trends = await getMarketTrendsSummary();

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/seller" mode="seller" title="Market Trends" subtitle={trends.ready ? 'OpenAI insights enabled' : 'Local analytics summary'} />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/dashboard/seller" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to seller hub
            </Link>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Market Trends</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">A live summary of listing demand, visibility, and product mix across the marketplace.</p>
          </div>
          <div className="soft-card flex items-center gap-3 px-5 py-4 text-sm font-semibold text-foreground/70">
            <Sparkles className="h-5 w-5 text-primary" />
            {trends.ready ? 'Generated with OpenAI' : 'Using live marketplace data'}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {trends.highlights.map((item) => (
            <div key={item} className="soft-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Insight</p>
              <p className="mt-3 text-lg font-semibold text-balance">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="soft-card p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Seller summary</h2>
            </div>
            <div className="mt-5 space-y-4">
              {trends.summary.map((line) => (
                <div key={line} className="rounded-2xl bg-muted p-4 text-sm leading-7 text-foreground/80">
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section className="soft-card p-6">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Next actions</h2>
            </div>
            <div className="mt-5 space-y-4">
              {trends.recommendations.map((item) => (
                <div key={item} className="rounded-2xl bg-primary/10 p-4 text-sm leading-7 text-foreground/80">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
