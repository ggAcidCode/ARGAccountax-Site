import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#15803d] p-2 rounded">
              <span className="material-symbols-outlined text-white text-[22px]">account_balance</span>
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight leading-none text-slate-900">ARG Accountax</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Ontario Tax Specialists</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-slate-600 hover:text-[#15803d] transition-colors">
              {t('home')}
            </Link>
            <Link href="/calculators" className="text-slate-600 hover:text-[#15803d] transition-colors">
              {t('calculators')}
            </Link>
            <Link href="/deadlines" className="text-slate-600 hover:text-[#15803d] transition-colors">
              {t('deadlines')}
            </Link>
            <Link href="/resources" className="text-slate-600 hover:text-[#15803d] transition-colors">
              {t('resources')}
            </Link>
            <Link
              href="/contact"
              className="bg-[#15803d] hover:bg-[#166534] text-white px-5 py-2 rounded-lg transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Language toggle + mobile menu placeholder */}
          <div className="flex items-center gap-3">
            <LanguageToggle label={t('toggleLanguage')} />
            {/* Mobile hamburger — could be expanded in a future iteration */}
            <button className="md:hidden text-slate-600 p-1" aria-label="Open menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
