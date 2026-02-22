'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

type Props = {
  label: string;
};

export default function LanguageToggle({ label }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const targetLocale = locale === 'en' ? 'ta' : 'en';

  const handleToggle = () => {
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-full transition-all hover:border-slate-300 cursor-pointer"
      aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Tamil'}`}
    >
      <span className="material-symbols-outlined text-[18px]">language</span>
      <span>{label}</span>
    </button>
  );
}
