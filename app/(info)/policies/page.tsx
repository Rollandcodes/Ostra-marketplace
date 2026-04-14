import Link from 'next/link';
import { Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getCmsPolicySections } from '@/lib/cms-content';
import { normalizeLocale } from '@/lib/i18n';

export default async function PoliciesPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = normalizeLocale(Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang);
  const policySections = await getCmsPolicySections();

  return (
    <div className="section-shell py-16">
      <section className="soft-card overflow-hidden p-8 lg:p-10">
        <p className="hero-kicker">Transparency & ethics</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold tracking-tight text-balance">Our Legal Framework & Community Standards.</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">We believe in fair trade, local growth, and absolute transparency. Here you&apos;ll find the guidelines that keep Ostra safe and equitable for all.</p>
      </section>

      <div className="mt-16 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-3">
          {policySections.map((section) => (
            <Link key={section.slug} href={`#${section.slug}`} className="soft-card block px-5 py-4 text-sm font-semibold text-foreground/80 transition hover:text-primary">
              {section.title[locale]}
            </Link>
          ))}
          <div className="soft-card bg-secondary/10 p-5">
            <p className="text-sm font-semibold text-secondary">Need clarification?</p>
            <p className="mt-2 text-sm text-muted-foreground">Our legal team is here to help you understand your rights.</p>
            <Link href="/faq" className="mt-4 inline-flex items-center text-sm font-semibold text-secondary">
              Contact support <Download className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </aside>

        <section className="space-y-8">
          {policySections.length === 0 ? (
            <div className="soft-card p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">No policy content yet</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Add policy sections and points in the CMS to publish this page.</h2>
              <p className="mt-2 text-sm text-muted-foreground">Populate `cms_policy_sections` and `cms_policy_points` in Supabase.</p>
            </div>
          ) : policySections.map((section) => (
            <article key={section.slug} id={section.slug} className="soft-card p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight">{section.title[locale]}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Effective Date: {section.updated}</p>
                </div>
                <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">PDF</span>
              </div>

              <div className="mt-8 space-y-4">
                {section.points.map((point, index) => (
                  <div key={`${section.slug}-${index}`} className={`rounded-2xl p-5 ${index === 1 ? 'bg-primary/10' : 'bg-muted'}`}>
                    <p className="text-sm leading-7 text-muted-foreground">{point[locale]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6 text-sm text-muted-foreground">
                <span>Was this clear?</span>
                <div className="flex items-center gap-4">
                  <Link href="mailto:legal@ostra.marketplace?subject=Policy%20Feedback%20Helpful" className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-semibold"><ThumbsUp className="h-4 w-4" /> Helpful</Link>
                  <Link href="mailto:legal@ostra.marketplace?subject=Policy%20Feedback%20Needs%20Work" className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-semibold"><ThumbsDown className="h-4 w-4" /> Needs work</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}