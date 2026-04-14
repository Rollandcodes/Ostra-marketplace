import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, EllipsisVertical, PhoneCall, Search, Send } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import { getMarketplaceListings } from '@/lib/marketplace';

export default async function InboxPage() {
  const listings = await getMarketplaceListings();
  const threads = listings.slice(0, 5).map((listing, index) => ({
    id: listing.id,
    title: listing.title.en,
    seller: listing.seller.name,
    avatar: listing.seller.avatar,
    excerpt: index === 0 ? 'I can pick up this afternoon if the produce is still available.' : 'Could you share the latest harvest date and bundle options?',
    time: index === 0 ? '2m ago' : 'Today',
    unread: index < 2,
  }));

  const activeThread = threads[0];

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard" mode="buyer" title="Inbox" subtitle="Separate conversation view" />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Messages</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Inbox</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Keep all buyer and seller conversations in one dedicated place, separate from the dashboard summary cards.</p>
          </div>
          <Link href="/dashboard/seller" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            Back to dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <aside className="soft-card overflow-hidden">
            <div className="border-b border-black/5 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm text-foreground/70">
                <Search className="h-4 w-4" />
                <input className="w-full bg-transparent outline-none placeholder:text-foreground/40" placeholder="Search conversations" />
              </div>
            </div>
            <div className="divide-y divide-black/5">
              {threads.map((thread) => (
                <Link key={thread.id} href={`/listings/${thread.id}`} className={`flex items-center gap-4 p-4 transition hover:bg-muted/70 ${thread.id === activeThread?.id ? 'bg-primary/5' : ''}`}>
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image src={thread.avatar} alt={thread.seller} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <p className="truncate font-semibold">{thread.seller}</p>
                      <span className="text-xs text-muted-foreground">{thread.time}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{thread.title}</p>
                    <p className="truncate text-sm text-foreground/70">{thread.excerpt}</p>
                  </div>
                  {thread.unread ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                </Link>
              ))}
            </div>
          </aside>

          <section className="soft-card flex min-h-[720px] flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-black/5 p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={activeThread?.avatar ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop'} alt={activeThread?.seller ?? 'Seller'} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{activeThread?.seller ?? 'No active conversation'}</p>
                  <p className="text-sm text-muted-foreground">{activeThread?.title ?? 'Messages will appear here when you contact a seller'}</p>
                </div>
              </div>
              <button type="button" aria-label="Conversation options" className="rounded-full bg-muted p-2 text-foreground/60">
                <EllipsisVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 p-5">
              <div className="max-w-xl rounded-[1.5rem] rounded-tl-md bg-muted p-4">
                <p className="text-sm leading-7 text-foreground/80">Thanks for reaching out. The harvest is fresh and the listing is still active. I can confirm pickup windows, bundle options, and delivery estimates here.</p>
              </div>
              <div className="ml-auto max-w-xl rounded-[1.5rem] rounded-tr-md bg-primary p-4 text-primary-foreground">
                <p className="text-sm leading-7">Great. Please hold the order until 5 PM. I’ll confirm by phone if needed.</p>
              </div>
              <div className="max-w-xl rounded-[1.5rem] rounded-tl-md bg-muted p-4">
                <p className="text-sm leading-7 text-foreground/80">Understood. You can also open the listing page to view seller contact options or jump to the map.</p>
              </div>
            </div>

            <div className="border-t border-black/5 p-4">
              <div className="flex flex-col gap-3 rounded-[1.5rem] bg-muted p-3 md:flex-row md:items-center">
                <input className="min-w-0 flex-1 bg-transparent px-2 py-2 outline-none placeholder:text-foreground/40" placeholder="Write a reply..." />
                <div className="flex items-center gap-2">
                  <Link href={`/listings/${activeThread?.id ?? ''}`} className="inline-flex items-center rounded-xl bg-white px-4 py-3 text-sm font-semibold">
                    Open listing
                  </Link>
                  <a href="mailto:support@ostra.marketplace" className="inline-flex items-center rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">
                    <PhoneCall className="mr-2 h-4 w-4" /> Contact support
                  </a>
                  <button type="button" className="inline-flex items-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
                    <Send className="mr-2 h-4 w-4" /> Send
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
