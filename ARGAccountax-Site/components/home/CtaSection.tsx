import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CtaSection() {
  const t = useTranslations('Cta');

  return (
    <section className="py-20 bg-[#15803d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
          {t('title')}
        </h2>
        <p className="text-lg text-[#dcfce7] mb-10 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-[#15803d] hover:bg-[#f0fdf4] font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-lg"
        >
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
