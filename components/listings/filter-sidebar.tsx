"use client";

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type FilterCategory = { slug: string; name: string };

export function FilterSidebar({ categories }: { categories: FilterCategory[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
      category: searchParams.get('category') ?? 'all',
      condition: searchParams.get('condition') ?? 'all',
      location: searchParams.get('location') ?? 'Turkey, Cyprus',
      query: searchParams.get('q') ?? '',
    }),
    [searchParams],
  );

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="soft-card h-fit space-y-6 p-5 lg:sticky lg:top-24">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Filters</p>
        <input
          className="mt-3 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none placeholder:text-foreground/40"
          placeholder="Search Ostra..."
          value={filters.query}
          onChange={(event) => setFilter('q', event.target.value)}
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Location</p>
        <input
          className="mt-3 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none"
          aria-label="Listing location"
          placeholder="Turkey, Cyprus"
          value={filters.location}
          onChange={(event) => setFilter('location', event.target.value)}
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Category</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['all', ...categories.map((item) => item.slug)].map((category) => (
            <button
              key={category}
              className={cn(
                'rounded-full px-3 py-2 text-xs font-medium transition',
                filters.category === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70 hover:bg-black/5',
              )}
              onClick={() => setFilter('category', category)}
              type="button"
            >
              {category === 'all' ? 'All' : categories.find((item) => item.slug === category)?.name ?? category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">Condition</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {['all', 'New', 'Excellent', 'Fresh', 'Restored'].map((condition) => (
            <button
              key={condition}
              type="button"
              onClick={() => setFilter('condition', condition)}
              className={cn(
                'rounded-xl px-3 py-2 text-sm font-medium transition',
                filters.condition === condition ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-foreground/70 hover:bg-black/5',
              )}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}