import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | ARG Accountax`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#15803d] hover:text-[#166534] mb-8 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to articles
        </Link>

        {/* Post header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-[#15803d] bg-[#f0fdf4] px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(post.date).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="text-xs text-slate-400">{post.readTime} read</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading leading-tight">
            {post.title}
          </h1>
        </div>

        {/* MDX content */}
        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-headings:text-slate-900 prose-a:text-[#15803d] prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900">
          <MDXRemote source={post.content} />
        </article>

        {/* CTA */}
        <div className="mt-12 bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 font-heading">Have questions about this topic?</h3>
          <p className="text-sm text-slate-600 mb-4">Our team is here to help with your specific tax situation.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Contact Us
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
