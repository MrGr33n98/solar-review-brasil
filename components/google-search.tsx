'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Clock, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeoLocation } from '@/hooks/use-geo-location';
import { useRecentSearches } from '@/hooks/use-recent-searches';
import { useAppStore } from '@/lib/store';

// Types
interface SearchSuggestion {
  type: 'company' | 'city' | 'state' | 'specialty';
  value: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

interface GoogleSearchProps {
  onSearch: (query: string, location?: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  initialQuery?: string;
  initialLocation?: string;
}

// Suggestion Item Component 
const SuggestionItem = ({ suggestion, onClick }: { suggestion: SearchSuggestion; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-md text-left transition-colors focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-blue-100"
    aria-label={`Selecionar ${suggestion.label}`}
  >
    <span className="flex-shrink-0">
      {suggestion.icon || <Search className="h-4 w-4 text-gray-400" />}
    </span>
    <div className="flex-1 overflow-hidden">
      <div className="text-sm font-medium text-gray-900 truncate">{suggestion.label}</div>
      {suggestion.subtitle && (
        <div className="text-xs text-gray-500 truncate">{suggestion.subtitle}</div>
      )}
    </div>
  </button>
);

// Recent Search Item Component
const RecentSearchItem = ({ search, onClick, onRemove }: { 
  search: string; 
  onClick: () => void;
  onRemove: () => void;
}) => (
  <div className="flex items-center justify-between group">
    <button
      onClick={onClick}
      className="flex-1 text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md group-hover:text-gray-900 transition-colors"
    >
      <span className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="truncate">{search}</span>
      </span>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-full transition-all"
      aria-label={`Remover busca recente: ${search}`}
    >
      <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);

// Extract suggestion generation to a custom hook
function useSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const { companies, brazilianStates } = useAppStore();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const generateSuggestions = () => {
      const newSuggestions: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase();

      companies
        .filter(company => 
          company.name.toLowerCase().includes(queryLower) ||
          company.description?.toLowerCase().includes(queryLower)
        )
        .slice(0, 3)
        .forEach(company => {
          newSuggestions.push({
            type: 'company',
            value: company.name,
            label: company.name,
            subtitle: `${company.location.city}, ${company.location.state}`,
            icon: <Search className="h-4 w-4 text-blue-600" />
          });
        });

      const cities = Array.from(new Set(companies.map(c => c.location.city)));
      cities
        .filter(city => city.toLowerCase().includes(queryLower))
        .slice(0, 3)
        .forEach(city => {
          newSuggestions.push({
            type: 'city',
            value: city,
            label: city,
            subtitle: 'Cidade',
            icon: <MapPin className="h-4 w-4 text-green-600" />
          });
        });

      brazilianStates
        .filter(state => 
          state.name.toLowerCase().includes(queryLower) ||
          state.code.toLowerCase().includes(queryLower)
        )
        .slice(0, 2)
        .forEach(state => {
          newSuggestions.push({
            type: 'state',
            value: state.name,
            label: state.name,
            subtitle: 'Estado',
            icon: <MapPin className="h-4 w-4 text-purple-600" />
          });
        });

      const specialties = [...new Set(companies.flatMap(c => c.specialties || []))];
      specialties
        .filter(specialty => specialty.toLowerCase().includes(queryLower))
        .slice(0, 2)
        .forEach(specialty => {
          newSuggestions.push({
            type: 'specialty',
            value: specialty,
            label: specialty,
            subtitle: 'Especialidade'
          });
        });

      return newSuggestions;
    };

    const timer = setTimeout(() => {
      setSuggestions(generateSuggestions());
    }, 150);

    return () => clearTimeout(timer);
  }, [query, companies, brazilianStates]);

  return suggestions;
}

// Main component
export function GoogleSearch({ 
  onSearch, 
  placeholder = 'Buscar empresas...', 
  className,
  isLoading = false,
  initialQuery = '',
  initialLocation = ''
}: GoogleSearchProps) {
  // State
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const { userLocation, isLocating } = useGeoLocation();
  const { recentSearches, addSearch, removeSearch } = useRecentSearches();
  const { filterCompanies, addRecentSearch } = useAppStore();
  
  // Get suggestions based on query
  const suggestions = useSuggestions(query);

  // Set location from geolocation when available
  useEffect(() => {
    if (userLocation && !location) {
      setLocation(userLocation);
    }
  }, [userLocation, location]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearch = useCallback(async (searchQuery?: string, searchLocation?: string) => {
    const finalQuery = searchQuery || query;
    const finalLocation = searchLocation || location;
      if (finalQuery.trim()) {
      try {
        setIsSearching(true);
        
        // Add to recent searches and filter companies
        addSearch(finalQuery);
        addRecentSearch(finalQuery, finalLocation);
        filterCompanies(finalQuery, finalLocation);
        
        // Execute search callback
        await onSearch(finalQuery, finalLocation);
      } finally {
        setIsSearching(false);
        setShowSuggestions(false);
      }
    }
  }, [query, location, onSearch, addSearch, filterCompanies]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'city' || suggestion.type === 'state') {
      setLocation(suggestion.value);
      setQuery('');
    } else {
      setQuery(suggestion.value);
    }
    handleSearch(suggestion.value, suggestion.type === 'city' || suggestion.type === 'state' ? suggestion.value : location);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div 
      ref={searchRef} 
      className={cn("relative", className)}
      role="search"
      aria-label="Pesquisar empresas de energia solar"
      onKeyDown={handleKeyDown}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="relative flex flex-col md:flex-row gap-2">
        <div className="flex-1 relative">          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Buscar por empresas, cidades ou especialidades"
            className="h-16 pl-14 pr-4 text-xl bg-white/95 rounded-xl border-2 border-gray-100 focus:border-blue-500 shadow-lg transition-colors placeholder:text-gray-400"
            disabled={isLoading || isSearching}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        
        <div className="relative">          <Input
            type="text"
            placeholder={isLocating ? "Localizando..." : userLocation || "Sua localização"}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Digite sua localização"
            className="h-16 pl-14 pr-4 text-xl bg-white/95 rounded-xl border-2 border-gray-100 focus:border-blue-500 shadow-lg transition-colors placeholder:text-gray-400"
            disabled={isLoading || isSearching || isLocating}
          />
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          
          {isLocating && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setLocation(userLocation || '')}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Usar minha localização'
              )}
            </Button>
          )}
        </div>
          <Button 
          type="submit" 
          className="h-16 px-10 text-xl font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Buscar'
          )}
        </Button>
      </form>

      {/* Suggestions Dropdown with Animation */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-gray-100 overflow-hidden">
              <CardContent className="p-0">
                {/* Recent Searches */}
                {recentSearches.length > 0 && query.length === 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 px-2">
                      Buscas recentes
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <RecentSearchItem
                          key={index}
                          search={search}
                          onClick={() => handleSearch(search)}
                          onRemove={() => removeSearch(search)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-3">
                    {suggestions.map((suggestion, index) => (
                      <SuggestionItem 
                        key={index}
                        suggestion={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                      />
                    ))}
                  </div>
                )}

                {/* No results state */}
                {query.length >= 2 && suggestions.length === 0 && (
                  <div className="py-8 text-center text-gray-500">
                    <Search className="h-10 w-10 mx-auto mb-3 text-gray-300" aria-hidden="true" />
                    <p className="text-sm font-medium">Nenhuma sugestão encontrada</p>
                    <p className="text-xs text-gray-400 mt-1">Tente outro termo ou refine sua busca</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Create these two custom hooks - use-geo-location.ts and use-recent-searches.ts