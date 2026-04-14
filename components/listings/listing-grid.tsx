import type { MarketplaceListing } from '@/lib/marketplace';
import type { Locale } from '@/lib/i18n';
import { ListingCard } from './listing-card';

export function ListingGrid({ listings, locale }: { listings: MarketplaceListing[]; locale: Locale }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} locale={locale} />
      ))}
    </div>
  );
}