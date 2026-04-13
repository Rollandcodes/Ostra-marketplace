import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, MapPinned, ShieldCheck, Users } from 'lucide-react';

const values = [
  { title: 'Zero-Fee Philosophy', description: 'We keep the platform light so local producers keep more of every sale.', icon: Leaf, tone: 'primary' },
  { title: 'Traceable Roots', description: 'Every listing carries origin, seller, and delivery context.', icon: MapPinned, tone: 'secondary' },
  { title: 'Radical Community', description: 'Community first interactions are built into the marketplace flow.', icon: Users, tone: 'muted' },
  { title: 'Trust & Safety', description: 'Identity verification and respectful reporting keep the ecosystem healthy.', icon: ShieldCheck, tone: 'primary' },
];

export default function AboutPage() {
  return (
    <div className="section-shell py-16">
      <section className="soft-card grid gap-10 overflow-hidden p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="hero-kicker">Established 2024</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-extrabold tracking-tight text-balance">The Modern Agrarian.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Ostra is a digital sanctuary connecting the heritage of Turkey and Cyprus with the curiosity of the modern table.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/listings" className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              Explore the harvest
            </Link>
            <Link href="/policies" className="inline-flex items-center rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground">
              Our charter <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem]">
          <Image src="https://images.unsplash.com/photo-1506617420156-8e4536971650?w=1600&q=80&auto=format&fit=crop" alt="Market produce" width={1600} height={1200} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="soft-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Our story</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight">It began in the winding alleys of Nicosia and the orchards of Mersin.</h2>
          <p className="mt-4 text-muted-foreground">Ostra was born from a simple realization: the soul of our region lives in our markets. We built a bridge that bypasses the middleman and supports the people growing our food and making our goods.</p>
        </div>
        <div className="soft-card grid gap-4 p-8 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-[1.5rem] bg-muted p-5">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}