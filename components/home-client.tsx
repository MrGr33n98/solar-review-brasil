'use client';

import { useRouter } from 'next/navigation';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { ContactCTA } from '@/components/contact-cta';
import { GoogleSearch } from '@/components/google-search';
import { companies } from '@/lib/data';

// Constante para os estilos de fundo.
// Isso melhora a legibilidade e facilita a manutenção, caso você queira ajustar esses valores no futuro.
const BACKGROUND_STYLES = {
  backgroundImage: "url('/images/solar-panels-bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(0.5px) brightness(0.6)', // Aumentado o blur e o brilho para mais destaque
  transform: 'scale(1.1)',
};

export default function HomeClient() {
  const router = useRouter();
  // premiumCompanies não está sendo usado neste componente, então podemos removê-lo
  // const premiumCompanies = companies.filter(
  //   company => company.planType === 'premium' || company.planType === 'enterprise'
  // );

  const handleSearch = (query: string, location?: string) => {
    console.log('Search:', query, 'Location:', location);
    router.push(
      `/empresas?q=${encodeURIComponent(query)}${
        location ? `&location=${encodeURIComponent(location)}` : ''
      }`
    );
  };

  return (
    <main className="min-h-screen">      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Camadas de fundo em ordem de empilhamento */}
        <div className="absolute inset-0 bg-black">
          {/* Camada base sólida preta */}
        </div>

        {/* Camada com a imagem e efeitos */}
        <div className="absolute inset-0 z-[1] opacity-90">
          <div 
            className="absolute inset-0 scale-110 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" 
            style={BACKGROUND_STYLES} 
          />
        </div>

        {/* Overlay de Gradiente com mais transparência */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-br from-black/40 via-transparent to-black/60" />

        {/* Efeito de brilho sutil */}
        <div className="absolute inset-0 z-[3] mix-blend-overlay bg-gradient-radial from-white/10 via-transparent to-transparent" />

        {/* Conteúdo principal da seção Hero */}
        <div className="container relative z-10 mx-auto px-4 py-32">
          <Hero />
          {/* Contêiner de pesquisa com efeito Glassmorphism */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative">
              {/* Efeito de brilho externo */}
              <div className="absolute -inset-0.5 animate-pulse-slow rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-600/30 blur" />
              {/* Card Glassmorphism */}
              <div className="relative rounded-xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
                <GoogleSearch
                  onSearch={handleSearch}
                  className="w-full"
                  placeholder="Digite o nome da cidade ou CEP..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outras Seções do Site */}
      <Features />
      <HowItWorks />
      <ContactCTA />
    </main>
  );
}