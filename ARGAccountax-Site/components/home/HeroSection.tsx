import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background image */}
      <Image
        src="/images/hero-trees.png"
        alt=""
        fill
        className="object-cover"
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {t('badge')}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading">
            {t('headlinePart1')}
            <span className="text-[#4ade80]">{t('headlineGreen')}</span>
            {t('headlinePart2')}
          </h1>

          <p className="text-base md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between sm:justify-center gap-2 bg-white text-[#15803d] hover:bg-[#f0fdf4] font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <span>{t('cta')}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-between sm:justify-center gap-2 bg-[#15803d]/10 border-2 border-white/30 text-white hover:bg-white/20 font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                <span>{t('freeTools')}</span>
              </div>
            </Link>
            <a
              href="tel:4167268055"
              className="inline-flex items-center justify-between sm:justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>{t('phone')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
