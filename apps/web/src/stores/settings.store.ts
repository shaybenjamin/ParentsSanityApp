import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  language: 'en' | 'he';
  childName: string;
  childAgeMonths: number;
  householdName: string;
  setLanguage: (lang: 'en' | 'he') => void;
  setChildName: (name: string) => void;
  setChildAgeMonths: (months: number) => void;
  setHouseholdName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      childName: 'Little One',
      childAgeMonths: 19,
      householdName: 'Our Family',
      setLanguage: (language) => set({ language }),
      setChildName: (childName) => set({ childName }),
      setChildAgeMonths: (childAgeMonths) => set({ childAgeMonths }),
      setHouseholdName: (householdName) => set({ householdName }),
    }),
    { name: 'family-hub-settings' },
  ),
);
