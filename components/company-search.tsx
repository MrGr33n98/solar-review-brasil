'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function CompanySearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/empresas?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-4">
          <Input
            type="text"
            placeholder="Busque por cidade ou empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </form>
      </div>
    </section>
  );
}
