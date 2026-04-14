import Image from 'next/image';
import Link from 'next/link';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function EventsDiscoveryPage() {
  const listings = await getMarketplaceListings({ category: 'events' });
  const items = listings.length > 0 ? listings : (await getMarketplaceListings()).slice(0, 6);

  return (
    <div className="section-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="hero-kicker">Events discovery</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Discover the pulse of local life.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Find festivals, workshops, and community gatherings across Turkey and Cyprus.</p>
        </div>
        <div className="soft-card p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Explore by type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Festivals', 'Beach parties', 'Workshops', 'Food and wine'].map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-3 py-2 text-xs font-semibold">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="soft-card overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image src={item.images[0]} alt={item.title.en} fill className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{item.categoryName}</p>
              <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight">{item.title.en}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.city}, {item.region}</p>
              <Link href={`/listings/${item.id}`} className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">View details</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
