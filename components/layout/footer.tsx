"use client";

import Link from 'next/link';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { useLocale } from '@/components/providers';
import { t } from '@/lib/i18n';

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="mt-24 border-t border-black/5 bg-white/85">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="font-display text-lg font-extrabold text-primary">
            Ostra Marketplace
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Buy and sell locally across Turkey, Northern Cyprus, and South Cyprus with a design-forward agrarian marketplace.
          </p>
          <div className="flex items-center gap-3 text-foreground/60">
            <Instagram className="h-4 w-4" />
            <Facebook className="h-4 w-4" />
            <Linkedin className="h-4 w-4" />
            <Mail className="h-4 w-4" />
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Marketplace</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/listings">{t('marketplace', locale)}</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Stories</Link></li>
            <li><Link href="/policies">Policies</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Support</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/policies">Contact</Link></li>
            <li><Link href="/signup">Join Ostra</Link></li>
          </ul>
        </div>

        <div className="soft-card p-6">
          <p className="text-sm font-semibold text-foreground">Stay updated</p>
          <p className="mt-2 text-sm text-muted-foreground">Get featured listings, editorial stories, and policy updates.</p>
          <div className="mt-4 flex gap-2">
            <input className="w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none placeholder:text-foreground/40" placeholder="Email address" aria-label="Email address" />
            <button aria-label="Subscribe to newsletter" title="Subscribe to newsletter" className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
              <span>Subscribe</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="section-shell flex flex-col gap-3 border-t border-black/5 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© 2026 Ostra Marketplace. The Modern Agrarian.</p>
        <p>Built for local commerce across the eastern Mediterranean.</p>
      </div>
    </footer>
  );
}