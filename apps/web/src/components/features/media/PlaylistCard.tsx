'use client';

import type { Playlist } from '@family-hub/shared';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Music, Video, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: Playlist;
  onFavorite?: (id: string) => void;
  onOpen?: (id: string) => void;
}

const moodEmoji: Record<string, string> = {
  CALM: '🍃',
  ENERGETIC: '⚡',
  BEDTIME: '🌙',
  BACKGROUND: '☁️',
};

const moodColor: Record<string, 'sage' | 'warm' | 'sand'> = {
  CALM: 'sage',
  ENERGETIC: 'warm',
  BEDTIME: 'sand',
  BACKGROUND: 'sage',
};

export function PlaylistCard({ playlist, onFavorite, onOpen }: PlaylistCardProps) {
  const locale = useLocale();
  const t = useTranslations('media');

  const title = locale === 'he' ? playlist.titleHe : playlist.title;
  const trackCount = playlist.items.length;

  return (
    <Card
      padding="md"
      className="flex items-center gap-3 cursor-pointer hover:border-sage-300 transition-colors"
      onClick={() => onOpen?.(playlist.id)}
    >
      <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center shrink-0 text-2xl">
        {moodEmoji[playlist.mood]}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
        <div className="flex items-center gap-2 mt-0.5">
          <Badge variant={moodColor[playlist.mood]}>
            {t(`moods.${playlist.mood}`)}
          </Badge>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            {playlist.type === 'VIDEO' ? <Video size={10} /> : <Music size={10} />}
            {t('tracks', { count: trackCount })}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(playlist.id);
          }}
          className="p-1.5 rounded-lg tap-target"
        >
          <Star
            size={15}
            className={cn(
              playlist.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-gray-200',
            )}
          />
        </button>
        <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
          <Play size={13} className="text-sage-600 ms-0.5" />
        </div>
      </div>
    </Card>
  );
}
