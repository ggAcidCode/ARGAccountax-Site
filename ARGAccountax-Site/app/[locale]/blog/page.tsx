import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/blog';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('blogTitle') };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const posts = getAllPosts(locale);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h1>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}` as '/blog'}
                className="block bg-white border border-slate-200 rounded-xl p-6 hover:border-[#dcfce7] hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
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
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-[#15803d] transition-colors mb-2 font-heading">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0 mt-1">{post.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-8 text-center">
            <span className="material-symbols-outlined text-[#15803d] text-[40px] block mb-3">article</span>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('comingSoon')}</h3>
            <p className="text-sm text-slate-600">{t('noPosts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
