export type ActivityCategory =
  | 'CREATIVE'
  | 'PHYSICAL'
  | 'SENSORY'
  | 'COGNITIVE'
  | 'MUSIC'
  | 'OUTDOOR'
  | 'QUIET'
  | 'SOCIAL';

export type EnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Activity {
  id: string;
  title: string;
  titleHe: string;
  description?: string;
  descriptionHe?: string;
  category: ActivityCategory;
  durationMin: number;
  energyLevel: EnergyLevel;
  isIndoor: boolean;
  materials: string[];
  needsSupervision: boolean;
  ageMinMonths: number;
  ageMaxMonths: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityFilters {
  category?: ActivityCategory;
  energyLevel?: EnergyLevel;
  isIndoor?: boolean;
  maxDuration?: number;
  favoritesOnly?: boolean;
}

export interface CreateActivityDto {
  title: string;
  titleHe: string;
  description?: string;
  descriptionHe?: string;
  category: ActivityCategory;
  durationMin: number;
  energyLevel: EnergyLevel;
  isIndoor: boolean;
  materials?: string[];
  needsSupervision?: boolean;
  ageMinMonths?: number;
  ageMaxMonths?: number;
}
