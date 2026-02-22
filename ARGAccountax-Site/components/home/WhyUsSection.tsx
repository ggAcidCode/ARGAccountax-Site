import { useTranslations } from 'next-intl';

const features = [
  { key: 'experience', icon: 'location_on' },
  { key: 'proactive', icon: 'schedule' },
  { key: 'bilingual', icon: 'language' },
  { key: 'trusted', icon: 'verified' },
] as const;

export default function WhyUsSection() {
  const t = useTranslations('WhyUs');

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ key, icon }) => (
            <div
              key={key}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
            >
              <div className="text-[#15803d] mb-4">
                <span className="material-symbols-outlined text-[28px]">{icon}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{t(`${key}.title`)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t(`${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
