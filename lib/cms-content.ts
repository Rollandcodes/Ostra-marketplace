import { createClient } from '@supabase/supabase-js';
import type { Locale } from './i18n';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type BlogRow = {
  slug: string;
  title: Partial<Record<Locale, string>>;
  excerpt: Partial<Record<Locale, string>>;
  category: string;
  date: string;
  image: string;
  is_featured: boolean;
  sort_order: number;
};

type FaqSectionRow = {
  slug: string;
  title: Partial<Record<Locale, string>>;
  accent: string;
  sort_order: number;
};

type FaqQuestionRow = {
  section_slug: string;
  question: Partial<Record<Locale, string>>;
  answer: Partial<Record<Locale, string>>;
  sort_order: number;
};

type PolicySectionRow = {
  slug: string;
  title: Partial<Record<Locale, string>>;
  updated: string;
  sort_order: number;
};

type PolicyPointRow = {
  section_slug: string;
  point: Partial<Record<Locale, string>>;
  sort_order: number;
};

export type CmsBlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: string;
  date: string;
  image: string;
  is_featured: boolean;
  sort_order: number;
};
export type CmsFaqSection = FaqSectionRow & { questions: { question: Record<Locale, string>; answer: Record<Locale, string> }[] };
export type CmsPolicySection = PolicySectionRow & { points: Record<Locale, string>[] };

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function toLocaleMap(value: Partial<Record<Locale, string>> | undefined, fallback: string): Record<Locale, string> {
  const base = value?.en ?? fallback;
  return {
    en: value?.en ?? base,
    tr: value?.tr ?? base,
    el: value?.el ?? base,
    ru: value?.ru ?? base,
  };
}

function asBlogRow(row: BlogRow): BlogRow {
  return row;
}

export async function getCmsBlogPosts(): Promise<CmsBlogPost[]> {
  const client = getClient();
  if (!client) {
    return [];
  }

  const { data } = await client
    .from('cms_blog_posts')
    .select('slug, title, excerpt, category, date, image, is_featured, sort_order')
    .order('sort_order', { ascending: true });

  const rows = (data as BlogRow[] | null) ?? [];
  return rows.map((row) => ({
    ...row,
    title: toLocaleMap(row.title, row.title?.en ?? row.slug),
    excerpt: toLocaleMap(row.excerpt, row.excerpt?.en ?? row.slug),
  }));
}

export async function getCmsFaqSections(): Promise<CmsFaqSection[]> {
  const client = getClient();
  if (!client) {
    return [];
  }

  const [sectionsResult, questionsResult] = await Promise.all([
    client.from('cms_faq_sections').select('slug, title, accent, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_faq_questions').select('section_slug, question, answer, sort_order').order('sort_order', { ascending: true }),
  ]);

  const sections = (sectionsResult.data as FaqSectionRow[] | null) ?? [];
  const questions = (questionsResult.data as FaqQuestionRow[] | null) ?? [];

  if (sections.length === 0) {
    return [];
  }

  return sections.map((section) => ({
    ...section,
    title: toLocaleMap(section.title, section.title?.en ?? section.slug),
    questions: questions
      .filter((question) => question.section_slug === section.slug)
      .map((question) => ({
        question: toLocaleMap(question.question, question.question?.en ?? section.slug),
        answer: toLocaleMap(question.answer, question.answer?.en ?? section.slug),
      })),
  }));
}

export async function getCmsPolicySections(): Promise<CmsPolicySection[]> {
  const client = getClient();
  if (!client) {
    return [];
  }

  const [sectionsResult, pointsResult] = await Promise.all([
    client.from('cms_policy_sections').select('slug, title, updated, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_policy_points').select('section_slug, point, sort_order').order('sort_order', { ascending: true }),
  ]);

  const sections = (sectionsResult.data as PolicySectionRow[] | null) ?? [];
  const points = (pointsResult.data as PolicyPointRow[] | null) ?? [];

  if (sections.length === 0) {
    return [];
  }

  return sections.map((section) => ({
    ...section,
    title: toLocaleMap(section.title, section.title?.en ?? section.slug),
    points: points.filter((point) => point.section_slug === section.slug).map((point) => toLocaleMap(point.point, point.point?.en ?? section.slug)),
  }));
}
