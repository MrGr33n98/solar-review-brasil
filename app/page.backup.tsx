// Copy the entire contents of your current page.tsx here as a backup
'use client';

import { GoogleSearch } from '@/components/google-search';
import { useRouter } from 'next/navigation';
import { Shield, Sun, Medal, Users, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleSearch = (query: string, location?: string) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    router.push(`/empresas?${searchParams.toString()}`);
  };

  return (
    <>
      {/* Hero Section */}
      <main className="min-h-[90vh] flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full filter blur-[128px] opacity-20"></div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Compare e Encontre a Melhor<br />
              <span className="text-blue-400">Energia Solar</span> para Você
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Mais de 500 empresas avaliadas por especialistas e clientes reais
            </p>
            <div className="max-w-3xl mx-auto mb-12">
              <GoogleSearch onSearch={handleSearch} />
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 text-gray-400">
              <span className="flex items-center gap-3 text-lg">
                <CheckCircle className="h-6 w-6" />
                100% Gratuito
              </span>
              <span className="flex items-center gap-3 text-lg">
                <Users className="h-6 w-6" />
                +10.000 Avaliações
              </span>
              <span className="flex items-center gap-3 text-lg">
                <Shield className="h-6 w-6" />
                Empresas Verificadas
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="p-6 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Medal className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Preços</h3>
              <p className="text-gray-600">Encontre os melhores orçamentos de instaladores solares na sua região.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Sun className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Avaliações Reais</h3>
              <p className="text-gray-600">Veja experiências reais de clientes que já instalaram energia solar.</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empresas Verificadas</h3>
              <p className="text-gray-600">Todas as empresas são verificadas e monitoradas constantemente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Empresas em Destaque</h2>
          <div className="max-w-5xl mx-auto flex justify-center items-center gap-16 flex-wrap opacity-50">
            {/* Add your company logos here */}
            <div className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
}