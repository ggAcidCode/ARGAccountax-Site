import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="bg-gradient-to-br from-[#f0fdf4] via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#dcfce7] text-[#15803d] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {t('badge')}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('headline')}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              {t('cta')}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#15803d] text-[#15803d] hover:bg-[#f0fdf4] font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
