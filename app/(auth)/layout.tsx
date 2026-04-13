export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-gradient-to-br from-white via-background to-primary/5 px-4 py-8 md:px-6 md:py-12">{children}</main>;
}