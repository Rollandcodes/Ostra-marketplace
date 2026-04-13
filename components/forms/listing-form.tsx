"use client";

import { useState } from 'react';
import { Upload, MapPin, Tags, AlignLeft, DollarSign, Home, Package } from 'lucide-react';

export function ListingForm() {
  const [kind, setKind] = useState<'general' | 'property'>('general');

  return (
    <form className="soft-card space-y-8 p-6">
      <div className="flex flex-wrap gap-3">
        {[
          { value: 'general', label: 'General Listing', icon: Package },
          { value: 'property', label: 'Property / Event', icon: Home },
        ].map((option) => {
          const Icon = option.icon;
          const active = kind === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setKind(option.value as 'general' | 'property')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground/70'}`}
            >
              <Icon className="h-4 w-4" />
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-foreground/70">Title</span>
          <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder={kind === 'property' ? 'Modern Coastal Villa' : 'Fresh Wildflower Honey'} />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><AlignLeft className="h-4 w-4" />Description</span>
          <textarea className="min-h-36 w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Describe the story, origin, and details..." />
        </label>

        <label className="space-y-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><DollarSign className="h-4 w-4" />Price</span>
          <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="$ 0.00" />
        </label>

        <label className="space-y-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><MapPin className="h-4 w-4" />Location</span>
          <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="Nicosia, Cyprus" />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><Tags className="h-4 w-4" />Tags</span>
          <input className="w-full rounded-xl bg-muted px-4 py-3 outline-none" placeholder="organic, handmade, local" />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70"><Upload className="h-4 w-4" />Images</span>
          <div className="rounded-2xl border-2 border-dashed border-black/10 bg-muted/70 p-8 text-center text-sm text-foreground/60">
            Drag and drop images here, or click to upload from Supabase storage.
          </div>
        </label>
      </div>

      <button className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90">
        Publish listing
      </button>
    </form>
  );
}