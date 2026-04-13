import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MessageSquare, PhoneCall, Star, Tag, Heart } from 'lucide-react';
import { listings } from '@/lib/site-data';
import { normalizeLocale } from '@/lib/i18n';
import { ListingCard } from '@/components/listings/listing-card';

function getLocale(searchParams?: Record<string, string | string[] | undefined>) {
  const value = searchParams?.lang;
  return normalizeLocale(Array.isArray(value) ? value[0] : value);
}

export default function ListingDetailPage({ params, searchParams }: { params: { id: string }; searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = getLocale(searchParams);
  const listing = listings.find((item) => item.id === params.id);

  if (!listing) {
    notFound();
  }

  const similarListings = listings.filter((item) => item.id !== listing.id && item.category === listing.category).slice(0, 4);

  return (
    <div className="section-shell py-10 lg:py-16">
      <div className="mb-8 text-sm text-muted-foreground">
        <Link href="/listings" className="hover:text-primary">Marketplace</Link> <span className="mx-2">/</span> <span>{listing.category}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white shadow-lift">
            <Image src={listing.images[0]} alt={listing.title[locale]} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            <button aria-label="Save listing" title="Save listing" className="absolute right-5 top-5 rounded-full bg-white/90 p-3 text-foreground shadow-md backdrop-blur">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {listing.images.slice(0, 3).map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image src={image} alt={listing.title[locale]} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="soft-card p-6">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="rounded-full bg-muted px-3 py-1">{listing.condition}</span>
              <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 text-secondary" /> {listing.views.toLocaleString()} views</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance">{listing.title[locale]}</h1>
            <p className="mt-2 text-3xl font-extrabold text-primary">{listing.price.toLocaleString('en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: listing.price % 1 ? 2 : 0 })}</p>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">{listing.description[locale]}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-muted px-3 py-2 text-xs font-semibold text-foreground/70">
                  <Tag className="mr-2 h-3 w-3 text-primary" /> {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="soft-card flex items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <Image src={listing.seller.avatar} alt={listing.seller.name} width={56} height={56} className="rounded-full object-cover" />
              <div>
                <p className="font-semibold">{listing.seller.name}</p>
                <p className="text-sm text-muted-foreground">{listing.city}, {listing.region}</p>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Verified</span>
          </div>

          <div className="grid gap-3">
            <button className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-soft">
              <MessageSquare className="mr-2 h-4 w-4" /> Send Message
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center rounded-xl bg-muted px-5 py-4 font-semibold text-foreground">
                <PhoneCall className="mr-2 h-4 w-4" /> WhatsApp
              </button>
              <button className="inline-flex items-center justify-center rounded-xl bg-secondary px-5 py-4 font-semibold text-secondary-foreground">
                Email Seller
              </button>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-20 space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="hero-kicker">Similar listings</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">Hand-picked for the same category</h2>
          </div>
          <Link href="/listings" className="hidden items-center gap-2 text-sm font-semibold text-primary md:inline-flex">
            Browse more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {similarListings.map((item) => (
            <ListingCard key={item.id} listing={item} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}