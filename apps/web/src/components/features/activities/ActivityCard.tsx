'use client';

import type { Activity } from '@family-hub/shared';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Clock, Home, TreePine } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onFavorite?: (id: string) => void;
  onSelect?: (id: string) => void;
}

const categoryColors: Record<string, 'sage' | 'warm' | 'sand'> = {
  CREATIVE: 'warm',
  PHYSICAL: 'sage',
  SENSORY: 'sand',
  COGNITIVE: 'sage',
  MUSIC: 'warm',
  OUTDOOR: 'sage',
  QUIET: 'sand',
  SOCIAL: 'warm',
};

export function ActivityCard({ activity, onFavorite, onSelect }: ActivityCardProps) {
  const locale = useLocale();
  const t = useTranslations('activities');

  const title = locale === 'he' ? activity.titleHe : activity.title;
  const description = locale === 'he' ? activity.descriptionHe : activity.description;
  const materials = locale === 'he' ? activity.materialsHe : activity.materials;

  return (
    <Card
      padding="md"
      className="flex flex-col gap-2 cursor-pointer hover:border-sage-300 transition-colors active:scale-[0.99]"
      onClick={() => onSelect?.(activity.id)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 leading-tight">{title}</h3>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(activity.id);
          }}
          className="shrink-0 p-1 rounded-lg tap-target"
        >
          <Star
            size={16}
            className={cn(
              'transition-colors',
              activity.isFavorite
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200',
            )}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <Badge variant={categoryColors[activity.category] ?? 'default'}>
          {t(`categories.${activity.category}`)}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={11} />
          {activity.durationMin} min
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          {activity.isIndoor ? <Home size={11} /> : <TreePine size={11} />}
          {activity.isIndoor ? t('indoor') : t('outdoor')}
        </div>
      </div>

      {materials.length > 0 && (
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {t('materials')}: {materials.join(', ')}
        </p>
      )}
    </Card>
  );
}
