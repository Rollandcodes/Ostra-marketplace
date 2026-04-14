"use client";

import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bookmark, MessageSquare, UserRound, Package, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const buyerItems = [
  { href: '#overview', label: 'Overview', icon: LayoutDashboard },
  { href: '#saved', label: 'Saved Listings', icon: Bookmark },
  { href: '/dashboard/inbox', label: 'Messages', icon: MessageSquare },
  { href: '#profile', label: 'Profile', icon: UserRound },
];

const sellerItems = [
  { href: '#overview', label: 'Overview', icon: LayoutDashboard },
  { href: '#inventory', label: 'Inventory', icon: Package },
  { href: '#analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/inbox', label: 'Messages', icon: MessageSquare },
  { href: '#profile', label: 'Profile', icon: UserRound },
];

export function Sidebar({ baseHref, mode, title, subtitle, canManageCms = false }: { baseHref: string; mode: 'buyer' | 'seller'; title: string; subtitle: string; canManageCms?: boolean }) {
  const pathname = usePathname();
  const items = mode === 'buyer' ? buyerItems : canManageCms ? [...sellerItems, { href: '/dashboard/seller/cms', label: 'CMS Editor', icon: LayoutDashboard }] : sellerItems;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-black/5 bg-white/90 px-5 py-6 lg:flex lg:flex-col">
      <div className="mb-8">
        <p className="font-display text-lg font-extrabold text-primary">Ostra Marketplace</p>
        <div className="mt-4 rounded-2xl bg-muted p-4">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = item.href.startsWith('/') ? pathname === item.href : pathname === baseHref && item.href === '#overview';
          const Icon = item.icon;
          return (
            <Link
              key={`${baseHref}${item.href}`}
              href={item.href.startsWith('/') ? item.href : `${baseHref}${item.href}`}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                active ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-primary/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Need help?</p>
        <p className="mt-2 text-sm text-foreground/70">Support is available during local business hours.</p>
        <SignOutButton>
          <button type="button" className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}