import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, ChevronRight, MapPin, Search, Sprout } from 'lucide-react';
import { normalizeLocale, type Locale, t } from '@/lib/i18n';
import { ListingCard } from '@/components/listings/listing-card';
import { getMarketplaceCategories, getMarketplaceListings } from '@/lib/marketplace';

function getLocale(searchParams?: Record<string, string | string[] | undefined>) {
  const value = searchParams?.lang;
  return normalizeLocale(Array.isArray(value) ? value[0] : value);
}

export default async function HomePage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = getLocale(searchParams);
  const [categories, listings] = await Promise.all([getMarketplaceCategories(), getMarketplaceListings()]);
  const featuredListings = listings.filter((listing) => listing.isFeatured).slice(0, 3);
  const heroListing = featuredListings[0] ?? listings[0] ?? null;

  return (
    <div className="overflow-hidden">
      <section className="section-shell grid gap-12 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="space-y-8">
          <div className="hero-kicker">Our mission</div>
          <div className="space-y-4">
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-balance md:text-7xl">
              Buy & sell locally.
              <span className="block text-primary">No fees. No fuss.</span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              {t('heroTagline', locale)}
            </p>
          </div>

          <form action="/listings" className="soft-card flex flex-col gap-3 p-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
              <Search className="h-4 w-4 text-foreground/40" />
              <input name="q" className="w-full bg-transparent outline-none placeholder:text-foreground/40" placeholder="What are you looking for?" />
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-muted px-4 py-3">
              <MapPin className="h-4 w-4 text-foreground/40" />
              <input name="location" className="w-full bg-transparent outline-none placeholder:text-foreground/40" placeholder="Turkey, Cyprus" />
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90">
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="inline-flex items-center rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-soft transition hover:opacity-90">
              Become a Member
            </Link>
            <Link href="/about" className="inline-flex items-center rounded-xl bg-black/5 px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-black/10">
              Our Charter
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
          <div className="soft-card relative overflow-hidden p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              {heroListing ? (
                <Image src={heroListing.images[0]} alt={heroListing.title[locale as Locale]} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              ) : null}
              <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] bg-white/90 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <BadgeCheck className="h-4 w-4" /> Certified Local
                </div>
                <p className="mt-2 text-lg font-display font-extrabold tracking-tight">{heroListing?.title[locale as Locale] ?? 'No featured listings yet'}</p>
                <p className="text-sm text-muted-foreground">{heroListing ? `${heroListing.seller.name} · ${heroListing.city}, ${heroListing.region}` : 'Create your first listing from the seller dashboard.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="section-shell space-y-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="hero-kicker">Explore</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">Categories</h2>
            </div>
            <Link href="/listings" className="hidden items-center gap-2 text-sm font-semibold text-primary md:inline-flex">
              View all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/listings?category=${category.slug}`} className="soft-card flex flex-col items-center gap-3 p-6 text-center transition hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Sprout className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="hero-kicker">Featured</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">Featured near you</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">A curated selection of the best local finds today.</p>
          </div>
          <Link href="/listings" className="hidden items-center gap-2 text-sm font-semibold text-primary md:inline-flex">
            Browse all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} locale={locale as Locale} />
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="soft-card overflow-hidden p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Meet the makers</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {listings.slice(0, 2).map((listing) => (
                <div key={listing.id} className="overflow-hidden rounded-[1.5rem] bg-muted/50">
                  <div className="relative aspect-[4/3]">
                    <Image src={listing.images[0]} alt={listing.title[locale as Locale]} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-primary">{listing.seller.name}</p>
                    <h3 className="mt-1 font-display text-xl font-extrabold tracking-tight">{listing.title[locale as Locale]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{listing.description[locale as Locale]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-card flex flex-col justify-between bg-primary p-8 text-primary-foreground">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Join the movement</p>
              <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-balance">The Modern Agrarian Marketplace</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/85">Whether you are a producer, buyer, or local curator, Ostra gives your community a place to trade with clarity and trust.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary">
                Become a Member
              </Link>
              <Link href="/dashboard/seller" className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white">
                Register as a Producer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}