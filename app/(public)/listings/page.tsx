import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Filter, Search } from 'lucide-react';
import { FilterSidebar } from '@/components/listings/filter-sidebar';
import { ListingGrid } from '@/components/listings/listing-grid';
import { normalizeLocale } from '@/lib/i18n';
import { getMarketplaceCategories, getMarketplaceListings } from '@/lib/marketplace';

function getLocale(searchParams?: Record<string, string | string[] | undefined>) {
  const value = searchParams?.lang;
  return normalizeLocale(Array.isArray(value) ? value[0] : value);
}

export default async function ListingsPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = getLocale(searchParams);
  const category = typeof searchParams?.category === 'string' ? searchParams.category : 'all';
  const condition = typeof searchParams?.condition === 'string' ? searchParams.condition : 'all';
  const location = typeof searchParams?.location === 'string' ? searchParams.location : '';
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';
  const region = typeof searchParams?.region === 'string' ? searchParams.region : '';

  const [filtered, categories] = await Promise.all([
    getMarketplaceListings({ category, condition, location, query, region }),
    getMarketplaceCategories(),
  ]);

  return (
    <div className="section-shell py-10 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <Suspense fallback={<aside className="soft-card h-fit p-5 lg:sticky lg:top-24" />}>
          <FilterSidebar categories={categories.map((item) => ({ slug: item.slug, name: item.name }))} />
        </Suspense>

        <div className="space-y-8">
          <div className="soft-card overflow-hidden p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="hero-kicker">Merchants spotlight</p>
                <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Buy & sell locally. No fees. No fuss.</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Browse hyperlocal listings across the eastern Mediterranean, from artisanal food to furniture, property, events, and services.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/dashboard/seller" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
                    Start selling
                  </Link>
                  <Link href="/listings" className="inline-flex items-center rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground">
                    <Search className="mr-2 h-4 w-4" /> Search local listings
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-gradient-to-br from-secondary to-secondary/80 p-6 text-secondary-foreground shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Merchant spotlight</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Heritage Harvest Farms</h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/85">This week’s top-rated producer from Southern Cyprus with ethically grown produce and trusted shipping.</p>
                <Link href={filtered[0] ? `/listings/${filtered[0].id}` : '/listings'} className="mt-6 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-secondary">
                  View featured listing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Recent listings</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{filtered.length.toLocaleString()} results found</h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground/70 lg:hidden">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <ListingGrid listings={filtered} locale={locale} />
        </div>
      </div>
    </div>
  );
}