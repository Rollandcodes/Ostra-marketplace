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

create table if not exists public.cms_blog_posts (
  slug text primary key,
  title jsonb not null,
  excerpt jsonb not null,
  category text not null,
  date text not null,
  image text not null,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_faq_sections (
  slug text primary key,
  title jsonb not null,
  accent text not null default 'muted',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_faq_questions (
  id uuid primary key default gen_random_uuid(),
  section_slug text not null references public.cms_faq_sections(slug) on delete cascade,
  question jsonb not null,
  answer jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (section_slug, sort_order)
);

create table if not exists public.cms_policy_sections (
  slug text primary key,
  title jsonb not null,
  updated text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_policy_points (
  id uuid primary key default gen_random_uuid(),
  section_slug text not null references public.cms_policy_sections(slug) on delete cascade,
  point jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (section_slug, sort_order)
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
alter table public.cms_blog_posts enable row level security;
alter table public.cms_faq_sections enable row level security;
alter table public.cms_faq_questions enable row level security;
alter table public.cms_policy_sections enable row level security;
alter table public.cms_policy_points enable row level security;
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

create policy "Blog posts are publicly readable" on public.cms_blog_posts
for select using (true);

create policy "FAQ sections are publicly readable" on public.cms_faq_sections
for select using (true);

create policy "FAQ questions are publicly readable" on public.cms_faq_questions
for select using (true);

create policy "Policy sections are publicly readable" on public.cms_policy_sections
for select using (true);

create policy "Policy points are publicly readable" on public.cms_policy_points
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

insert into public.cms_blog_posts (slug, title, excerpt, category, date, image, is_featured, sort_order) values
  (
    'soil-secret',
    '{"en":"The Soil''s Secret: Reviving Ancient Grains.","tr":"Toprağın Sırrı: Kadim Tohumları Canlandırmak.","el":"Το μυστικό του εδάφους.","ru":"Секрет почвы."}',
    '{"en":"How heirloom seeds are healing our ecosystem and tables.","tr":"Ata tohumları ekosistemi nasıl iyileştiriyor?","el":"Πώς οι παραδοσιακοί σπόροι θεραπεύουν το οικοσύστημα.","ru":"Как старые семена восстанавливают экосистему."}',
    'Featured Editorial',
    'March 14, 2024',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80&auto=format&fit=crop',
    true,
    1
  ),
  (
    'sustainable-farming',
    '{"en":"Why Cover Crops are the Unsung Heroes of Climate Action.","tr":"Örtü bitkileri neden görünmeyen kahramanlardır?","el":"Γιατί οι καλλιέργειες κάλυψης έχουν σημασία;","ru":"Почему покровные культуры важны."}',
    '{"en":"Carbon sequestration is happening under our feet.","tr":"Karbon yakalama tam ayağımızın altında gerçekleşiyor.","el":"Η δέσμευση άνθρακα συμβαίνει κάτω από τα πόδια μας.","ru":"Поглощение углерода происходит прямо под ногами."}',
    'Sustainable Farming',
    'March 10, 2024',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80&auto=format&fit=crop',
    false,
    2
  )
on conflict (slug) do update set title = excluded.title, excerpt = excluded.excerpt, category = excluded.category, date = excluded.date, image = excluded.image, is_featured = excluded.is_featured, sort_order = excluded.sort_order;

insert into public.cms_faq_sections (slug, title, accent, sort_order) values
  ('buying', '{"en":"Buying","tr":"Satın Alma","el":"Αγορές","ru":"Покупка"}', 'primary', 1),
  ('selling', '{"en":"Selling","tr":"Satış","el":"Πωλήσεις","ru":"Продажа"}', 'secondary', 2),
  ('trust-safety', '{"en":"Trust & Safety","tr":"Güvenlik","el":"Ασφάλεια","ru":"Безопасность"}', 'destructive', 3),
  ('account', '{"en":"Account","tr":"Hesap","el":"Λογαριασμός","ru":"Аккаунт"}', 'muted', 4)
on conflict (slug) do update set title = excluded.title, accent = excluded.accent, sort_order = excluded.sort_order;

insert into public.cms_faq_questions (section_slug, question, answer, sort_order) values
  ('buying', '{"en":"How do I track my fresh produce order?"}', '{"en":"Use the message thread and order notes in the listing conversation to coordinate pickup or delivery."}', 1),
  ('buying', '{"en":"What payment methods do you accept?"}', '{"en":"Payments are agreed directly between buyer and seller until checkout integration is enabled."}', 2),
  ('selling', '{"en":"What are the vendor fees on Ostra?"}', '{"en":"Ostra is designed around a low-fee, community-first marketplace model."}', 1),
  ('selling', '{"en":"How do I list seasonal products?"}', '{"en":"Create a listing from the seller dashboard and mark seasonal availability in the description."}', 2),
  ('trust-safety', '{"en":"How do you verify producer quality?"}', '{"en":"Profiles can be verified, and community reporting plus review history help maintain trust."}', 1),
  ('account', '{"en":"Can I have both a Buyer and Seller profile?"}', '{"en":"Yes. One account can participate in both roles once the profile is configured."}', 1)
on conflict (section_slug, sort_order) do update set question = excluded.question, answer = excluded.answer;

insert into public.cms_policy_sections (slug, title, updated, sort_order) values
  ('privacy-policy', '{"en":"Privacy Policy"}', 'June 14, 2024', 1),
  ('terms-of-service', '{"en":"Terms of Service"}', 'June 14, 2024', 2),
  ('shipping-policy', '{"en":"Shipping Policy"}', 'June 14, 2024', 3)
on conflict (slug) do update set title = excluded.title, updated = excluded.updated, sort_order = excluded.sort_order;

insert into public.cms_policy_points (section_slug, point, sort_order) values
  ('privacy-policy', '{"en":"We collect only what we need to bring the farm to your table efficiently and securely."}', 1),
  ('privacy-policy', '{"en":"Information is used for fulfillment, analytics, and community trust."}', 2),
  ('privacy-policy', '{"en":"We share data only with operational partners bound by strict confidentiality agreements."}', 3),
  ('terms-of-service', '{"en":"The marketplace operates as a peer-to-peer community with seller accountability."}', 1),
  ('terms-of-service', '{"en":"All listings must be accurate, legal, and respectful of local regulations."}', 2),
  ('terms-of-service', '{"en":"Disputes are handled with a community-first resolution process."}', 3),
  ('shipping-policy', '{"en":"Local pickup and courier options are available by listing type."}', 1),
  ('shipping-policy', '{"en":"Perishable items should include a handling and freshness note."}', 2),
  ('shipping-policy', '{"en":"Tracking details are surfaced in buyer and seller inboxes in real time."}', 3)
on conflict (section_slug, sort_order) do update set point = excluded.point;