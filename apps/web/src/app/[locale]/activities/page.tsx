'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Shuffle } from 'lucide-react';
import { ActivityCard } from '@/components/features/activities/ActivityCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { activitiesApi } from '@/lib/api/activities';
import type { Activity, ActivityCategory, EnergyLevel } from '@family-hub/shared';

type FilterLocation = 'all' | 'indoor' | 'outdoor';
type FilterEnergy = 'all' | EnergyLevel;

export default function ActivitiesPage() {
  const t = useTranslations('activities');
  const locale = useLocale();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Activity | null>(null);

  const [filterLocation, setFilterLocation] = useState<FilterLocation>('all');
  const [filterEnergy, setFilterEnergy] = useState<FilterEnergy>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  useEffect(() => {
    loadActivities();
  }, [filterLocation, filterEnergy, favoritesOnly]);

  async function loadActivities() {
    setLoading(true);
    try {
      const data = await activitiesApi.getAll({
        isIndoor:
          filterLocation === 'all'
            ? undefined
            : filterLocation === 'indoor',
        energyLevel: filterEnergy === 'all' ? undefined : filterEnergy,
        favoritesOnly,
      });
      setActivities(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleFavorite(id: string) {
    await activitiesApi.toggleFavorite(id);
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, isFavorite: !a.isFavorite } : a,
      ),
    );
  }

  async function handleSuggest() {
    const act = await activitiesApi.suggest({
      isIndoor: filterLocation === 'all' ? undefined : filterLocation === 'indoor',
      energyLevel: filterEnergy === 'all' ? undefined : filterEnergy,
    });
    setSuggestion(act);
  }

  const ENERGY_OPTIONS: FilterEnergy[] = ['all', 'LOW', 'MEDIUM', 'HIGH'];
  const LOCATION_OPTIONS: FilterLocation[] = ['all', 'indoor', 'outdoor'];

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>
        <Button size="sm" variant="outline" onClick={handleSuggest}>
          <Shuffle size={14} />
          {t('suggest')}
        </Button>
      </div>

      {/* Suggestion Card */}
      {suggestion && (
        <Card className="border-sage-200 bg-sage-50">
          <div className="flex items-start justify-between mb-1">
            <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
              Suggested for now
            </p>
            <button
              onClick={() => setSuggestion(null)}
              className="text-gray-400 text-xs hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="font-semibold text-gray-800">
            {locale === 'he' ? suggestion.titleHe : suggestion.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {suggestion.durationMin} min •{' '}
            {suggestion.isIndoor ? t('indoor') : t('outdoor')}
          </p>
        </Card>
      )}

      {/* Filters */}
      <div className="space-y-2">
        {/* Energy */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {ENERGY_OPTIONS.map((e) => (
            <button
              key={e}
              onClick={() => setFilterEnergy(e)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterEnergy === e
                  ? 'bg-sage-500 text-white'
                  : 'bg-sand-100 text-gray-600'
              }`}
            >
              {e === 'all' ? t('filters.all') : t(`energyLevels.${e}`)}
            </button>
          ))}
        </div>

        {/* Location + Favorites */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {LOCATION_OPTIONS.map((l) => (
            <button
              key={l}
              onClick={() => setFilterLocation(l)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterLocation === l
                  ? 'bg-sage-500 text-white'
                  : 'bg-sand-100 text-gray-600'
              }`}
            >
              {l === 'all' ? t('filters.all') :
               l === 'indoor' ? `🏠 ${t('indoor')}` : `🌿 ${t('outdoor')}`}
            </button>
          ))}
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              favoritesOnly
                ? 'bg-amber-400 text-white'
                : 'bg-sand-100 text-gray-600'
            }`}
          >
            ⭐ {t('filters.favoritesOnly')}
          </button>
        </div>
      </div>

      {/* Activity list */}
      {loading ? (
        <PageLoader />
      ) : activities.length === 0 ? (
        <EmptyState icon="🎮" title={t('noActivities')} />
      ) : (
        <div className="space-y-3">
          {activities.map((act) => (
            <ActivityCard
              key={act.id}
              activity={act}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
