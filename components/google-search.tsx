'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { companies, brazilianStates } from '@/lib/data';

interface SearchSuggestion {
  type: 'company' | 'city' | 'state' | 'specialty';
  value: string;
  label: string;
  subtitle?: string;
}

interface GoogleSearchProps {
  onSearch: (query: string, location?: string) => void;
  placeholder?: string;
}

export function GoogleSearch({ onSearch, placeholder = "Buscar empresas de energia solar..." }: GoogleSearchProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');
  const searchRef = useRef<HTMLDivElement>(null);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          // For demo purposes, we'll simulate a location
          setUserLocation('São Paulo, SP');
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: SearchSuggestion[] = [];

    // Company suggestions
    companies
      .filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3)
      .forEach(company => {
        newSuggestions.push({
          type: 'company',
          value: company.name,
          label: company.name,
          subtitle: `${company.location.city}, ${company.location.state}`
        });
      });

    // City suggestions
    const cities = [...new Set(companies.map(c => c.location.city))];
    cities
      .filter(city => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .forEach(city => {
        newSuggestions.push({
          type: 'city',
          value: city,
          label: city,
          subtitle: 'Cidade'
        });
      });

    // State suggestions
    brazilianStates
      .filter(state => 
        state.name.toLowerCase().includes(query.toLowerCase()) ||
        state.code.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 2)
      .forEach(state => {
        newSuggestions.push({
          type: 'state',
          value: state.name,
          label: state.name,
          subtitle: 'Estado'
        });
      });

    // Specialty suggestions
    const specialties = [...new Set(companies.flatMap(c => c.specialties))];
    specialties
      .filter(specialty => specialty.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 2)
      .forEach(specialty => {
        newSuggestions.push({
          type: 'specialty',
          value: specialty,
          label: specialty,
          subtitle: 'Especialidade'
        });
      });

    setSuggestions(newSuggestions);
  }, [query]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery?: string, searchLocation?: string) => {
    const finalQuery = searchQuery || query;
    const finalLocation = searchLocation || location;
    
    if (finalQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [finalQuery, ...recentSearches.filter(s => s !== finalQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recent_searches', JSON.stringify(newRecentSearches));
      
      onSearch(finalQuery, finalLocation);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'city' || suggestion.type === 'state') {
      setLocation(suggestion.value);
      setQuery('');
    } else {
      setQuery(suggestion.value);
    }
    handleSearch(suggestion.value, suggestion.type === 'city' || suggestion.type === 'state' ? suggestion.value : location);
  };

  const clearRecentSearch = (searchTerm: string) => {
    const newRecentSearches = recentSearches.filter(s => s !== searchTerm);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recent_searches', JSON.stringify(newRecentSearches));
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'company': return <Search className="h-4 w-4 text-blue-600" />;
      case 'city':
      case 'state': return <MapPin className="h-4 w-4 text-green-600" />;
      case 'specialty': return <Badge className="h-4 w-4 text-purple-600" />;
      default: return <Search className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="flex rounded-full border border-gray-300 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="pl-12 pr-4 py-3 border-0 rounded-l-full focus:ring-0 text-lg"
            />
          </div>
          
          {/* Location Input */}
          <div className="w-px bg-gray-300"></div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={userLocation || "Sua localização"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="pl-12 pr-4 py-3 border-0 rounded-r-full focus:ring-0 text-lg"
            />
          </div>
          
          <Button
            onClick={() => handleSearch()}
            className="rounded-full bg-blue-600 hover:bg-blue-700 px-6 mx-2 my-1"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardContent className="p-0">
            {/* Recent Searches */}
            {recentSearches.length > 0 && query.length === 0 && (
              <div className="p-4 border-b">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Buscas recentes
                </h4>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <button
                        onClick={() => handleSearch(search)}
                        className="flex-1 text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => clearRecentSearch(search)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded"
                      >
                        <X className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded text-left"
                  >
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{suggestion.label}</div>
                      {suggestion.subtitle && (
                        <div className="text-xs text-gray-500">{suggestion.subtitle}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {query.length >= 2 && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhuma sugestão encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}