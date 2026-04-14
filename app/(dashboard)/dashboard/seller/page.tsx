import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, PlusCircle, Search, ShieldCheck, MessageSquare } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { AnalyticsChart } from '@/components/dashboard/analytics-chart';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Sidebar } from '@/components/layout/sidebar';
import { getCurrentOwnerContext } from '@/lib/clerk-ownership';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function SellerDashboardPage() {
  const [user, ownerContext] = await Promise.all([currentUser(), getCurrentOwnerContext()]);
  const listings = await getMarketplaceListings();
  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const featuredCount = listings.filter((listing) => listing.isFeatured).length;
  const sellerName = user?.fullName ?? user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? 'Your Seller Profile';
  const memberSince = user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear();

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/seller" mode="seller" title={sellerName} subtitle="Verified seller" canManageCms={ownerContext.isOwner} />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Seller Hub</p>
            <h1 id="overview" className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">My Inventory</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Manage your listings, visibility, and buyer inquiries from one place.</p>
          </div>
          <Link href="/listings" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Listing
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard label="Total Listings" value={String(listings.length)} delta="Live inventory" />
          <StatsCard label="Total Views" value={totalViews.toLocaleString()} delta="Audience reach" />
          <StatsCard label="Featured Listings" value={String(featuredCount)} delta="Boosted placement" />
          <StatsCard label="Unread Messages" value="0" delta="Connect inbox to enable" tone="secondary" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div id="inventory" className="soft-card overflow-hidden">
            <div className="border-b border-black/5 px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold tracking-tight">Inventory</h2>
                  <p className="text-sm text-muted-foreground">Mark listings as sold, paused, or featured.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-foreground/70">
                  <Search className="h-4 w-4" /> Search inventory...
                </div>
              </div>
            </div>
            <div className="divide-y divide-black/5">
              {listings.slice(0, 6).map((listing) => (
                <div key={listing.id} className="grid gap-4 px-6 py-5 md:grid-cols-[1.4fr_0.7fr_0.6fr_0.8fr_auto] md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                      <Image src={listing.images[0]} alt={listing.title.en} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold">{listing.title.en}</p>
                      <p className="text-xs text-muted-foreground">SKU: OSTRA-{listing.id.slice(0, 6).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{listing.category}</div>
                  <div className="font-semibold text-primary">{listing.price.toLocaleString('en-US', { style: 'currency', currency: listing.currency, maximumFractionDigits: listing.price % 1 ? 2 : 0 })}</div>
                  <div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${listing.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-foreground/60'}`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-start md:justify-end">
                    <Link href={`/listings/${listing.id}`} className="rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground/70">View</Link>
                    <Link href={`mailto:support@ostra.marketplace?subject=Update%20Listing%20${listing.id}`} className="rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground/70">Edit</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AnalyticsChart />
            <div id="messages" className="soft-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Inbox</p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Unread messages</h2>
                </div>
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <p className="font-semibold">Inbox integration ready</p>
                  <p className="mt-1 text-sm text-muted-foreground">Connect Supabase messages to see real buyer conversations here.</p>
                </div>
                <div className="rounded-2xl bg-muted p-4">
                  <p className="font-semibold">Need custom workflows?</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add automated responses for FAQs and shipping questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="analytics" className="mt-8 soft-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Promotion</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Your organic goods are in demand this week</h2>
            </div>
            <Link href="/dashboard/seller/trends" className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
              Analyze Market Trends <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Listings with strong product photos and clear origin stories continue to earn the most attention across the marketplace.</p>
        </section>

        <section id="profile" className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="soft-card p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <Image src={listings[0]?.seller.avatar ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop'} alt={listings[0]?.seller.name ?? 'Seller avatar'} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Profile</p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{sellerName}</h2>
                <p className="mt-1 text-sm text-muted-foreground">Protected storefront, verified local seller, and community-first shipping options.</p>
              </div>
            </div>
          </div>
          <div className="soft-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Trust</p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-muted p-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">Verified seller since {memberSince}</p>
                <p className="text-sm text-muted-foreground">Your account is linked to identity and payout verification.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}