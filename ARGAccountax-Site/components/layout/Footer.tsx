import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand */}
          <div>
            <span className="font-bold text-lg font-heading">
              <span className="text-slate-900">ARG </span>
              <span className="text-[#15803d]">Accountax</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500">
            <Link href="/contact" className="hover:text-[#15803d] transition-colors">{t('links.contact')}</Link>
            <Link href="/tools" className="hover:text-[#15803d] transition-colors">{t('links.calculators')}</Link>
            <a href="#" className="hover:text-[#15803d] transition-colors">{t('links.privacy')}</a>
            <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#15803d] transition-colors">{t('links.cra')}</a>
          </div>

          {/* Language switcher */}
          <div className="flex items-center bg-slate-100 rounded-full p-1">
            <Link href="/" locale="en" className="px-4 py-1.5 text-xs font-bold rounded-full bg-white shadow-sm text-slate-900 transition-all">
              EN
            </Link>
            <Link href="/" locale="ta" className="px-4 py-1.5 text-xs font-medium rounded-full text-slate-500 hover:text-slate-900 transition-colors font-tamil">
              தமிழ்
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400">{t('copyright', { year })}</p>
          <p className="text-[10px] text-slate-400 mt-2 italic">{t('disclaimer')}</p>
        </div>

      </div>
    </footer>
  );
}
