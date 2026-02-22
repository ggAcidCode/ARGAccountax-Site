import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

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
  return <BlogContent />;
}

function BlogContent() {
  const t = useTranslations('Blog');

  const topics = [
    { title: 'Ontario Small Business Deduction Explained', category: 'Corporate', readTime: '5 min' },
    { title: 'Understanding the Ontario Trillium Benefit', category: 'Personal', readTime: '4 min' },
    { title: 'RRSP vs TFSA: Which Should You Prioritize?', category: 'Personal', readTime: '6 min' },
    { title: 'HST in Ontario: What Every Business Needs to Know', category: 'Business', readTime: '5 min' },
    { title: 'Ontario Surtax: Are You Affected?', category: 'Personal', readTime: '3 min' },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        {/* Coming soon callout */}
        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-8 text-center mb-10">
          <span className="material-symbols-outlined text-[#15803d] text-[40px] block mb-3">article</span>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('comingSoon')}</h3>
          <p className="text-sm text-slate-600">Available in English and Tamil — check back soon.</p>
        </div>

        {/* Upcoming article previews */}
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Coming Articles</h2>
        <div className="space-y-3">
          {topics.map(({ title, category, readTime }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between opacity-60">
              <div>
                <span className="text-xs font-semibold text-[#15803d] bg-[#f0fdf4] px-2 py-0.5 rounded-full mr-2">{category}</span>
                <span className="font-medium text-slate-800">{title}</span>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0 ml-4">{readTime} read</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
