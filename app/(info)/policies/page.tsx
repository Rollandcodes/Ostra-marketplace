import Link from 'next/link';
import { Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { policySections } from '@/lib/site-data';

export default function PoliciesPage() {
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
            <Link key={section.title} href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`} className="soft-card block px-5 py-4 text-sm font-semibold text-foreground/80 transition hover:text-primary">
              {section.title}
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
          {policySections.map((section) => (
            <article key={section.title} id={section.title.toLowerCase().replace(/\s+/g, '-')} className="soft-card p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight">{section.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Effective Date: {section.updated}</p>
                </div>
                <span className="rounded-full bg-muted px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">PDF</span>
              </div>

              <div className="mt-8 space-y-4">
                {section.points.map((point, index) => (
                  <div key={point} className={`rounded-2xl p-5 ${index === 1 ? 'bg-primary/10' : 'bg-muted'}`}>
                    <p className="text-sm leading-7 text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6 text-sm text-muted-foreground">
                <span>Was this clear?</span>
                <div className="flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-semibold"><ThumbsUp className="h-4 w-4" /> Helpful</button>
                  <button className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 font-semibold"><ThumbsDown className="h-4 w-4" /> Needs work</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}