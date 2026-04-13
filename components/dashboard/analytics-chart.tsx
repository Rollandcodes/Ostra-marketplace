"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { day: 'Mon', views: 1200 },
  { day: 'Tue', views: 1800 },
  { day: 'Wed', views: 1600 },
  { day: 'Thu', views: 2450 },
  { day: 'Fri', views: 2100 },
  { day: 'Sat', views: 2800 },
  { day: 'Sun', views: 2300 },
];

export function AnalyticsChart() {
  return (
    <div className="soft-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Analytics</p>
          <h3 className="font-display text-2xl font-extrabold tracking-tight">Views Over Time</h3>
        </div>
        <div className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/70">Last 7 days</div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(25,28,29,0.08)" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'rgba(22,163,74,0.08)' }} />
            <Bar dataKey="views" radius={[12, 12, 0, 0]} fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}