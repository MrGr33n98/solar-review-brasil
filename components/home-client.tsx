'use client';

import { useRouter } from 'next/navigation';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { HowItWorks } from '@/components/how-it-works';
import { ContactCTA } from '@/components/contact-cta';
import { GoogleSearch } from '@/components/google-search';
import { companies } from '@/lib/data';

export default function HomeClient() {
  const router = useRouter();
  const premiumCompanies = companies.filter(
    company => company.planType === 'premium' || company.planType === 'enterprise'
  );

  const handleSearch = (query: string, location?: string) => {
    console.log('Search:', query, 'Location:', location);
    router.push(
      `/empresas?q=${encodeURIComponent(query)}${
        location ? `&location=${encodeURIComponent(location)}` : ''
      }`
    );
  };

  return (
    <main className="min-h-screen">
      <section className="min-h-[90vh] relative overflow-hidden">
        {/* Background Image with Blur Effect */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: "url('/images/solar-panels-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(01px) brightness(0.5)',
              transform: 'scale(1.1)',
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90" />
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <Hero />
          {/* Glassmorphism Search Container */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-2xl blur" />
              {/* Glass Card */}
              <div className="relative p-8 bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 shadow-2xl">
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
      <Features />
      <HowItWorks />
      <ContactCTA />
    </main>
  );
}
