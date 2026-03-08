'use client';

import type { Playlist } from '@family-hub/shared';
import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink, X, Music, Video } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PlaylistDetailProps {
  playlist: Playlist;
  onClose: () => void;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match?.[1] ?? null;
}

export function PlaylistDetail({ playlist, onClose }: PlaylistDetailProps) {
  const locale = useLocale();
  const t = useTranslations('media');

  const title = locale === 'he' ? playlist.titleHe : playlist.title;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end">
      <div className="bg-white w-full max-w-2xl mx-auto rounded-t-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-sand-100">
          <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sand-100 transition-colors tap-target"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-3">
          <div className="space-y-3">
            {playlist.items.map((item, idx) => {
              const itemTitle = locale === 'he' ? item.titleHe : item.title;
              const youtubeId = item.url ? getYouTubeId(item.url) : null;

              return (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs text-gray-300 w-5 text-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{itemTitle}</p>
                    {item.durationSec && (
                      <p className="text-xs text-gray-400">
                        {Math.floor(item.durationSec / 60)}:{String(item.durationSec % 60).padStart(2, '0')}
                      </p>
                    )}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-sand-100 tap-target shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} className="text-sage-500" />
                    </a>
                  )}
                </div>
              );
            })}

            {playlist.items.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No tracks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
