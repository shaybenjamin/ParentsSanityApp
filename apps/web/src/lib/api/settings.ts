import { api } from './client';
import type { Settings, UpdateSettingsDto } from '@family-hub/shared';

export const settingsApi = {
  get: () => api.get<Settings>('/settings'),
  update: (dto: UpdateSettingsDto) => api.patch<Settings>('/settings', dto),
};
