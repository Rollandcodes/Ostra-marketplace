"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
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
                  {t(link.labelKey as Parameters<typeof t>[0], locale)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm text-foreground/70">
            <Search className="h-4 w-4" />
            <input className="w-48 bg-transparent outline-none placeholder:text-foreground/40" placeholder="Search marketplace..." />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/80"
            onClick={() => updateQuery('region', regions[(regions.indexOf(searchParams.get('region') ?? regions[0]) + 1) % regions.length])}
          >
            <MapPin className="h-4 w-4" />
            {searchParams.get('region') ?? regions[0]}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/80"
            onClick={() => {
              const next = locales[(locales.findIndex((item) => item.value === locale) + 1) % locales.length] as { value: Locale };
              setLocale(next.value);
            }}
          >
            <Globe2 className="h-4 w-4" />
            {locales.find((item) => item.value === locale)?.label}
          </button>
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

        <button className="inline-flex items-center rounded-full bg-muted p-2 lg:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}