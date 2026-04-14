import Link from 'next/link';
import { Building2, CalendarDays, ArrowRight } from 'lucide-react';

export default function ListPropertyOrEventPage() {
  return (
    <div className="section-shell py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="hero-kicker">Create listing</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">List your local treasure.</h1>
        <p className="mt-4 text-muted-foreground">Choose what you want to publish and jump into the right workflow.</p>

        <div className="mt-8 md:mt-10 grid gap-5 md:gap-6 md:grid-cols-2">
          <Link href="/dashboard/seller/new-listing" className="soft-card reveal-up reveal-delay-1 hover-lift-subtle p-6 md:p-8 hover:shadow-lift">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Real estate and hospitality</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">List a Property</h2>
            <p className="mt-3 text-sm text-muted-foreground">Homes, stays, boutique venues, and coastal spaces.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start now <ArrowRight className="h-4 w-4" /></span>
          </Link>
          <Link href="/dashboard/seller/new-listing" className="soft-card reveal-up reveal-delay-2 hover-lift-subtle p-6 md:p-8 hover:shadow-lift">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/10 text-secondary"><CalendarDays className="h-5 w-5" /></span>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Community and culture</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">List an Event</h2>
            <p className="mt-3 text-sm text-muted-foreground">Festivals, workshops, and local experience listings.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Start now <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
