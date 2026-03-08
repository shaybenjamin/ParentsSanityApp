'use client';

import type { DailyItem } from '@family-hub/shared';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodayProgressProps {
  items: DailyItem[];
  onToggle?: (id: string, isCompleted: boolean) => void;
}

export function TodayProgress({ items, onToggle }: TodayProgressProps) {
  const t = useTranslations('dashboard');

  const completed = items.filter((i) => i.isCompleted).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (total === 0) return null;

  const upcoming = items.filter((i) => !i.isCompleted).slice(0, 3);

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-sand-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 shrink-0">
          {t('progressLabel', { completed, total })}
        </span>
      </div>

      {/* Upcoming items */}
      <div className="space-y-1.5">
        {upcoming.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle?.(item.id, !item.isCompleted)}
            className={cn(
              'w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors',
              item.isCompleted ? 'opacity-50' : 'hover:bg-sand-50',
            )}
          >
            {item.isCompleted ? (
              <CheckCircle2 size={16} className="text-sage-500 shrink-0" />
            ) : (
              <Circle size={16} className="text-gray-300 shrink-0" />
            )}
            <span className="text-sm">
              {item.icon && <span className="me-1">{item.icon}</span>}
              {item.title}
            </span>
            <span className="ms-auto text-xs text-gray-400">{item.startTime}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
