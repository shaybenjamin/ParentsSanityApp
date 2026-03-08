'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { PlaylistCard } from '@/components/features/media/PlaylistCard';
import { PlaylistDetail } from '@/components/features/media/PlaylistDetail';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { mediaApi } from '@/lib/api/media';
import type { Playlist, PlaylistMood } from '@family-hub/shared';

type FilterMood = 'all' | PlaylistMood;

export default function MediaPage() {
  const t = useTranslations('media');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMood, setFilterMood] = useState<FilterMood>(
    (searchParams.get('mood') as PlaylistMood | null) ?? 'all',
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    loadPlaylists();
  }, [filterMood]);

  async function loadPlaylists() {
    setLoading(true);
    try {
      const data = await mediaApi.getPlaylists({
        mood: filterMood === 'all' ? undefined : filterMood,
      });
      setPlaylists(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleFavorite(id: string) {
    await mediaApi.toggleFavorite(id);
    setPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)),
    );
  }

  async function handleOpen(id: string) {
    const playlist = await mediaApi.getPlaylist(id);
    setSelectedPlaylist(playlist);
  }

  const MOOD_FILTERS: FilterMood[] = ['all', 'CALM', 'ENERGETIC', 'BEDTIME', 'BACKGROUND'];

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>

      {/* Mood filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {MOOD_FILTERS.map((mood) => (
          <button
            key={mood}
            onClick={() => setFilterMood(mood)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterMood === mood
                ? 'bg-sage-500 text-white'
                : 'bg-sand-100 text-gray-600'
            }`}
          >
            {mood === 'all'
              ? t('playlists')
              : t(`moods.${mood}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : playlists.length === 0 ? (
        <EmptyState icon="🎵" title={t('noPlaylists')} />
      ) : (
        <div className="space-y-2.5">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onFavorite={handleFavorite}
              onOpen={handleOpen}
            />
          ))}
        </div>
      )}

      {selectedPlaylist && (
        <PlaylistDetail
          playlist={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
        />
      )}
    </div>
  );
}
