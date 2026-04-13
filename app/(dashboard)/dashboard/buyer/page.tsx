import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, MessageSquare } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { ListingCard } from '@/components/listings/listing-card';
import { buyerStats, listings } from '@/lib/site-data';
import { normalizeLocale } from '@/lib/i18n';

export default function BuyerDashboardPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = normalizeLocale(Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang);
  const saved = listings.slice(1, 4);

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/buyer" mode="buyer" title="Buyer Hub" subtitle="Local & curated" />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Buyer Hub</p>
            <h1 id="overview" className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Welcome back, Alex!</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Your local network is growing. There are new listings in your area since yesterday.</p>
          </div>
          <Link href="/listings" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            Start shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {buyerStats.map((stat) => (
            <div key={stat.label} className="soft-card p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div id="saved" className="space-y-6">
            <div className="soft-card overflow-hidden p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Recently viewed</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Pick up where you left off</h2>
                </div>
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-muted">
                <div className="relative aspect-[16/9]">
                  <Image src={saved[0].images[0]} alt={saved[0].title.en} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight">{saved[0].title[locale]}</h3>
                      <p className="text-sm text-muted-foreground">{saved[0].description[locale]}</p>
                    </div>
                    <p className="font-display text-2xl font-extrabold text-primary">{saved[0].price.toLocaleString('en-US', { style: 'currency', currency: saved[0].currency, maximumFractionDigits: saved[0].price % 1 ? 2 : 0 })}</p>
                  </div>
                  <Link href={`/listings/${saved[0].id}`} className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    View details
                  </Link>
                </div>
              </div>
            </div>

            <div id="messages" className="soft-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Messages</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Conversation inbox</h2>
                </div>
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <p className="font-semibold">Green Valley Farm</p>
                  <p className="mt-1 text-sm text-muted-foreground">Fresh eggs are ready for pickup tomorrow at 10 AM.</p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <p className="font-semibold">The Honey Jar</p>
                  <p className="mt-1 text-sm text-muted-foreground">They confirmed the honey is raw and never heat treated.</p>
                </div>
              </div>
            </div>
          </div>

          <div id="profile" className="space-y-6">
            <div className="soft-card p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image src={saved[0].seller.avatar} alt={saved[0].seller.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Profile</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Alex Morgan</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-2xl bg-muted p-4">Buyer's profile, saved items, and delivery preferences live here.</div>
                <div className="rounded-2xl bg-muted p-4">Use the dashboard to compare listings and revisit conversations quickly.</div>
              </div>
            </div>

            <div className="soft-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Saved listings</p>
              <div className="mt-5 space-y-4">
                {saved.map((listing) => (
                  <div key={listing.id} className="flex items-center gap-4 rounded-2xl bg-muted p-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                      <Image src={listing.images[0]} alt={listing.title[locale]} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{listing.title[locale]}</p>
                      <p className="text-sm text-muted-foreground">{listing.city}, {listing.region}</p>
                    </div>
                    <p className="font-semibold text-primary">{listing.price.toLocaleString('en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: listing.price % 1 ? 2 : 0 })}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-6 xl:grid-cols-4">
          {saved.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale} />
          ))}
          <div className="soft-card flex flex-col justify-between bg-secondary p-6 text-secondary-foreground">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Merchant spotlight</p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Green Valley Micro-Farms</h3>
            </div>
            <Link href="/listings" className="inline-flex items-center rounded-xl bg-white/95 px-4 py-2 text-sm font-semibold text-secondary">
              Explore shop
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}