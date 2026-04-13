create extension if not exists pgcrypto;

do $$
begin
  create type public.user_role as enum ('buyer', 'seller', 'both');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  phone text,
  whatsapp text,
  avatar_url text,
  location text,
  city text,
  bio text,
  role public.user_role not null default 'buyer',
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  price numeric(12,2) not null default 0,
  is_negotiable boolean not null default false,
  is_free boolean not null default false,
  condition text not null,
  category_id uuid not null references public.categories(id),
  images text[] not null default '{}',
  location text,
  city text,
  status text not null default 'active' check (status in ('active', 'sold', 'paused')),
  views integer not null default 0,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_listings (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (profile_id, listing_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete set null,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_seller_id_idx on public.listings (seller_id);
create index if not exists listings_category_id_idx on public.listings (category_id);
create index if not exists messages_thread_id_idx on public.messages (thread_id);
create index if not exists reviews_reviewee_id_idx on public.reviews (reviewee_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at
before update on public.listings
for each row execute function public.set_updated_at();

drop trigger if exists messages_set_updated_at on public.messages;
create trigger messages_set_updated_at
before update on public.messages
for each row execute function public.set_updated_at();

drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.listings enable row level security;
alter table public.saved_listings enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

create policy "Profiles are publicly readable" on public.profiles
for select using (true);

create policy "Users can insert their own profile" on public.profiles
for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
for update using (auth.uid() = id);

create policy "Categories are publicly readable" on public.categories
for select using (true);

create policy "Listings are publicly readable when active or owned" on public.listings
for select using (status = 'active' or seller_id = auth.uid());

create policy "Sellers can create listings" on public.listings
for insert with check (auth.uid() = seller_id);

create policy "Sellers can update own listings" on public.listings
for update using (auth.uid() = seller_id);

create policy "Sellers can delete own listings" on public.listings
for delete using (auth.uid() = seller_id);

create policy "Users can read saved listings" on public.saved_listings
for select using (auth.uid() = profile_id);

create policy "Users can add saved listings" on public.saved_listings
for insert with check (auth.uid() = profile_id);

create policy "Users can remove saved listings" on public.saved_listings
for delete using (auth.uid() = profile_id);

create policy "Conversation participants can read messages" on public.messages
for select using (auth.uid() = buyer_id or auth.uid() = seller_id or auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Participants can create messages" on public.messages
for insert with check (auth.uid() = sender_id);

create policy "Recipients can mark messages as read" on public.messages
for update using (auth.uid() = recipient_id or auth.uid() = sender_id);

create policy "Reviews are publicly readable" on public.reviews
for select using (true);

create policy "Authenticated users can create reviews" on public.reviews
for insert with check (auth.uid() = reviewer_id);

insert into public.categories (slug, name, icon) values
  ('electronics', 'Electronics', 'smartphone'),
  ('furniture', 'Furniture', 'armchair'),
  ('clothing', 'Clothing', 'shirt'),
  ('vehicles', 'Vehicles', 'car-front'),
  ('home', 'Home', 'house'),
  ('books', 'Books', 'book-open'),
  ('sports', 'Sports', 'dumbbell'),
  ('toys', 'Toys', 'puzzle'),
  ('food', 'Food', 'concierge-bell'),
  ('services', 'Services', 'wrench-screwdriver'),
  ('pets', 'Pets', 'paw-print'),
  ('property', 'Property', 'building-2'),
  ('events', 'Events', 'calendar-days')
on conflict (slug) do update set name = excluded.name, icon = excluded.icon;