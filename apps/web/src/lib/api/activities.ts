import { api } from './client';
import type { Activity, ActivityFilters } from '@family-hub/shared';

function buildQuery(filters: ActivityFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.energyLevel) params.set('energyLevel', filters.energyLevel);
  if (filters.isIndoor !== undefined) params.set('isIndoor', String(filters.isIndoor));
  if (filters.maxDuration) params.set('maxDuration', String(filters.maxDuration));
  if (filters.favoritesOnly) params.set('favoritesOnly', 'true');
  const q = params.toString();
  return q ? `?${q}` : '';
}

export const activitiesApi = {
  getAll: (filters: ActivityFilters = {}) =>
    api.get<Activity[]>(`/activities${buildQuery(filters)}`),
  suggest: (filters: ActivityFilters = {}) =>
    api.get<Activity | null>(`/activities/suggest${buildQuery(filters)}`),
  getById: (id: string) => api.get<Activity>(`/activities/${id}`),
  toggleFavorite: (id: string) => api.patch<Activity>(`/activities/${id}/favorite`),
};
