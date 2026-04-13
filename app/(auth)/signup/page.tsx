import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2, Upload } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center lg:grid-cols-12">
      <section className="relative hidden overflow-hidden rounded-[2rem] bg-primary lg:col-span-5 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1600&q=80&auto=format&fit=crop"
          alt="Local produce"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative z-10 flex min-h-full flex-col justify-between p-10 text-white">
          <div>
            <p className="font-display text-2xl font-extrabold">Ostra</p>
            <h1 className="mt-10 max-w-sm font-display text-5xl font-extrabold tracking-tight text-balance">Cultivate your local network.</h1>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="font-semibold">Join 5,000+ neighbors</p>
            <p className="text-sm text-white/80">Trading fresh, local, and handmade goods.</p>
          </div>
        </div>
      </section>

      <section className="soft-card lg:col-span-7 lg:-ml-10 p-8 md:p-12">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Create your account</h2>
            <p className="mt-2 text-muted-foreground">Start your journey with the Modern Agrarian community.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm font-medium text-foreground/70">
            <Globe2 className="h-4 w-4" /> EN
          </button>
        </div>

        <form className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground/70">Profile photo</span>
            <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-black/10 bg-muted/70 p-4">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-primary shadow-sm">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">Upload a photo so neighbors can recognize you.</p>
            </div>
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-foreground/70">Full Name</span>
              <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Julian Thorne" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-foreground/70">Email Address</span>
              <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="julian@ostramarket.com" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground/70">Password</span>
              <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="••••••••" type="password" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground/70">City / Location</span>
              <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Portland, OR" />
            </label>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground/70">I want to...</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {['Sell items', 'Buy items', 'Both'].map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${index === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground shadow-soft">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="font-semibold text-primary">Sign in here <ArrowRight className="inline-block h-4 w-4" /></Link>
        </p>
      </section>
    </div>
  );
}