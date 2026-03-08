'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { QuickActionCard } from '@/components/features/dashboard/QuickActionCard';
import { TodayProgress } from '@/components/features/dashboard/TodayProgress';
import { scheduleApi } from '@/lib/api/schedule';
import { activitiesApi } from '@/lib/api/activities';
import { kitchenApi } from '@/lib/api/kitchen';
import { getTimeOfDay } from '@/lib/utils';
import type { DailySchedule, Activity, Recipe } from '@family-hub/shared';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [favoriteActivities, setFavoriteActivities] = useState<Activity[]>([]);
  const [quickRecipes, setQuickRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const timeOfDay = getTimeOfDay();

  useEffect(() => {
    async function load() {
      try {
        const [sched, acts, recipes] = await Promise.all([
          scheduleApi.getToday(),
          activitiesApi.getAll({ favoritesOnly: true }),
          kitchenApi.getQuickSnacks(),
        ]);
        setSchedule(sched);
        setFavoriteActivities(acts.slice(0, 4));
        setQuickRecipes(recipes.slice(0, 3));
      } catch {
        // Silently handle — API may not be running in dev
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleToggleItem(id: string, isCompleted: boolean) {
    await scheduleApi.toggleItem(id, isCompleted);
    const updated = await scheduleApi.getToday();
    setSchedule(updated);
  }

  async function handleSuggestActivity() {
    const activity = await activitiesApi.suggest({ energyLevel: 'LOW' });
    if (activity) router.push(`/${locale}/activities`);
  }

  async function handleQuickSnack() {
    router.push(`/${locale}/kitchen?mealType=SNACK`);
  }

  async function handleBedtimeMusic() {
    router.push(`/${locale}/media?mood=BEDTIME`);
  }

  if (loading) return <PageLoader />;

  const items = schedule?.items ?? [];

  return (
    <div className="space-y-5 py-4">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {t('greeting', { timeOfDay: t(timeOfDay) })} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">{t('today')}</p>
      </div>

      {/* Quick Actions */}
      <section>
        <p className="section-title mb-2">{t('quickActions')}</p>
        <div className="grid grid-cols-3 gap-2.5">
          <QuickActionCard
            icon="🎮"
            label={t('suggestActivity')}
            onClick={handleSuggestActivity}
            color="sage"
          />
          <QuickActionCard
            icon="🍌"
            label={t('quickSnack')}
            onClick={handleQuickSnack}
            color="warm"
          />
          <QuickActionCard
            icon="🌙"
            label={t('bedtimeMusic')}
            onClick={handleBedtimeMusic}
            color="sand"
          />
        </div>
      </section>

      {/* Today's Schedule */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <p className="section-title">{t('todaySchedule')}</p>
          <Link
            href={`/${locale}/schedule`}
            className="text-xs text-sage-600 font-medium flex items-center gap-0.5 hover:underline"
          >
            {t('viewAll')} <ArrowRight size={12} />
          </Link>
        </div>
        <Card>
          {items.length > 0 ? (
            <TodayProgress items={items} onToggle={handleToggleItem} />
          ) : (
            <EmptyState
              icon="📅"
              title={t('noScheduleYet')}
              description={t('applyTemplate')}
            />
          )}
        </Card>
      </section>

      {/* Favorite Activities */}
      {favoriteActivities.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <p className="section-title">{t('favoriteActivities')}</p>
            <Link
              href={`/${locale}/activities`}
              className="text-xs text-sage-600 font-medium flex items-center gap-0.5 hover:underline"
            >
              {t('viewAll')} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {favoriteActivities.map((act) => (
              <Card key={act.id} padding="sm" className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {act.title}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400">{act.durationMin} min</span>
                  <span className="text-[10px] text-gray-300">•</span>
                  <span className="text-[10px] text-gray-400">
                    {act.isIndoor ? '🏠' : '🌿'}
                  </span>
                  <Star size={10} className="text-amber-400 ms-auto" fill="currentColor" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Quick Meals */}
      {quickRecipes.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2">
            <p className="section-title">{t('favoriteRecipes')}</p>
            <Link
              href={`/${locale}/kitchen`}
              className="text-xs text-sage-600 font-medium flex items-center gap-0.5 hover:underline"
            >
              {t('viewAll')} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {quickRecipes.map((recipe) => (
              <Card key={recipe.id} padding="sm">
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {recipe.mealType === 'SNACK' ? '🍎' :
                     recipe.mealType === 'BREAKFAST' ? '🍌' :
                     recipe.mealType === 'LUNCH' ? '🥣' : '🍲'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{recipe.title}</p>
                    <p className="text-xs text-gray-400">{recipe.prepMinutes} min</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
