import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import PersonalTaxCalc from '@/components/calculators/PersonalTaxCalc';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('calculatorsTitle') };
}

export default async function IncomeTaxCalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <IncomeTaxContent />;
}

function IncomeTaxContent() {
  const t = useTranslations('Calculators');

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h1>
          <p className="text-lg text-slate-600 mb-4">{t('subtitle')}</p>
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-amber-600 text-[18px] mt-0.5">info</span>
            <p className="text-sm text-amber-800">{t('disclaimer')}</p>
          </div>
        </div>

        <PersonalTaxCalc />
      </div>
    </div>
  );
}
