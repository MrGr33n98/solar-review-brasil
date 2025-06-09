'use client';

import { useRouter } from 'next/navigation';
import Hero from '@/components/hero';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import ContactCTA from '@/components/contact-cta';
import { CompanySearch } from '@/components/company-search';
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
    <main>
      <Hero />
      <CompanySearch onSearch={handleSearch} />
      <Features />
      <HowItWorks />
      <ContactCTA />
    </main>
  );
}
