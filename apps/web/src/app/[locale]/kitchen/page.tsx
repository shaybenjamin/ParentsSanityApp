'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { RecipeCard } from '@/components/features/kitchen/RecipeCard';
import { RecipeDetail } from '@/components/features/kitchen/RecipeDetail';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { kitchenApi } from '@/lib/api/kitchen';
import type { Recipe, MealType } from '@family-hub/shared';

type FilterMealType = 'all' | MealType;

export default function KitchenPage() {
  const t = useTranslations('kitchen');
  const locale = useLocale();
  const searchParams = useSearchParams();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterMealType, setFilterMealType] = useState<FilterMealType>(
    (searchParams.get('mealType') as MealType | null) ?? 'all',
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadRecipes();
  }, [filterMealType]);

  async function loadRecipes() {
    setLoading(true);
    try {
      const data = await kitchenApi.getAll({
        mealType: filterMealType === 'all' ? undefined : filterMealType,
      });
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleFavorite(id: string) {
    await kitchenApi.toggleFavorite(id);
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r)),
    );
  }

  const MEAL_TYPES: FilterMealType[] = ['all', 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-xl font-bold text-gray-800">{t('title')}</h1>

      {/* Meal type filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {MEAL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilterMealType(type)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterMealType === type
                ? 'bg-sage-500 text-white'
                : 'bg-sand-100 text-gray-600'
            }`}
          >
            {type === 'all' ? t('recipes') : t(`mealTypes.${type}`)}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : recipes.length === 0 ? (
        <EmptyState icon="🍽️" title={t('noRecipes')} />
      ) : (
        <div className="space-y-2.5">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onFavorite={handleFavorite}
              onOpen={setSelectedRecipe}
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
