import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/contact/ContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('contactTitle') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations('Contact');

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">{t('title')}</h1>
          <p className="text-lg text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <ContactForm />
          </div>

          {/* Sidebar info */}
          <div className="space-y-8">

            {/* Accountant card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative min-h-[280px]">
                  <Image
                    src="/images/raj-rasaratnam.png"
                    alt="Raj Rasaratnam"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-slate-900 font-heading">{t('accountant.name')}</h3>
                  <p className="text-[#15803d] font-medium mb-4">{t('accountant.title')}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{t('accountant.bio')}</p>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon="location_on" label={t('info.location')} value={t('info.locationValue')} />
              <InfoCard icon="alternate_email" label={t('info.email')} value={t('info.emailValue')} />
              <div className="sm:col-span-2">
                <InfoCard icon="schedule" label={t('info.hours')} value={t('info.hoursValue')} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className="text-[#15803d]">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="font-bold text-sm text-slate-900">{label}</h4>
        <p className="text-sm text-slate-600 mt-1">{value}</p>
      </div>
    </div>
  );
}
