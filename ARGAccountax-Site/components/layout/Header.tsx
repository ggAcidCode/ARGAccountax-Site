'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageToggle from './LanguageToggle';

const toolLinks = [
  { key: 'incomeTax', href: '/tools/income-tax-calculator' as const, icon: 'calculate' },
  { key: 'rrsp', href: '/tools/rrsp-estimator' as const, icon: 'savings' },
  { key: 'deadlines', href: '/deadlines' as const, icon: 'calendar_month' },
  { key: 'resources', href: '/resources' as const, icon: 'folder_open' },
];

export default function Header() {
  const t = useTranslations('Nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

            {/* Tools dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1 text-slate-600 hover:text-[#15803d] transition-colors"
              >
                {t('tools')}
                <span className={`material-symbols-outlined text-[16px] transition-transform ${toolsOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {toolsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2"
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  {toolLinks.map(({ key, href, icon }) => (
                    <Link
                      key={key}
                      href={href}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0fdf4] transition-colors"
                      onClick={() => setToolsOpen(false)}
                    >
                      <span className="material-symbols-outlined text-[#15803d] text-[20px]">{icon}</span>
                      <span className="text-slate-700 hover:text-[#15803d]">{t(`toolsDropdown.${key}`)}</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      href="/tools"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f0fdf4] transition-colors"
                      onClick={() => setToolsOpen(false)}
                    >
                      <span className="material-symbols-outlined text-slate-400 text-[20px]">apps</span>
                      <span className="text-slate-500 text-xs font-medium">{t('viewAllTools')}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" className="text-slate-600 hover:text-[#15803d] transition-colors">
              {t('blog')}
            </Link>
            <Link
              href="/contact"
              className="bg-[#15803d] hover:bg-[#166534] text-white px-5 py-2 rounded-lg transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Language toggle + mobile menu */}
          <div className="flex items-center gap-3">
            <LanguageToggle label={t('toggleLanguage')} />
            <button
              className="md:hidden text-slate-600 p-1"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>
              {t('home')}
            </MobileLink>

            {/* Mobile tools accordion */}
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-[#15803d] hover:bg-[#f0fdf4] rounded-lg transition-colors"
            >
              {t('tools')}
              <span className={`material-symbols-outlined text-[16px] transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            {mobileToolsOpen && (
              <div className="pl-4 space-y-1">
                {toolLinks.map(({ key, href, icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-[#15803d] hover:bg-[#f0fdf4] rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="material-symbols-outlined text-[#15803d] text-[18px]">{icon}</span>
                    {t(`toolsDropdown.${key}`)}
                  </Link>
                ))}
                <Link
                  href="/tools"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-[#15803d] hover:bg-[#f0fdf4] rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="material-symbols-outlined text-slate-400 text-[18px]">apps</span>
                  {t('viewAllTools')}
                </Link>
              </div>
            )}

            <MobileLink href="/blog" onClick={() => setMobileOpen(false)}>
              {t('blog')}
            </MobileLink>

            <Link
              href="/contact"
              className="block text-center bg-[#15803d] hover:bg-[#166534] text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: '/' | '/blog';
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-[#15803d] hover:bg-[#f0fdf4] rounded-lg transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
