import { useTranslations } from 'next-intl';

const services = [
  { key: 'personal', icon: 'person' },
  { key: 'selfEmployed', icon: 'work' },
  { key: 'corporate', icon: 'business' },
] as const;

export default function ServicesSection() {
  const t = useTranslations('Services');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ key, icon }) => (
            <div
              key={key}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-[#dcfce7] transition-all group"
            >
              <div className="w-12 h-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#dcfce7] transition-colors">
                <span className="material-symbols-outlined text-[#15803d] text-[24px]">{icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
