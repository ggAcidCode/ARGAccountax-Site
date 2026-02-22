import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('resourcesTitle') };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ResourcesContent />;
}

function ResourcesContent() {
  const t = useTranslations('Resources');

  const links = [
    { label: 'CRA Forms and Publications', url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications.html', category: 'CRA' },
    { label: 'Ontario Tax Package (T1)', url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/tax-packages-years/general-income-tax-benefit-package/ontario.html', category: 'Personal' },
    { label: 'Ontario Trillium Benefit (ON-BEN)', url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/tax-return/completing-a-tax-return/deductions-credits-expenses/ontario-trillium-benefit-on-ben.html', category: 'Personal' },
    { label: 'RRSP Contribution Room (My Account)', url: 'https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html', category: 'Personal' },
    { label: 'HST/GST for Businesses', url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html', category: 'Business' },
    { label: 'Corporate T2 Guide', url: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4012.html', category: 'Corporate' },
  ];

  const categories = ['Personal', 'Business', 'Corporate', 'CRA'];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-slate-600 mb-2">{t('subtitle')}</p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            All links open on official government websites.
          </p>
        </div>

        {categories.map((cat) => {
          const catLinks = links.filter((l) => l.category === cat);
          if (!catLinks.length) return null;
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">{cat}</h2>
              <div className="space-y-2">
                {catLinks.map(({ label, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-[#15803d] hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-800 group-hover:text-[#15803d] transition-colors">{label}</span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#15803d] text-[18px]">open_in_new</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}

        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-8 text-center mt-8">
          <span className="material-symbols-outlined text-[#15803d] text-[40px] block mb-3">folder_open</span>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('comingSoon')}</h3>
          <p className="text-sm text-slate-600">Downloadable tax organizer checklists and templates for personal, self-employed, and corporate filers.</p>
        </div>
      </div>
    </div>
  );
}
