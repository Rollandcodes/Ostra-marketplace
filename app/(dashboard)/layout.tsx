export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-[calc(100vh-4rem)] bg-muted/20">{children}</main>;
}