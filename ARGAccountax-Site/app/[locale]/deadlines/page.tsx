import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('deadlinesTitle') };
}

export default async function DeadlinesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DeadlinesContent />;
}

function DeadlinesContent() {
  const t = useTranslations('Deadlines');
  const year = new Date().getFullYear();

  const deadlines = [
    { date: 'April 30, 2025', label: t('personalDeadline'), icon: 'person', color: 'blue' },
    { date: 'June 15, 2025', label: 'Self-Employed T1 Filing Deadline', icon: 'work', color: 'purple' },
    { date: '6 months after year-end', label: t('corporateDeadline'), icon: 'business', color: 'orange' },
    { date: '3 months after year-end', label: t('hstDeadline'), icon: 'receipt', color: 'teal' },
    { date: 'Mar 15, Jun 15, Sep 15, Dec 15', label: t('installments'), icon: 'calendar_month', color: 'slate' },
  ];

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-slate-600">{t('subtitle', { year })}</p>
        </div>

        <div className="space-y-4 mb-10">
          {deadlines.map(({ date, label, icon }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#f0fdf4] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#15803d] text-[20px]">{icon}</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{label}</p>
                <p className="text-sm text-slate-500 mt-0.5">{date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-[#15803d] text-[40px] block mb-3">notifications_active</span>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('comingSoon')}</h3>
          <p className="text-sm text-slate-600">Sign up for email reminders 30, 7, and 1 day before each deadline.</p>
        </div>
      </div>
    </div>
  );
}
