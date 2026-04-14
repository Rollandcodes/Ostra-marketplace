import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { ArrowLeft, FilePenLine, FolderHeart, PlusCircle, Trash2 } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';
import {
  deleteBlogPost,
  deleteFaqQuestion,
  deleteFaqSection,
  deletePolicyPoint,
  deletePolicySection,
  getAdminCmsContent,
  upsertBlogPost,
  upsertFaqQuestion,
  upsertFaqSection,
  upsertPolicyPoint,
  upsertPolicySection,
} from '@/lib/cms-admin';
import type { Locale } from '@/lib/i18n';

function readLocaleMap(formData: FormData, prefix: string): Record<Locale, string> {
  return {
    en: String(formData.get(`${prefix}_en`) ?? ''),
    tr: String(formData.get(`${prefix}_tr`) ?? ''),
    el: String(formData.get(`${prefix}_el`) ?? ''),
    ru: String(formData.get(`${prefix}_ru`) ?? ''),
  };
}

async function saveBlogPost(formData: FormData) {
  'use server';
  await upsertBlogPost({
    slug: String(formData.get('slug')),
    title: readLocaleMap(formData, 'title'),
    excerpt: readLocaleMap(formData, 'excerpt'),
    category: String(formData.get('category')),
    date: String(formData.get('date')),
    image: String(formData.get('image')),
    is_featured: formData.get('is_featured') === 'on',
    sort_order: Number(formData.get('sort_order') ?? 0),
  });
  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/dashboard/seller/cms');
}

async function removeBlogPost(formData: FormData) {
  'use server';
  await deleteBlogPost(String(formData.get('slug')));
  revalidatePath('/blog');
  revalidatePath('/');
  revalidatePath('/dashboard/seller/cms');
}

async function saveFaqSection(formData: FormData) {
  'use server';
  await upsertFaqSection({
    slug: String(formData.get('slug')),
    title: readLocaleMap(formData, 'title'),
    accent: String(formData.get('accent')),
    sort_order: Number(formData.get('sort_order') ?? 0),
  });
  revalidatePath('/faq');
  revalidatePath('/dashboard/seller/cms');
}

async function removeFaqSection(formData: FormData) {
  'use server';
  await deleteFaqSection(String(formData.get('slug')));
  revalidatePath('/faq');
  revalidatePath('/dashboard/seller/cms');
}

async function saveFaqQuestion(formData: FormData) {
  'use server';
  await upsertFaqQuestion({
    id: String(formData.get('id') ?? crypto.randomUUID()),
    section_slug: String(formData.get('section_slug')),
    question: readLocaleMap(formData, 'question'),
    answer: readLocaleMap(formData, 'answer'),
    sort_order: Number(formData.get('sort_order') ?? 0),
  });
  revalidatePath('/faq');
  revalidatePath('/dashboard/seller/cms');
}

async function removeFaqQuestion(formData: FormData) {
  'use server';
  await deleteFaqQuestion(String(formData.get('id')));
  revalidatePath('/faq');
  revalidatePath('/dashboard/seller/cms');
}

async function savePolicySection(formData: FormData) {
  'use server';
  await upsertPolicySection({
    slug: String(formData.get('slug')),
    title: readLocaleMap(formData, 'title'),
    updated: String(formData.get('updated')),
    sort_order: Number(formData.get('sort_order') ?? 0),
  });
  revalidatePath('/policies');
  revalidatePath('/dashboard/seller/cms');
}

async function removePolicySection(formData: FormData) {
  'use server';
  await deletePolicySection(String(formData.get('slug')));
  revalidatePath('/policies');
  revalidatePath('/dashboard/seller/cms');
}

async function savePolicyPoint(formData: FormData) {
  'use server';
  await upsertPolicyPoint({
    id: String(formData.get('id') ?? crypto.randomUUID()),
    section_slug: String(formData.get('section_slug')),
    point: readLocaleMap(formData, 'point'),
    sort_order: Number(formData.get('sort_order') ?? 0),
  });
  revalidatePath('/policies');
  revalidatePath('/dashboard/seller/cms');
}

async function removePolicyPoint(formData: FormData) {
  'use server';
  await deletePolicyPoint(String(formData.get('id')));
  revalidatePath('/policies');
  revalidatePath('/dashboard/seller/cms');
}

export default async function CmsEditorPage() {
  const content = await getAdminCmsContent();

  return (
    <div className="flex">
      <Sidebar baseHref="/dashboard/seller" mode="seller" title="CMS Editor" subtitle={content.ready ? 'Supabase connected' : 'Supabase service role missing'} />

      <div className="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/dashboard/seller" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to seller hub
            </Link>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-balance">CMS Editor</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Create and update blog posts, FAQ sections, and policy pages from inside the app.</p>
          </div>
          <div className="soft-card px-5 py-4 text-sm text-muted-foreground">
            {content.ready ? 'Edits will save to Supabase and revalidate the public pages.' : 'Set SUPABASE_SERVICE_ROLE_KEY to enable saving.'}
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="soft-card p-6">
            <div className="flex items-center gap-3">
              <FilePenLine className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Blog Posts</h2>
            </div>
            <form action={saveBlogPost} className="mt-5 space-y-4 rounded-[1.5rem] border border-dashed border-black/10 bg-muted/30 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Create new post</p>
              <div className="grid gap-3 md:grid-cols-2">
                <input name="slug" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="new-post-slug" />
                <input name="title_en" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EN" />
                <input name="title_tr" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title TR" />
                <input name="title_el" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EL" />
                <input name="title_ru" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title RU" />
                <textarea name="excerpt_en" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt EN" />
                <textarea name="excerpt_tr" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt TR" />
                <textarea name="excerpt_el" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt EL" />
                <textarea name="excerpt_ru" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt RU" />
                <input name="category" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Category" />
                <input name="date" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Date" />
                <input name="image" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Image URL" />
                <input name="sort_order" type="number" defaultValue={1} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
                <label className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm">
                  <input name="is_featured" type="checkbox" /> Featured
                </label>
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <PlusCircle className="h-4 w-4" /> Add post
              </button>
            </form>
            <div className="mt-5 space-y-6">
              {content.blogPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No blog posts yet.</p>
              ) : content.blogPosts.map((post) => (
                <form key={post.slug} action={saveBlogPost} className="space-y-4 rounded-[1.5rem] bg-muted/40 p-4">
                  <input type="hidden" name="slug" defaultValue={post.slug} />
                  <div className="grid gap-3 md:grid-cols-2">
                    <input name="title_en" defaultValue={post.title.en} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EN" />
                    <input name="title_tr" defaultValue={post.title.tr} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title TR" />
                    <input name="title_el" defaultValue={post.title.el} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EL" />
                    <input name="title_ru" defaultValue={post.title.ru} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title RU" />
                    <textarea name="excerpt_en" defaultValue={post.excerpt.en} className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt EN" />
                    <textarea name="excerpt_tr" defaultValue={post.excerpt.tr} className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt TR" />
                    <textarea name="excerpt_el" defaultValue={post.excerpt.el} className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt EL" />
                    <textarea name="excerpt_ru" defaultValue={post.excerpt.ru} className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Excerpt RU" />
                    <input name="category" defaultValue={post.category} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Category" />
                    <input name="date" defaultValue={post.date} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Date" />
                    <input name="image" defaultValue={post.image} className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Image URL" />
                    <input name="sort_order" type="number" defaultValue={post.sort_order} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
                    <label className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm">
                      <input name="is_featured" type="checkbox" defaultChecked={post.is_featured} /> Featured
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      <PlusCircle className="h-4 w-4" /> Save
                    </button>
                    <button
                      type="submit"
                      formAction={removeBlogPost}
                      name="slug"
                      value={post.slug}
                      className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-foreground/70"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </section>

          <section className="soft-card p-6">
            <div className="flex items-center gap-3">
              <FolderHeart className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">FAQ Sections</h2>
            </div>
            <form action={saveFaqSection} className="mt-5 grid gap-3 rounded-[1.5rem] border border-dashed border-black/10 bg-muted/30 p-4 md:grid-cols-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary md:col-span-2">Create new FAQ section</p>
              <input name="slug" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="section-slug" />
              <input name="title_en" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EN" />
              <input name="title_tr" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title TR" />
              <input name="title_el" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EL" />
              <input name="title_ru" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title RU" />
              <input name="accent" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Accent" />
              <input name="sort_order" type="number" defaultValue={1} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:col-span-2">
                <PlusCircle className="h-4 w-4" /> Add section
              </button>
            </form>
            <form action={saveFaqQuestion} className="mt-4 grid gap-3 rounded-[1.5rem] border border-dashed border-black/10 bg-muted/30 p-4 md:grid-cols-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary md:col-span-2">Create new FAQ question</p>
              <input name="section_slug" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="section-slug" />
              <input name="question_en" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Question EN" />
              <input name="question_tr" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Question TR" />
              <input name="question_el" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Question EL" />
              <input name="question_ru" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Question RU" />
              <textarea name="answer_en" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Answer EN" />
              <textarea name="answer_tr" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Answer TR" />
              <textarea name="answer_el" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Answer EL" />
              <textarea name="answer_ru" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Answer RU" />
              <input name="sort_order" type="number" defaultValue={1} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:col-span-2">
                <PlusCircle className="h-4 w-4" /> Add question
              </button>
            </form>
            <div className="mt-5 space-y-6">
              {content.faqSections.length === 0 ? <p className="text-sm text-muted-foreground">No FAQ sections yet.</p> : content.faqSections.map((section) => (
                <div key={section.slug} className="space-y-3 rounded-[1.5rem] bg-muted/40 p-4">
                  <form action={saveFaqSection} className="grid gap-3 md:grid-cols-2">
                    <input type="hidden" name="slug" value={section.slug} />
                    <input name="title_en" defaultValue={section.title.en} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Section title EN" />
                    <input name="title_tr" defaultValue={section.title.tr} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Section title TR" />
                    <input name="title_el" defaultValue={section.title.el} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Section title EL" />
                    <input name="title_ru" defaultValue={section.title.ru} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Section title RU" />
                    <input name="accent" defaultValue={section.accent} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Accent" />
                    <input name="sort_order" type="number" defaultValue={section.sort_order} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save section</button>
                    </div>
                  </form>
                  <form action={removeFaqSection}>
                    <input type="hidden" name="slug" value={section.slug} />
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-foreground/70">
                      <Trash2 className="h-4 w-4" /> Delete section
                    </button>
                  </form>
                  <div className="space-y-3 border-t border-black/5 pt-4">
                    {content.faqQuestions.filter((question) => question.section_slug === section.slug).map((question) => (
                      <form key={question.id} action={saveFaqQuestion} className="grid gap-3 rounded-2xl bg-white p-4 md:grid-cols-2">
                        <input type="hidden" name="id" value={question.id} />
                        <input type="hidden" name="section_slug" value={section.slug} />
                        <input name="question_en" defaultValue={question.question.en} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Question EN" />
                        <input name="question_tr" defaultValue={question.question.tr} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Question TR" />
                        <input name="question_el" defaultValue={question.question.el} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Question EL" />
                        <input name="question_ru" defaultValue={question.question.ru} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Question RU" />
                        <textarea name="answer_en" defaultValue={question.answer.en} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Answer EN" />
                        <textarea name="answer_tr" defaultValue={question.answer.tr} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Answer TR" />
                        <textarea name="answer_el" defaultValue={question.answer.el} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Answer EL" />
                        <textarea name="answer_ru" defaultValue={question.answer.ru} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Answer RU" />
                        <input name="sort_order" type="number" defaultValue={question.sort_order} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Sort order" />
                        <div className="flex flex-wrap gap-3 md:col-span-2">
                          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save question</button>
                        </div>
                      </form>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="soft-card p-6 xl:col-span-2">
            <div className="flex items-center gap-3">
              <FolderHeart className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold tracking-tight">Policies</h2>
            </div>
            <form action={savePolicySection} className="mt-5 grid gap-3 rounded-[1.5rem] border border-dashed border-black/10 bg-muted/30 p-4 md:grid-cols-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary md:col-span-2">Create new policy section</p>
              <input name="slug" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="policy-slug" />
              <input name="title_en" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EN" />
              <input name="title_tr" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title TR" />
              <input name="title_el" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title EL" />
              <input name="title_ru" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Title RU" />
              <input name="updated" className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Updated date" />
              <input name="sort_order" type="number" defaultValue={1} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:col-span-2">
                <PlusCircle className="h-4 w-4" /> Add section
              </button>
            </form>
            <form action={savePolicyPoint} className="mt-4 grid gap-3 rounded-[1.5rem] border border-dashed border-black/10 bg-muted/30 p-4 md:grid-cols-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary md:col-span-2">Create new policy point</p>
              <input name="section_slug" className="rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="policy-slug" />
              <textarea name="point_en" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Point EN" />
              <textarea name="point_tr" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Point TR" />
              <textarea name="point_el" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Point EL" />
              <textarea name="point_ru" className="min-h-24 rounded-xl bg-white px-3 py-2 text-sm md:col-span-2" placeholder="Point RU" />
              <input name="sort_order" type="number" defaultValue={1} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:col-span-2">
                <PlusCircle className="h-4 w-4" /> Add point
              </button>
            </form>
            <div className="mt-5 space-y-6">
              {content.policySections.length === 0 ? <p className="text-sm text-muted-foreground">No policies yet.</p> : content.policySections.map((section) => (
                <div key={section.slug} className="space-y-3 rounded-[1.5rem] bg-muted/40 p-4">
                  <form action={savePolicySection} className="grid gap-3 md:grid-cols-2">
                    <input type="hidden" name="slug" value={section.slug} />
                    <input name="title_en" defaultValue={section.title.en} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Policy title EN" />
                    <input name="title_tr" defaultValue={section.title.tr} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Policy title TR" />
                    <input name="title_el" defaultValue={section.title.el} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Policy title EL" />
                    <input name="title_ru" defaultValue={section.title.ru} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Policy title RU" />
                    <input name="updated" defaultValue={section.updated} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Updated date" />
                    <input name="sort_order" type="number" defaultValue={section.sort_order} className="rounded-xl bg-white px-3 py-2 text-sm" placeholder="Sort order" />
                    <div className="md:col-span-2 flex gap-3">
                      <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save section</button>
                    </div>
                  </form>
                  <form action={removePolicySection}>
                    <input type="hidden" name="slug" value={section.slug} />
                    <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-foreground/70">
                      <Trash2 className="h-4 w-4" /> Delete section
                    </button>
                  </form>
                  <div className="space-y-3 border-t border-black/5 pt-4">
                    {content.policyPoints.filter((point) => point.section_slug === section.slug).map((point) => (
                      <form key={point.id} action={savePolicyPoint} className="grid gap-3 rounded-2xl bg-white p-4 md:grid-cols-2">
                        <input type="hidden" name="id" value={point.id} />
                        <input type="hidden" name="section_slug" value={section.slug} />
                        <textarea name="point_en" defaultValue={point.point.en} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Point EN" />
                        <textarea name="point_tr" defaultValue={point.point.tr} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Point TR" />
                        <textarea name="point_el" defaultValue={point.point.el} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Point EL" />
                        <textarea name="point_ru" defaultValue={point.point.ru} className="min-h-24 rounded-xl bg-muted px-3 py-2 text-sm md:col-span-2" placeholder="Point RU" />
                        <input name="sort_order" type="number" defaultValue={point.sort_order} className="rounded-xl bg-muted px-3 py-2 text-sm" placeholder="Sort order" />
                        <div className="flex flex-wrap gap-3 md:col-span-2">
                          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save point</button>
                        </div>
                      </form>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
