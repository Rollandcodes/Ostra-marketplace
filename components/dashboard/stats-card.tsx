import { cn } from '@/lib/utils';

export function StatsCard({ label, value, delta, tone = 'neutral' }: { label: string; value: string; delta: string; tone?: 'neutral' | 'primary' | 'secondary' }) {
  return (
    <div
      className={cn(
        'soft-card p-6',
        tone === 'primary' && 'bg-primary text-primary-foreground',
        tone === 'secondary' && 'bg-secondary text-secondary-foreground',
      )}
    >
      <p className={cn('text-sm font-medium', tone === 'neutral' ? 'text-muted-foreground' : 'text-white/80')}>{label}</p>
      <p className="mt-4 font-display text-4xl font-extrabold tracking-tight">{value}</p>
      <p className={cn('mt-2 text-xs font-semibold uppercase tracking-[0.2em]', tone === 'neutral' ? 'text-primary' : 'text-white/90')}>
        {delta}
      </p>
    </div>
  );
}