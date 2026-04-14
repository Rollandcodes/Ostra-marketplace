import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Eye, MessageSquare } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { ListingCard } from '@/components/listings/listing-card';
import { normalizeLocale } from '@/lib/i18n';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function BuyerDashboardPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = normalizeLocale(Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang);
  const listings = await getMarketplaceListings();
  const saved = listings.slice(0, 4);

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/buyer" mode="buyer" title="Buyer Hub" subtitle="Local & curated" />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Buyer Hub</p>
            <h1 id="overview" className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Welcome back!</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Browse live listings, revisit saved items, and continue conversations with sellers in the dedicated inbox.</p>
          </div>
          <Link href="/listings" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            Start shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Saved Listings</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{saved.length}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ready to compare</p>
          </div>
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Unread Messages</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">0</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Connect inbox to enable</p>
          </div>
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Recently Viewed</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{Math.min(saved.length, 5)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Synced live</p>
          </div>
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
                  <Image src={saved[0]?.images[0] ?? 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80&auto=format&fit=crop'} alt={saved[0]?.title.en ?? 'Listing'} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight">{saved[0]?.title[locale] ?? 'No saved listings yet'}</h3>
                      <p className="text-sm text-muted-foreground">{saved[0]?.description[locale] ?? 'Your recently viewed items will appear here.'}</p>
                    </div>
                    <p className="font-display text-2xl font-extrabold text-primary">{saved[0] ? saved[0].price.toLocaleString('en-US', { style: 'currency', currency: saved[0].currency, maximumFractionDigits: saved[0].price % 1 ? 2 : 0 }) : '-'}</p>
                  </div>
                  <Link href={saved[0] ? `/listings/${saved[0].id}` : '/listings'} className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
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
                  <p className="font-semibold">Inbox integration ready</p>
                  <p className="mt-1 text-sm text-muted-foreground">Real conversations appear here after Supabase message sync is enabled.</p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <p className="font-semibold">Need product details?</p>
                  <p className="mt-1 text-sm text-muted-foreground">Use each listing page to contact the seller directly by email or WhatsApp.</p>
                </div>
                <Link href="/dashboard/inbox" className="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  Open inbox
                </Link>
              </div>
            </div>
          </div>

          <div id="profile" className="space-y-6">
            <div className="soft-card p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <Image src={saved[0]?.seller.avatar ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop'} alt={saved[0]?.seller.name ?? 'Buyer avatar'} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Profile</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Buyer Profile</h2>
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