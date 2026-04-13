import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center lg:grid-cols-12">
      <section className="relative hidden overflow-hidden rounded-[2rem] lg:col-span-7 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1600&q=80&auto=format&fit=crop"
          alt="Greenhouse sunlight"
          width={1600}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <p className="hero-kicker border border-white/15 bg-white/10 text-white">The Modern Agrarian</p>
          <h1 className="mt-5 max-w-xl font-display text-5xl font-extrabold tracking-tight text-balance">Cultivating local commerce.</h1>
          <p className="mt-4 max-w-lg text-white/80">Join a boutique marketplace where craftsmanship meets the digital age. Authentically local, exceptionally curated.</p>
        </div>
      </section>

      <section className="soft-card lg:col-span-5 lg:-ml-10 p-8 md:p-12">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-extrabold text-primary">Ostra</Link>
          <button className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/70">
            <Globe2 className="h-4 w-4" /> EN
          </button>
        </div>
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Welcome back</h2>
        <p className="mt-2 text-muted-foreground">Enter your credentials to access your dashboard.</p>

        <form className="mt-8 space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground/70">Email</span>
            <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="name@example.com" type="email" />
          </label>
          <label className="block space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/70">Password</span>
              <Link href="#" className="text-sm font-medium text-secondary">Forgot Password?</Link>
            </div>
            <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="••••••••" type="password" />
          </label>
          <button className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-soft">
            Login to Ostra
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-sm text-muted-foreground">Or continue with</span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <button className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-4 font-semibold transition hover:bg-black/5">
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account yet? <Link href="/signup" className="font-semibold text-primary">Create Account <ArrowRight className="inline-block h-4 w-4" /></Link>
        </p>
      </section>
    </div>
  );
}