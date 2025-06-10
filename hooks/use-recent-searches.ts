import { useState, useEffect } from 'react';

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = 'recent_searches';

type UseRecentSearchesReturn = {
  recentSearches: string[];
  addSearch: (search: string) => void;
  removeSearch: (search: string) => void;
  clearSearches: () => void;
};

export function useRecentSearches(): UseRecentSearchesReturn {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const savedSearches = localStorage.getItem(STORAGE_KEY);
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
      // If there's an error (e.g., invalid JSON), reset the storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  // Save searches to localStorage when they change
  const saveSearches = (searches: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  // Add a search term to recent searches
  const addSearch = (search: string) => {
    if (!search.trim()) return;
    
    setRecentSearches(prevSearches => {
      // Remove the search if it already exists
      const filteredSearches = prevSearches.filter(s => s !== search);
      // Add new search to the beginning and limit to max items
      const newSearches = [search, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
      
      saveSearches(newSearches);
      return newSearches;
    });
  };

  // Remove a search term
  const removeSearch = (search: string) => {
    setRecentSearches(prevSearches => {
      const newSearches = prevSearches.filter(s => s !== search);
      saveSearches(newSearches);
      return newSearches;
    });
  };

  // Clear all searches
  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { recentSearches, addSearch, removeSearch, clearSearches };
}