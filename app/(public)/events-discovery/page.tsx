import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Sparkles } from 'lucide-react';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function EventsDiscoveryPage() {
  const listings = await getMarketplaceListings({ category: 'events' });
  const items = listings.length > 0 ? listings : (await getMarketplaceListings()).slice(0, 6);

  return (
    <div className="section-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="hero-kicker">Events discovery</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Discover the pulse of local life.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">From beach parties in Kyrenia to harvest gatherings inland, discover upcoming experiences across Turkey and Cyprus.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Sparkles className="h-4 w-4" /> Curated events</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary"><CalendarDays className="h-4 w-4" /> This week</span>
          </div>
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

      {items[0] ? (
        <section className="mt-8 soft-card overflow-hidden p-5">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
              <Image src={items[0].images[0]} alt={items[0].title.en} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Featured event</p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white text-balance">{items[0].title.en}</h2>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/85"><MapPin className="h-4 w-4" /> {items[0].city}, {items[0].region}</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-muted p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Spotlight</p>
              <p className="mt-3 text-sm leading-7 text-foreground/80">Featured community events often convert better when listings include clear schedules, transport notes, and organizer contact details.</p>
              <Link href={`/listings/${items[0].id}`} className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Open event</Link>
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.slice(1).map((item) => (
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
