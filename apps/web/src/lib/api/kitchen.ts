import { api } from './client';
import type { Recipe, RecipeFilters } from '@family-hub/shared';

function buildQuery(filters: RecipeFilters): string {
  const params = new URLSearchParams();
  if (filters.mealType) params.set('mealType', filters.mealType);
  if (filters.difficulty) params.set('difficulty', filters.difficulty);
  if (filters.toddlerFriendly !== undefined)
    params.set('toddlerFriendly', String(filters.toddlerFriendly));
  if (filters.maxPrepMinutes)
    params.set('maxPrepMinutes', String(filters.maxPrepMinutes));
  if (filters.favoritesOnly) params.set('favoritesOnly', 'true');
  const q = params.toString();
  return q ? `?${q}` : '';
}

export const kitchenApi = {
  getAll: (filters: RecipeFilters = {}) =>
    api.get<Recipe[]>(`/kitchen/recipes${buildQuery(filters)}`),
  getQuickSnacks: () => api.get<Recipe[]>('/kitchen/recipes/quick-snacks'),
  getById: (id: string) => api.get<Recipe>(`/kitchen/recipes/${id}`),
  toggleFavorite: (id: string) =>
    api.patch<Recipe>(`/kitchen/recipes/${id}/favorite`),
};
