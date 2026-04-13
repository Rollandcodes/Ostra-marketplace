"use client";

import { Camera, Mail, MapPin, Phone, UserRound } from 'lucide-react';

export function ProfileForm() {
  return (
    <form className="soft-card grid gap-5 p-6 md:grid-cols-2">
      <label className="space-y-2 md:col-span-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><UserRound className="h-4 w-4" />Full Name</span>
        <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Arthur Miller" />
      </label>
      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><Mail className="h-4 w-4" />Email</span>
        <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="arthur@example.com" />
      </label>
      <label className="space-y-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><Phone className="h-4 w-4" />Phone</span>
        <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="+1 (555) 012-3456" />
      </label>
      <label className="space-y-2 md:col-span-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><MapPin className="h-4 w-4" />Location</span>
        <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Sonoma Valley, California" />
      </label>
      <label className="space-y-2 md:col-span-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><Camera className="h-4 w-4" />Bio</span>
        <textarea className="min-h-32 w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="A short biography about your local business or buyer profile." />
      </label>
      <button className="md:col-span-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90">
        Save profile
      </button>
    </form>
  );
}