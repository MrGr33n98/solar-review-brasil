'use client';

import { Metadata } from 'next';
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
  return (
    <main>
      <Hero />
      <CompanySearch />
      <Features />
      <HowItWorks />
      <ContactCTA />
    </main>
  );
}