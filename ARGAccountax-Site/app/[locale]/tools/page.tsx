import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('toolsTitle') };
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ToolsContent />;
}

const tools = [
  { key: 'incomeTax', href: '/tools/income-tax-calculator', icon: 'calculate' },
  { key: 'rrsp', href: '/tools/rrsp-estimator', icon: 'savings' },
  { key: 'deadlines', href: '/deadlines', icon: 'calendar_month' },
  { key: 'resources', href: '/resources', icon: 'folder_open' },
] as const;

function ToolsContent() {
  const t = useTranslations('Tools');

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h1>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map(({ key, href, icon }) => (
            <Link
              key={key}
              href={href}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-[#dcfce7] transition-all group block"
            >
              <div className="w-12 h-12 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#dcfce7] transition-colors">
                <span className="material-symbols-outlined text-[#15803d] text-[24px]">{icon}</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2 font-heading">
                {t(`${key}.title`)}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                {t(`${key}.description`)}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803d] group-hover:text-[#166534] transition-colors">
                {t('openTool')}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mt-10">
          <span className="material-symbols-outlined text-amber-600 text-[18px] mt-0.5">info</span>
          <p className="text-sm text-amber-800">{t('disclaimer')}</p>
        </div>
      </div>
    </div>
  );
}
