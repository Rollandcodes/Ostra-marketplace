# Ostra Marketplace

Modern agrarian hyperlocal marketplace built with Next.js 14, TypeScript, Tailwind CSS, Clerk, and Supabase.

## What is included

- Public marketplace landing page, browse experience, listing detail view, auth pages, seller dashboard, buyer dashboard, and content/legal hub.
- Shared design system aligned to the Stitch references and the Modern Agrarian palette.
- Supabase schema with RLS for profiles, categories, listings, saved listings, messages, and reviews.
- Locale switching support for English, Turkish, Greek, and Russian.

## Main routes

- `/` home
- `/listings` browse
- `/listings/[id]` listing detail
- `/login` and `/signup`
- `/dashboard/seller` and `/dashboard/buyer`
- `/about`, `/faq`, `/blog`, `/policies`

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Database

Run the schema in `supabase/schema.sql` against your Supabase project before connecting the app to live data.
