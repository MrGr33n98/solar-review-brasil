'use client';

import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for accessibility

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/empresas?q=${encodeURIComponent(searchTerm)}`);
    } else {
      // Optional: Focus the input if the search term is empty
      searchInputRef.current?.focus();
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Encontre as Melhores Empresas de Energia Solar
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compare avaliações, preços e serviços dos principais instaladores solares do Brasil
          </p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto mb-8">
            <div className="flex-1">
              <Input
                ref={searchInputRef} // Attach the ref
                type="search" // Use type="search" for better UX
                id="search-term" // Add an ID for accessibility
                placeholder="Busque por cidade ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                aria-label="Search for solar companies by city or company name" // Accessibility
                required // Suggest adding 'required' if search is important
              />
            </div>
            <Button type="submit" className="h-12 px-6 w-full md:w-auto"> {/* Full width on small screens */}
              <Search className="h-5 w-5 mr-2" aria-hidden="true" /> {/* Hide icon from screen readers */}
              Buscar
            </Button>
          </form>

          <Button variant="outline" className="text-white" aria-label="Learn how our service works"> {/* Accessibility */}
            Como Funciona
            <ChevronRight className="h-4 w-4 ml-2" aria-hidden="true" /> {/* Hide icon from screen readers */}
          </Button>
        </div>
      </div>
    </section>
  );
}