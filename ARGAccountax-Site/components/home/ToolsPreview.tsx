import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const tools = [
  { key: 'calculators', href: '/tools/income-tax-calculator', icon: 'calculate' },
  { key: 'deadlines', href: '/deadlines', icon: 'calendar_month' },
  { key: 'resources', href: '/resources', icon: 'folder_open' },
] as const;

export default function ToolsPreview() {
  const t = useTranslations('ToolsPreview');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h2>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map(({ key, href, icon }) => (
            <div
              key={key}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col"
            >
              <div className="w-12 h-12 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[#15803d] text-[24px]">{icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 font-heading">{t(`${key}`)}</h3>
              <p className="text-slate-600 leading-relaxed text-sm flex-grow">{t(`${key}Desc`)}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#15803d] hover:text-[#166534] transition-colors"
              >
                {t('tryNow')}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-[#15803d] hover:text-[#15803d] font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            {t('viewAll')}
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
