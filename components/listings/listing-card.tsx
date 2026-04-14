import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Star } from 'lucide-react';
import type { MarketplaceListing } from '@/lib/marketplace';
import type { Locale } from '@/lib/i18n';

export function ListingCard({ listing, locale, href = `/listings/${listing.id}` }: { listing: MarketplaceListing; locale: Locale; href?: string }) {
  const price = listing.isFree ? 'Free' : new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: listing.price % 1 ? 2 : 0 }).format(listing.price);

  return (
    <Link href={href} className="group overflow-hidden rounded-[1.75rem] bg-white shadow-lift transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={listing.images[0]} alt={listing.title[locale]} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <button type="button" aria-label="Save listing" title="Save listing" className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-foreground shadow-md backdrop-blur">
          <Heart className="h-4 w-4" />
        </button>
        {listing.isFeatured ? <div className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-foreground">Featured</div> : null}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{listing.condition}</p>
            <h3 className="line-clamp-2 font-display text-lg font-extrabold tracking-tight text-balance">{listing.title[locale]}</h3>
          </div>
          <p className="shrink-0 text-lg font-extrabold text-primary">{price}</p>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description[locale]}</p>
        <div className="flex items-center justify-between text-xs text-foreground/60">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {listing.city}, {listing.region}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-foreground/70">
            <Star className="h-3.5 w-3.5 text-secondary" />
            {listing.views.toLocaleString()} views
          </span>
        </div>
      </div>
    </Link>
  );
}