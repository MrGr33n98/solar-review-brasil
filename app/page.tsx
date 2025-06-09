'use client';

import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { Search, Star, Award, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BannerCarousel } from '@/components/banner-carousel';
import { CompanyCard } from '@/components/company-card';
import { SolarCalculator } from '@/components/solar-calculator';
import { GoogleSearch } from '@/components/google-search';
import { companies } from '@/lib/data';
import Hero from '@/components/hero';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import ContactCTA from '@/components/contact-cta';
import { CompanySearch } from '@/components/company-search';

export const metadata: Metadata = {
  title: 'SolarReviews Brasil - Avaliações de Empresas de Energia Solar',
  description: 'Compare avaliações de empresas de energia solar e encontre o melhor instalador para seu projeto fotovoltaico.',
};

export default function Home() {
  const router = useRouter();
  const premiumCompanies = companies.filter(company =>
    company.planType === 'premium' || company.planType === 'enterprise'
  );

  const handleSearch = (query: string, location?: string) => {
    // In a real app, this would navigate to search results
    console.log('Search:', query, 'Location:', location);
    // For now, redirect to companies page using client-side navigation
    router.push(`/empresas?q=${encodeURIComponent(query)}${location ? `&location=${encodeURIComponent(location)}` : ''}`);
  };

  return (
    <main>
      <Hero />
      <CompanySearch onSearch={handleSearch} />
      <Features />
      <HowItWorks />
      <ContactCTA />
    </main>
  );
}