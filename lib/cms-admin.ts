import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { Locale } from './i18n';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function localeFields(values: Record<Locale, string>) {
  return values;
}

export type AdminBlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: string;
  date: string;
  image: string;
  is_featured: boolean;
  sort_order: number;
};

export type AdminFaqSection = {
  slug: string;
  title: Record<Locale, string>;
  accent: string;
  sort_order: number;
};

export type AdminFaqQuestion = {
  id: string;
  section_slug: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
  sort_order: number;
};

export type AdminPolicySection = {
  slug: string;
  title: Record<Locale, string>;
  updated: string;
  sort_order: number;
};

export type AdminPolicyPoint = {
  id: string;
  section_slug: string;
  point: Record<Locale, string>;
  sort_order: number;
};

export async function getAdminCmsContent() {
  const client = getAdminClient();
  if (!client) {
    return {
      ready: false,
      blogPosts: [] as AdminBlogPost[],
      faqSections: [] as AdminFaqSection[],
      faqQuestions: [] as AdminFaqQuestion[],
      policySections: [] as AdminPolicySection[],
      policyPoints: [] as AdminPolicyPoint[],
    };
  }

  const [blogResult, faqSectionResult, faqQuestionResult, policySectionResult, policyPointResult] = await Promise.all([
    client.from('cms_blog_posts').select('slug, title, excerpt, category, date, image, is_featured, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_faq_sections').select('slug, title, accent, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_faq_questions').select('id, section_slug, question, answer, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_policy_sections').select('slug, title, updated, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_policy_points').select('id, section_slug, point, sort_order').order('sort_order', { ascending: true }),
  ]);

  return {
    ready: true,
    blogPosts: (blogResult.data ?? []) as AdminBlogPost[],
    faqSections: (faqSectionResult.data ?? []) as AdminFaqSection[],
    faqQuestions: (faqQuestionResult.data ?? []) as AdminFaqQuestion[],
    policySections: (policySectionResult.data ?? []) as AdminPolicySection[],
    policyPoints: (policyPointResult.data ?? []) as AdminPolicyPoint[],
  };
}

export async function upsertBlogPost(input: AdminBlogPost) {
  const client = getAdminClient();
  if (!client) return { ready: false };

  await client.from('cms_blog_posts').upsert({
    slug: input.slug,
    title: localeFields(input.title),
    excerpt: localeFields(input.excerpt),
    category: input.category,
    date: input.date,
    image: input.image,
    is_featured: input.is_featured,
    sort_order: input.sort_order,
  });

  return { ready: true };
}

export async function deleteBlogPost(slug: string) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_blog_posts').delete().eq('slug', slug);
  return { ready: true };
}

export async function upsertFaqSection(input: AdminFaqSection) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_faq_sections').upsert({
    slug: input.slug,
    title: localeFields(input.title),
    accent: input.accent,
    sort_order: input.sort_order,
  });
  return { ready: true };
}

export async function deleteFaqSection(slug: string) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_faq_sections').delete().eq('slug', slug);
  return { ready: true };
}

export async function upsertFaqQuestion(input: AdminFaqQuestion) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_faq_questions').upsert({
    id: input.id,
    section_slug: input.section_slug,
    question: localeFields(input.question),
    answer: localeFields(input.answer),
    sort_order: input.sort_order,
  });
  return { ready: true };
}

export async function deleteFaqQuestion(id: string) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_faq_questions').delete().eq('id', id);
  return { ready: true };
}

export async function upsertPolicySection(input: AdminPolicySection) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_policy_sections').upsert({
    slug: input.slug,
    title: localeFields(input.title),
    updated: input.updated,
    sort_order: input.sort_order,
  });
  return { ready: true };
}

export async function deletePolicySection(slug: string) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_policy_sections').delete().eq('slug', slug);
  return { ready: true };
}

export async function upsertPolicyPoint(input: AdminPolicyPoint) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_policy_points').upsert({
    id: input.id,
    section_slug: input.section_slug,
    point: localeFields(input.point),
    sort_order: input.sort_order,
  });
  return { ready: true };
}

export async function deletePolicyPoint(id: string) {
  const client = getAdminClient();
  if (!client) return { ready: false };
  await client.from('cms_policy_points').delete().eq('id', id);
  return { ready: true };
}
