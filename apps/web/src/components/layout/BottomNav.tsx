'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Home, Calendar, Zap, Music2, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  href: string;
  icon: React.ElementType;
  label: string;
}

export function BottomNav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const items: NavItem[] = [
    { key: 'home', href: `/${locale}`, icon: Home, label: t('home') },
    { key: 'schedule', href: `/${locale}/schedule`, icon: Calendar, label: t('schedule') },
    { key: 'activities', href: `/${locale}/activities`, icon: Zap, label: t('activities') },
    { key: 'media', href: `/${locale}/media`, icon: Music2, label: t('media') },
    { key: 'kitchen', href: `/${locale}/kitchen`, icon: ChefHat, label: t('kitchen') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-sand-200">
      <div className="max-w-2xl mx-auto flex items-center justify-around h-16 px-2">
        {items.map(({ key, href, icon: Icon, label }) => {
          const isActive =
            key === 'home' ? pathname === `/${locale}` : pathname.startsWith(href);
          return (
            <Link
              key={key}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors tap-target',
                isActive
                  ? 'text-sage-600'
                  : 'text-gray-400 hover:text-gray-600',
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
