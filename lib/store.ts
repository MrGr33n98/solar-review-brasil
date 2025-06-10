import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { companies as initialCompanies } from './data';

interface AppState {
  recentSearches: Array<{ query: string; location?: string; timestamp: number }>;
  companies: typeof initialCompanies;
  filteredCompanies: typeof initialCompanies;
  addRecentSearch: (query: string, location?: string) => void;
  clearRecentSearches: () => void;
  filterCompanies: (query: string, location?: string) => void;
  resetCompanies: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      recentSearches: [],
      companies: initialCompanies,
      filteredCompanies: initialCompanies,
      addRecentSearch: (query: string, location?: string) =>
        set((state) => ({
          recentSearches: [
            { query, location, timestamp: Date.now() },
            ...state.recentSearches.filter(
              (s) => s.query !== query || s.location !== location
            ),
          ].slice(0, 5),
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),
      filterCompanies: (query: string, location?: string) =>
        set((state) => {
          const queryLower = query.toLowerCase();
          const locationLower = location?.toLowerCase();

          const filtered = state.companies.filter((company) => {
            const matchesQuery =
              company.name.toLowerCase().includes(queryLower) ||
              company.description?.toLowerCase().includes(queryLower) ||
              company.specialties.some((specialty) =>
                specialty.toLowerCase().includes(queryLower)
              );

            const matchesLocation = !locationLower
              ? true
              : company.location.city.toLowerCase().includes(locationLower) ||
                company.location.state.toLowerCase().includes(locationLower);

            return matchesQuery && matchesLocation;
          });

          return { filteredCompanies: filtered };
        }),
      resetCompanies: () =>
        set((state) => ({ filteredCompanies: state.companies })),
    }),
    {
      name: 'solar-review-store',
    }
  )
);
