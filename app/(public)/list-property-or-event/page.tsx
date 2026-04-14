import Link from 'next/link';

export default function ListPropertyOrEventPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-4xl">
        <p className="hero-kicker">Create listing</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">List your local treasure.</h1>
        <p className="mt-4 text-muted-foreground">Choose what you want to publish and jump into the right workflow.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link href="/dashboard/seller/new-listing" className="soft-card p-8 hover:shadow-lift">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Real estate and hospitality</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">List a Property</h2>
            <p className="mt-3 text-sm text-muted-foreground">Homes, stays, boutique venues, and coastal spaces.</p>
          </Link>
          <Link href="/dashboard/seller/new-listing" className="soft-card p-8 hover:shadow-lift">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Community and culture</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">List an Event</h2>
            <p className="mt-3 text-sm text-muted-foreground">Festivals, workshops, and local experience listings.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
