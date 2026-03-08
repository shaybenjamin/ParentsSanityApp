export type Segment = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';

export interface RoutineItem {
  id: string;
  title: string;
  titleHe: string;
  startTime: string; // "HH:mm"
  endTime: string;
  segment: Segment;
  icon?: string;
  order: number;
}

export interface RoutineTemplate {
  id: string;
  name: string;
  nameHe: string;
  isDefault: boolean;
  items: RoutineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface DailyItem {
  id: string;
  title: string;
  titleHe: string;
  startTime: string;
  endTime: string;
  segment: Segment;
  icon?: string;
  isCompleted: boolean;
  order: number;
}

export interface DailySchedule {
  id: string;
  date: string; // ISO date
  items: DailyItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateDailyItemDto {
  title: string;
  titleHe: string;
  startTime: string;
  endTime: string;
  segment: Segment;
  icon?: string;
  order: number;
}

export interface UpdateDailyItemDto {
  title?: string;
  titleHe?: string;
  startTime?: string;
  endTime?: string;
  isCompleted?: boolean;
  icon?: string;
}
