'use client';

import { useRouter } from 'next/navigation';
import { GoogleSearch } from '@/components/google-search';
import Features from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { BannerCarousel } from '@/components/banner-carousel';
import { ContactCTA } from '@/components/contact-cta';

const SearchPlaceholder = () => (
  <div className="h-16 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
    <p className="text-white/60">Carregando busca...</p>
  </div>
);

export function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string, location?: string) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    router.push(`/empresas?${searchParams.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: "url('/grid.svg')" }} />
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full filter blur-[128px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full filter blur-[128px] opacity-20" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Encontre a Melhor Empresa Solar Para Você
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compare avaliações, preços e qualidade das principais empresas de energia solar do Brasil
            </p>
            <div className="max-w-2xl mx-auto">
              <GoogleSearch onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Por que escolher Solar Review Brasil?
          </h2>
          <Features />
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            Como Funciona
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* Companies Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Empresas em Destaque
          </h2>
          <BannerCarousel />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactCTA />
        </div>
      </section>
    </main>
  );
}
