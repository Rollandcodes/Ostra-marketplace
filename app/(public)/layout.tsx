import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Suspense } from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-black/5 bg-white/80" />}>
        <Navbar />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}