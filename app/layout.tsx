import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { AppProviders } from '@/components/providers';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: {
    default: 'Ostra Marketplace',
    template: '%s | Ostra Marketplace',
  },
  description: 'Ostra Marketplace is a modern agrarian marketplace for Turkey, Northern Cyprus, and South Cyprus.',
  metadataBase: new URL('https://ostra.marketplace'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} bg-background text-foreground antialiased`}>
        <ClerkProvider>
          <AppProviders>{children}</AppProviders>
        </ClerkProvider>
      </body>
    </html>
  );
}