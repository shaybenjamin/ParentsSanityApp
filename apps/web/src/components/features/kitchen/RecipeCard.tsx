'use client';

import type { Recipe } from '@family-hub/shared';
import { useLocale, useTranslations } from 'next-intl';
import { Star, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onFavorite?: (id: string) => void;
  onOpen?: (recipe: Recipe) => void;
}

const mealTypeEmoji: Record<string, string> = {
  BREAKFAST: '🍳',
  LUNCH: '🥣',
  DINNER: '🍲',
  SNACK: '🍎',
};

const difficultyColor: Record<string, 'sage' | 'warm' | 'sand'> = {
  EASY: 'sage',
  MEDIUM: 'sand',
  HARD: 'warm',
};

export function RecipeCard({ recipe, onFavorite, onOpen }: RecipeCardProps) {
  const locale = useLocale();
  const t = useTranslations('kitchen');

  const title = locale === 'he' ? recipe.titleHe : recipe.title;
  const description = locale === 'he' ? recipe.descriptionHe : recipe.description;

  return (
    <Card
      padding="md"
      className="flex items-start gap-3 cursor-pointer hover:border-sage-300 transition-colors"
      onClick={() => onOpen?.(recipe)}
    >
      <div className="w-11 h-11 rounded-xl bg-sand-100 flex items-center justify-center text-xl shrink-0">
        {mealTypeEmoji[recipe.mealType] ?? '🍽️'}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 leading-tight">{title}</h3>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{description}</p>
        )}
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <Badge variant={difficultyColor[recipe.difficulty]}>
            {t(`difficulty.${recipe.difficulty}`)}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} />
            {t('prepTime', { min: recipe.prepMinutes })}
          </div>
          {recipe.toddlerFriendly && (
            <span className="text-xs text-sage-600">👶 {t('toddlerFriendly')}</span>
          )}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onFavorite?.(recipe.id);
        }}
        className="p-1.5 tap-target shrink-0"
      >
        <Star
          size={15}
          className={cn(
            recipe.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-gray-200',
          )}
        />
      </button>
    </Card>
  );
}
