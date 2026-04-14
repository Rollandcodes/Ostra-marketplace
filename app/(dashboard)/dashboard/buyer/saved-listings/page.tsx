import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Heart } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { normalizeLocale } from '@/lib/i18n';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function BuyerSavedListingsPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = normalizeLocale(Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang);
  const listings = await getMarketplaceListings();
  const saved = listings.slice(0, 9);

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/buyer" mode="buyer" title="Buyer Hub" subtitle="Saved listings" />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Collection</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">My Saved Listings</h1>
            <p className="mt-2 text-muted-foreground">Your curated shortlist from across the Ostra marketplace.</p>
          </div>
          <Link href="/dashboard/buyer" className="inline-flex items-center rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground/80">
            Back to buyer overview
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Total saved</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{saved.length}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Bookmark className="h-4 w-4" /> Curated list</p>
          </div>
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Favorites this week</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{Math.min(4, saved.length)}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"><Heart className="h-4 w-4" /> Updated</p>
          </div>
          <div className="soft-card p-6">
            <p className="text-sm text-muted-foreground">Categories tracked</p>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{new Set(saved.map((item) => item.category)).size}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Signals on</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((listing) => (
            <article key={listing.id} className="soft-card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={listing.images[0]} alt={listing.title[locale]} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{listing.categoryName}</p>
                <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight">{listing.title[locale]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{listing.city}, {listing.region}</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="font-semibold text-primary">{listing.price.toLocaleString('en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: listing.price % 1 ? 2 : 0 })}</span>
                  <Link href={`/listings/${listing.id}`} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">View</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
