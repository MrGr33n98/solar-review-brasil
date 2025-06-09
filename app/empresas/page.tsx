'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CompanyCard } from '@/components/company-card';
import { GoogleSearch } from '@/components/google-search';
import { companies, brazilianStates } from '@/lib/data';

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all-states');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all-specialties');
  const [minRating, setMinRating] = useState('any-rating');
  const [planFilter, setPlanFilter] = useState('all-plans');

  // Get unique specialties
  const specialties = useMemo(() => {
    const allSpecialties = companies.flatMap(company => company.specialties);
    return Array.from(new Set(allSpecialties));
  }, []);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesSearch = searchTerm === '' || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.state.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesState = selectedState === 'all-states' || company.location.state === selectedState;
      
      const matchesSpecialty = selectedSpecialty === 'all-specialties' || 
        company.specialties.includes(selectedSpecialty);
      
      const matchesRating = minRating === 'any-rating' || company.rating >= parseFloat(minRating);
      
      const matchesPlan = planFilter === 'all-plans' || company.planType === planFilter;

      return matchesSearch && matchesState && matchesSpecialty && matchesRating && matchesPlan;
    });
  }, [searchTerm, selectedState, selectedSpecialty, minRating, planFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedState('all-states');
    setSelectedSpecialty('all-specialties');
    setMinRating('any-rating');
    setPlanFilter('all-plans');
  };

  const activeFiltersCount = [
    selectedState !== 'all-states' ? selectedState : null,
    selectedSpecialty !== 'all-specialties' ? selectedSpecialty : null,
    minRating !== 'any-rating' ? minRating : null,
    planFilter !== 'all-plans' ? planFilter : null
  ].filter(Boolean).length;

  const handleGoogleSearch = (query: string, location?: string) => {
    setSearchTerm(query);
    if (location) {
      // Try to match location to a state
      const matchedState = brazilianStates.find(state => 
        state.name.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(state.name.toLowerCase())
      );
      if (matchedState) {
        setSelectedState(matchedState.code);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Empresas de Energia Solar
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Encontre as melhores empresas de energia solar verificadas e avaliadas pelos clientes
          </p>
          
          {/* Google Search */}
          <div className="max-w-2xl">
            <GoogleSearch 
              onSearch={handleGoogleSearch}
              placeholder="Buscar empresas por nome, cidade ou especialidade..."
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpar ({activeFiltersCount})
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Nome da empresa..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* State Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os estados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-states">Todos os estados</SelectItem>
                      {brazilianStates.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidade
                  </label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as especialidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-specialties">Todas as especialidades</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação mínima
                  </label>
                  <Select value={minRating} onValueChange={setMinRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qualquer avaliação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-rating">Qualquer avaliação</SelectItem>
                      <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                      <SelectItem value="4.0">4.0+ estrelas</SelectItem>
                      <SelectItem value="3.5">3.5+ estrelas</SelectItem>
                      <SelectItem value="3.0">3.0+ estrelas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Plan Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de conta
                  </label>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-plans">Todos os tipos</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="free">Gratuito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {filteredCompanies.length} {filteredCompanies.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}
                </h3>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro ativo' : 'filtros ativos'}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">Ordenar por:</span>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Avaliação</SelectItem>
                    <SelectItem value="reviews">Nº de avaliações</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedState !== 'all-states' && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{brazilianStates.find(s => s.code === selectedState)?.name}</span>
                  </Badge>
                )}
                {selectedSpecialty !== 'all-specialties' && (
                  <Badge variant="secondary">{selectedSpecialty}</Badge>
                )}
                {minRating !== 'any-rating' && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{minRating}+ estrelas</span>
                  </Badge>
                )}
                {planFilter !== 'all-plans' && (
                  <Badge variant="secondary" className="capitalize">{planFilter}</Badge>
                )}
              </div>
            )}

            {/* Companies Grid */}
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma empresa encontrada
                </h3>
                <p className="text-gray-500 mb-4">
                  Tente ajustar os filtros para encontrar mais resultados.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}