import { createClient } from '@supabase/supabase-js';
import { blogPosts as fallbackBlogPosts, faqSections as fallbackFaqSections, policySections as fallbackPolicySections } from './site-data';
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
    return fallbackBlogPosts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      image: post.image,
      is_featured: post.slug === fallbackBlogPosts[0]?.slug,
      sort_order: 0,
    }));
  }

  const { data } = await client
    .from('cms_blog_posts')
    .select('slug, title, excerpt, category, date, image, is_featured, sort_order')
    .order('sort_order', { ascending: true });

  const rows = (data as BlogRow[] | null) ?? [];
  if (rows.length === 0) {
    return fallbackBlogPosts.map((post, index) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      image: post.image,
      is_featured: index === 0,
      sort_order: index + 1,
    }));
  }

  return rows.map((row) => ({
    ...row,
    title: toLocaleMap(row.title, row.title?.en ?? row.slug),
    excerpt: toLocaleMap(row.excerpt, row.excerpt?.en ?? row.slug),
  }));
}

export async function getCmsFaqSections(): Promise<CmsFaqSection[]> {
  const client = getClient();
  if (!client) {
    return fallbackFaqSections.map((section) => ({
      slug: section.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: section.title, tr: section.title, el: section.title, ru: section.title },
      accent: section.accent,
      sort_order: 0,
      questions: section.questions.map((question) => ({
        question: { en: question, tr: question, el: question, ru: question },
        answer: {
          en: 'Answers appear here with policy-safe, buyer-friendly guidance and links to the relevant support articles.',
          tr: 'Cevaplar, politika uyumlu ve alıcı dostu rehberlik içerir.',
          el: 'Οι απαντήσεις εμφανίζονται εδώ με ασφαλείς οδηγίες για αγοραστές.',
          ru: 'Ответы здесь содержат безопасные и понятные рекомендации для покупателей.',
        },
      })),
    }));
  }

  const [sectionsResult, questionsResult] = await Promise.all([
    client.from('cms_faq_sections').select('slug, title, accent, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_faq_questions').select('section_slug, question, answer, sort_order').order('sort_order', { ascending: true }),
  ]);

  const sections = (sectionsResult.data as FaqSectionRow[] | null) ?? [];
  const questions = (questionsResult.data as FaqQuestionRow[] | null) ?? [];

  if (sections.length === 0) {
    return fallbackFaqSections.map((section) => ({
      slug: section.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: section.title, tr: section.title, el: section.title, ru: section.title },
      accent: section.accent,
      sort_order: 0,
      questions: section.questions.map((question) => ({
        question: { en: question, tr: question, el: question, ru: question },
        answer: {
          en: 'Answers appear here with policy-safe, buyer-friendly guidance and links to the relevant support articles.',
          tr: 'Cevaplar, politika uyumlu ve alıcı dostu rehberlik içerir.',
          el: 'Οι απαντήσεις εμφανίζονται εδώ με ασφαλείς οδηγίες για αγοραστές.',
          ru: 'Ответы здесь содержат безопасные и понятные рекомендации для покупателей.',
        },
      })),
    }));
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
    return fallbackPolicySections.map((section) => ({
      slug: section.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: section.title, tr: section.title, el: section.title, ru: section.title },
      updated: section.updated,
      sort_order: 0,
      points: section.points.map((point) => ({ en: point, tr: point, el: point, ru: point })),
    }));
  }

  const [sectionsResult, pointsResult] = await Promise.all([
    client.from('cms_policy_sections').select('slug, title, updated, sort_order').order('sort_order', { ascending: true }),
    client.from('cms_policy_points').select('section_slug, point, sort_order').order('sort_order', { ascending: true }),
  ]);

  const sections = (sectionsResult.data as PolicySectionRow[] | null) ?? [];
  const points = (pointsResult.data as PolicyPointRow[] | null) ?? [];

  if (sections.length === 0) {
    return fallbackPolicySections.map((section) => ({
      slug: section.title.toLowerCase().replace(/\s+/g, '-'),
      title: { en: section.title, tr: section.title, el: section.title, ru: section.title },
      updated: section.updated,
      sort_order: 0,
      points: section.points.map((point) => ({ en: point, tr: point, el: point, ru: point })),
    }));
  }

  return sections.map((section) => ({
    ...section,
    title: toLocaleMap(section.title, section.title?.en ?? section.slug),
    points: points.filter((point) => point.section_slug === section.slug).map((point) => toLocaleMap(point.point, point.point?.en ?? section.slug)),
  }));
}
