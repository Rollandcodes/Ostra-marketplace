import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCmsBlogPosts } from '@/lib/cms-content';
import { normalizeLocale } from '@/lib/i18n';

export default async function BlogPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = normalizeLocale(Array.isArray(searchParams?.lang) ? searchParams?.lang[0] : searchParams?.lang);
  const blogPosts = await getCmsBlogPosts();
  const featuredPost = blogPosts.find((post) => post.is_featured) ?? blogPosts[0];

  return (
    <div className="section-shell py-16">
      <section className="soft-card grid gap-8 overflow-hidden p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="hero-kicker">Featured editorial</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-balance">{featuredPost?.title[locale] ?? 'The Soil&apos;s Secret: Reviving Ancient Grains.'}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{featuredPost?.excerpt[locale] ?? 'A new generation of agrarians is looking back to move forward. Discover how heirloom seeds are healing the ecosystem and our tables.'}</p>
          <Link href="#stories" className="mt-6 inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
            Read full story <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-[2rem]">
          {featuredPost ? <Image src={featuredPost.image} alt={featuredPost.title[locale]} width={1600} height={1200} className="h-full w-full object-cover" /> : null}
        </div>
      </section>

      <section id="stories" className="mt-16 grid gap-6 lg:grid-cols-2">
        {blogPosts.length === 0 ? (
          <div className="soft-card p-8 lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">No articles yet</p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">Editorial content will appear here once CMS entries are published.</h2>
            <p className="mt-2 text-sm text-muted-foreground">Add rows to `cms_blog_posts` in Supabase to populate this page.</p>
          </div>
        ) : blogPosts.map((post) => (
          <article key={post.slug} className="soft-card overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image src={post.image} alt={post.title[locale]} fill className="object-cover" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.category}</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight">{post.title[locale]}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt[locale]}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{post.date}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 soft-card p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="hero-kicker">The Ostra journal</p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance">Stories from the soil, delivered weekly.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Join 15,000+ conscious consumers and get curated editorials on sustainable living and artisan mastery.</p>
          </div>
          <form className="flex gap-3">
            <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Enter your email" />
            <button className="inline-flex items-center rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}