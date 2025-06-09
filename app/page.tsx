'use client';

import Link from 'next/link';
import { Search, Star, Award, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BannerCarousel } from '@/components/banner-carousel';
import { CompanyCard } from '@/components/company-card';
import { SolarCalculator } from '@/components/solar-calculator';
import { GoogleSearch } from '@/components/google-search';
import { companies } from '@/lib/data';

export default function Home() {
  const premiumCompanies = companies.filter(company => 
    company.planType === 'premium' || company.planType === 'enterprise'
  );

  const handleSearch = (query: string, location?: string) => {
    // In a real app, this would navigate to search results
    console.log('Search:', query, 'Location:', location);
    // For now, redirect to companies page
    window.location.href = `/empresas?q=${encodeURIComponent(query)}${location ? `&location=${encodeURIComponent(location)}` : ''}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Encontre as Melhores
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                {' '}Empresas de Energia Solar
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Conectamos você aos instaladores mais confiáveis do Brasil. 
              Avaliações reais, orçamentos transparentes e a melhor experiência em energia solar.
            </p>
            
            {/* Google-style Search */}
            <div className="mb-8">
              <GoogleSearch onSearch={handleSearch} />
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/empresas">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Encontrar Empresas
                </Button>
              </Link>
              <Link href="/calculadora">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  Calcular Economia
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Empresas Cadastradas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">15K+</div>
              <div className="text-gray-600">Avaliações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">25K+</div>
              <div className="text-gray-600">Instalações</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>

          {/* Banner Carousel */}
          <BannerCarousel />
        </div>
      </section>

      {/* Solar Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SolarCalculator />
        </div>
      </section>

      {/* Premium Companies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Empresas Premium
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Instaladores verificados e avaliados pelos nossos especialistas. 
              Qualidade garantida e atendimento excepcional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {premiumCompanies.slice(0, 6).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/empresas">
              <Button size="lg" variant="outline" className="px-8">
                Ver Todas as Empresas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Encontre a empresa ideal em 3 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Pesquise</h3>
              <p className="text-gray-600">
                Use nossa calculadora e filtre empresas por localização, especialidade e avaliações.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Compare</h3>
              <p className="text-gray-600">
                Analise avaliações reais, compare orçamentos e converse diretamente com as empresas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Instale</h3>
              <p className="text-gray-600">
                Escolha a melhor opção e tenha seu sistema solar instalado com garantia e suporte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Economizar com Energia Solar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Conecte-se com as melhores empresas do Brasil e comece a economizar hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/empresas">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Encontrar Empresas
              </Button>
            </Link>
            <Link href="/calculadora">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Calcular Economia
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}