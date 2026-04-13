import Link from 'next/link';
import { ArrowRight, MessageSquare, Search, ShieldCheck, ShoppingBag, Store } from 'lucide-react';
import { faqSections } from '@/lib/site-data';

const icons = {
  Buying: ShoppingBag,
  Selling: Store,
  'Trust & Safety': ShieldCheck,
  Account: MessageSquare,
};

export default function FaqPage() {
  return (
    <div className="section-shell py-16">
      <section className="text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">How can we help?</h1>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-white/90 p-2 shadow-lift">
          <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
            <Search className="h-4 w-4 text-foreground/40" />
            <input className="w-full bg-transparent outline-none placeholder:text-foreground/40" placeholder="Search for answers, topics, or guides..." />
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        {faqSections.map((section) => {
          const Icon = icons[section.title as keyof typeof icons] ?? MessageSquare;
          return (
            <div key={section.title} className={`soft-card p-8 ${section.title === 'Trust & Safety' ? 'bg-primary text-primary-foreground' : ''}`}>
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${section.title === 'Trust & Safety' ? 'text-white' : 'text-primary'}`} />
                <h2 className="font-display text-3xl font-extrabold tracking-tight">{section.title}</h2>
              </div>
              <div className="mt-6 space-y-4">
                {section.questions.map((question) => (
                  <details key={question} className={`rounded-2xl ${section.title === 'Trust & Safety' ? 'bg-white/10' : 'bg-muted'} p-4`}>
                    <summary className="cursor-pointer list-none font-medium">{question}</summary>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">Answers appear here with policy-safe, buyer-friendly guidance and links to the relevant support articles.</p>
                  </details>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-16 soft-card grid gap-8 overflow-hidden p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="hero-kicker">Direct support</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance">Still have questions? Our community team is here.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">Whether you're a curious buyer or an aspiring producer, we typically respond within two hours during local business hours.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Chat with support <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#" className="inline-flex items-center rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground">
              Email us
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop" alt="Support team" />
        </div>
      </section>
    </div>
  );
}