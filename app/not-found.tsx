import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="soft-card max-w-xl p-10 text-center">
        <p className="hero-kicker mb-4">404</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance">This page could not be found.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The route may have moved or the listing may no longer exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}