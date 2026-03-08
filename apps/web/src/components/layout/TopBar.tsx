'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Settings } from 'lucide-react';
import { useLocale } from 'next-intl';

export function TopBar() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === 'en' ? 'he' : 'en';

  function switchLocale() {
    // Replace current locale prefix with the other one
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-sand-200">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-semibold text-sage-700 text-lg tracking-tight">
          {t('appName')}
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={switchLocale}
            className="text-xs font-medium px-2.5 py-1 rounded-full bg-sand-100 text-gray-600 hover:bg-sand-200 transition-colors tap-target flex items-center"
            aria-label="Switch language"
          >
            {otherLocale === 'he' ? 'עב' : 'EN'}
          </button>

          <Link
            href={`/${locale}/settings`}
            className="p-2 rounded-full text-gray-500 hover:text-sage-600 hover:bg-sage-50 transition-colors tap-target flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
