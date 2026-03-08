export interface Settings {
  id: string;
  language: 'en' | 'he';
  childName: string;
  childAgeMonths: number;
  householdName: string;
  updatedAt: string;
}

export interface UpdateSettingsDto {
  language?: 'en' | 'he';
  childName?: string;
  childAgeMonths?: number;
  householdName?: string;
}
