'use client';

import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/empresas?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section
      className="relative bg-gray-900 py-20 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=1200')"
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Encontre as Melhores Empresas de Energia Solar
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compare avaliações, preços e serviços dos principais instaladores solares do Brasil
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-4 max-w-xl mx-auto mb-8">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Busque por cidade ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="h-12 px-6">
              <Search className="h-5 w-5 mr-2" />
              Buscar
            </Button>
          </form>

          <Button variant="outline" className="text-white">
            Como Funciona
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}