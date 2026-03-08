'use client';

import type { DailyItem } from '@family-hub/shared';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ScheduleItemRowProps {
  item: DailyItem;
  onToggle: (id: string, isCompleted: boolean) => void;
  locale: string;
}

export function ScheduleItemRow({ item, onToggle, locale }: ScheduleItemRowProps) {
  const title = locale === 'he' ? item.titleHe : item.title;

  return (
    <button
      onClick={() => onToggle(item.id, !item.isCompleted)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all',
        item.isCompleted
          ? 'opacity-40 line-through'
          : 'hover:bg-sand-50 active:bg-sand-100',
      )}
    >
      <div className="shrink-0 text-xl w-7 text-center">
        {item.icon ?? '•'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
        <p className="text-xs text-gray-400">
          {item.startTime} – {item.endTime}
        </p>
      </div>
      <div className="shrink-0">
        {item.isCompleted ? (
          <CheckCircle2 size={18} className="text-sage-500" />
        ) : (
          <Circle size={18} className="text-gray-200" />
        )}
      </div>
    </button>
  );
}
