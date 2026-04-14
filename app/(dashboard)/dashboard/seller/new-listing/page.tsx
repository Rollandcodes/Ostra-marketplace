import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { currentUser } from '@clerk/nextjs/server';
import { getCurrentOwnerContext } from '@/lib/clerk-ownership';

export default async function SellerNewListingPage() {
  const [user, ownerContext] = await Promise.all([currentUser(), getCurrentOwnerContext()]);
  const sellerName = user?.fullName ?? user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? 'Seller';

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/seller" mode="seller" title={sellerName} subtitle="Create a listing" canManageCms={ownerContext.isOwner} />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="hero-kicker">Seller Studio</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">Create New Listing</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Publish products, properties, or events with strong photos and clear details.</p>
          </div>
          <Link href="/dashboard/seller" className="inline-flex items-center rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground/80">
            Back to seller hub
          </Link>
        </div>

        <form className="mt-8 space-y-6">
          <section className="soft-card p-6">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Listing essentials</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl bg-muted px-4 py-3 text-sm" placeholder="Listing title" />
              <select aria-label="Listing category" className="rounded-xl bg-muted px-4 py-3 text-sm">
                <option>Category</option>
                <option>Produce</option>
                <option>Property</option>
                <option>Event</option>
              </select>
              <input className="rounded-xl bg-muted px-4 py-3 text-sm" placeholder="Price or entry fee" />
              <input className="rounded-xl bg-muted px-4 py-3 text-sm" placeholder="City / location" />
              <textarea className="min-h-36 rounded-xl bg-muted px-4 py-3 text-sm md:col-span-2" placeholder="Description" />
            </div>
          </section>

          <section className="soft-card p-6">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Photos</h2>
            <div className="mt-5 rounded-2xl border border-dashed border-black/10 bg-muted/50 p-8 text-center text-sm text-muted-foreground">
              Add up to 8 images. Drag and drop support can be connected here.
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground/80">Save draft</button>
            <button type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Publish listing</button>
          </div>
        </form>
      </div>
    </div>
  );
}
