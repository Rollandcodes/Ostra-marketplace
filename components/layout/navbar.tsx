"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Globe2, MapPin, Search, CircleUserRound, Menu } from 'lucide-react';
import { locales, type Locale, t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers';

function Show({ when, children }: { when: 'signed-in' | 'signed-out'; children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (when === 'signed-in') {
    return isSignedIn ? <>{children}</> : null;
  }

  return isSignedIn ? null : <>{children}</>;
}

const navLinks = [
  { href: '/', labelKey: 'marketplace' },
  { href: '/dashboard/seller', labelKey: 'sell' },
  { href: '/list-property-or-event', label: 'List Property/Event' },
  { href: '/events-discovery', label: 'Events' },
  { href: '/property-hospitality', label: 'Properties' },
  { href: '/dashboard/seller', labelKey: 'dashboard' },
  { href: '/about', labelKey: 'stories' },
  { href: '/faq', labelKey: 'faq' },
];

const regions = ['Turkey', 'Northern Cyprus', 'South Cyprus'];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, setLocale } = useLocale();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
  }, [searchParams]);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set('q', search.trim());
    } else {
      params.delete('q');
    }
    router.push(`/listings?${params.toString()}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-2xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-primary">
            Ostra Marketplace
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition',
                    active ? 'text-primary underline decoration-primary decoration-2 underline-offset-8' : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  {link.label ?? t(link.labelKey as Parameters<typeof t>[0], locale)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm text-foreground/70">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-48 bg-transparent outline-none placeholder:text-foreground/40" placeholder="Search marketplace..." />
          </form>
          <label className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/80">
            <MapPin className="h-4 w-4" />
            <select
              aria-label="Select region"
              value={searchParams.get('region') ?? regions[0]}
              onChange={(event) => updateQuery('region', event.target.value)}
              className="bg-transparent outline-none"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <label className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/80">
            <Globe2 className="h-4 w-4" />
            <select
              aria-label="Select language"
              value={locale}
              onChange={(event) => {
                const next = event.target.value as Locale;
                setLocale(next);
                updateQuery('lang', next);
              }}
              className="bg-transparent outline-none"
            >
              {locales.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.region}
                </option>
              ))}
            </select>
          </label>
          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90">
                  <CircleUserRound className="h-4 w-4" />
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-soft transition hover:opacity-90">
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
        </div>

        <button onClick={() => setMobileOpen((value) => !value)} className="inline-flex items-center rounded-full bg-muted p-2 lg:hidden" aria-label="Menu" type="button">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {mobileOpen ? (
        <div className="section-shell space-y-4 border-t border-black/5 py-4 lg:hidden">
          <form onSubmit={submitSearch} className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm text-foreground/70">
            <Search className="h-4 w-4" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-transparent outline-none placeholder:text-foreground/40" placeholder="Search marketplace..." />
          </form>
          <div className="grid grid-cols-2 gap-3">
            <select
              aria-label="Select region"
              value={searchParams.get('region') ?? regions[0]}
              onChange={(event) => updateQuery('region', event.target.value)}
              className="rounded-xl bg-muted px-3 py-2 text-sm"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              aria-label="Select language"
              value={locale}
              onChange={(event) => {
                const next = event.target.value as Locale;
                setLocale(next);
                updateQuery('lang', next);
              }}
              className="rounded-xl bg-muted px-3 py-2 text-sm"
            >
              {locales.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.region}
                </option>
              ))}
            </select>
          </div>
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl bg-muted px-4 py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
                {link.label ?? t(link.labelKey as Parameters<typeof t>[0], locale)}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}