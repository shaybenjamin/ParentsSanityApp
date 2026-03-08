import { api } from './client';
import type { DailySchedule, RoutineTemplate } from '@family-hub/shared';

export const scheduleApi = {
  getToday: () => api.get<DailySchedule>('/schedule/today'),
  getDay: (date: string) => api.get<DailySchedule>(`/schedule/day?date=${date}`),
  getTemplates: () => api.get<RoutineTemplate[]>('/schedule/templates'),
  applyTemplate: (templateId: string, date?: string) =>
    api.post<DailySchedule>(
      `/schedule/day/apply-template${date ? `?date=${date}` : ''}`,
      { templateId },
    ),
  toggleItem: (itemId: string, isCompleted: boolean) =>
    api.patch(`/schedule/day/items/${itemId}`, { isCompleted }),
  resetDay: (date?: string) =>
    api.post<DailySchedule>(
      `/schedule/day/reset${date ? `?date=${date}` : ''}`,
      {},
    ),
};
