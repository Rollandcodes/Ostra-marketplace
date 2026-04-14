import { createClient } from '@supabase/supabase-js';
import type { Locale } from './i18n';

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
};

type ListingRow = {
  id: string;
  title: string;
  description: string;
  price: number;
  is_free: boolean;
  is_negotiable: boolean;
  condition: string;
  status: 'active' | 'sold' | 'paused';
  city: string | null;
  location: string | null;
  views: number;
  is_featured: boolean;
  images: string[] | null;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    whatsapp: string | null;
    email: string;
    is_verified: boolean;
  }[] | {
    full_name: string;
    avatar_url: string | null;
    phone: string | null;
    whatsapp: string | null;
    email: string;
    is_verified: boolean;
  } | null;
  categories: {
    slug: string;
    name: string;
  }[] | {
    slug: string;
    name: string;
  } | null;
};

export type MarketplaceCategory = {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
};

export type MarketplaceListing = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
  currency: string;
  category: string;
  categoryName: string;
  city: string;
  region: string;
  location: string;
  condition: string;
  status: 'active' | 'sold' | 'paused';
  isFeatured: boolean;
  isFree: boolean;
  isNegotiable: boolean;
  views: number;
  seller: {
    name: string;
    verified: boolean;
    avatar: string;
    email: string;
    phone: string | null;
    whatsapp: string | null;
  };
  images: string[];
  tags: string[];
  mapsQuery: string;
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80&auto=format&fit=crop';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return null;
  }

  return createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function toLocalizedText(value: string): Record<Locale, string> {
  return { en: value, tr: value, el: value, ru: value };
}

function mapListing(row: ListingRow): MarketplaceListing {
  const seller = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
  const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
  const city = row.city ?? '';
  const region = row.location ?? '';
  const location = [city, region].filter(Boolean).join(', ');

  return {
    id: row.id,
    title: toLocalizedText(row.title),
    description: toLocalizedText(row.description),
    price: Number(row.price ?? 0),
    currency: 'USD',
    category: category?.slug ?? 'uncategorized',
    categoryName: category?.name ?? 'Uncategorized',
    city,
    region,
    location,
    condition: row.condition,
    status: row.status,
    isFeatured: row.is_featured,
    isFree: row.is_free,
    isNegotiable: row.is_negotiable,
    views: row.views ?? 0,
    seller: {
      name: seller?.full_name ?? 'Marketplace Seller',
      verified: seller?.is_verified ?? false,
      avatar: seller?.avatar_url || FALLBACK_IMAGE,
      email: seller?.email ?? 'support@ostra.marketplace',
      phone: seller?.phone ?? null,
      whatsapp: seller?.whatsapp ?? null,
    },
    images: row.images && row.images.length > 0 ? row.images : [FALLBACK_IMAGE],
    tags: [category?.name ?? 'Local', row.condition].filter(Boolean),
    mapsQuery: encodeURIComponent(location || row.title),
  };
}

export async function getMarketplaceCategories(): Promise<MarketplaceCategory[]> {
  const client = getClient();
  if (!client) return [];

  const { data } = await client.from('categories').select('id, slug, name, icon').order('name', { ascending: true });
  return ((data as CategoryRow[] | null) ?? []).map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    icon: item.icon,
  }));
}

export async function getMarketplaceListings(filters?: {
  category?: string;
  condition?: string;
  location?: string;
  query?: string;
  region?: string;
}): Promise<MarketplaceListing[]> {
  const client = getClient();
  if (!client) return [];

  const { data } = await client
    .from('listings')
    .select(`
      id,
      title,
      description,
      price,
      is_free,
      is_negotiable,
      condition,
      status,
      city,
      location,
      views,
      is_featured,
      images,
      created_at,
      profiles:seller_id(full_name, avatar_url, phone, whatsapp, email, is_verified),
      categories:category_id(slug, name)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  const listings = ((data as ListingRow[] | null) ?? []).map(mapListing);

  return listings.filter((listing) => {
    const matchesCategory = !filters?.category || filters.category === 'all' || listing.category === filters.category;
    const matchesCondition = !filters?.condition || filters.condition === 'all' || listing.condition.toLowerCase() === filters.condition.toLowerCase();
    const matchesLocation = !filters?.location || listing.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesRegion = !filters?.region || listing.region.toLowerCase().includes(filters.region.toLowerCase());
    const query = filters?.query?.trim().toLowerCase();
    const matchesQuery = !query || listing.title.en.toLowerCase().includes(query) || listing.description.en.toLowerCase().includes(query) || listing.tags.join(' ').toLowerCase().includes(query);
    return matchesCategory && matchesCondition && matchesLocation && matchesRegion && matchesQuery;
  });
}

export async function getMarketplaceListingById(id: string): Promise<MarketplaceListing | null> {
  const client = getClient();
  if (!client) return null;

  const { data } = await client
    .from('listings')
    .select(`
      id,
      title,
      description,
      price,
      is_free,
      is_negotiable,
      condition,
      status,
      city,
      location,
      views,
      is_featured,
      images,
      created_at,
      profiles:seller_id(full_name, avatar_url, phone, whatsapp, email, is_verified),
      categories:category_id(slug, name)
    `)
    .eq('id', id)
    .eq('status', 'active')
    .maybeSingle();

  return data ? mapListing(data as ListingRow) : null;
}
