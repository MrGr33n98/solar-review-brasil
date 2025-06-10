'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
// ...existing imports...

export default function HomeContent() {
  const router = useRouter();

  const handleSearch = useCallback(async (query: string, location?: string) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    router.push(`/empresas?${searchParams.toString()}`);
  }, [router]);

  // ...existing features array...

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      
      <main>
        {/* ...existing JSX content... */}
      </main>

      <Footer />
    </div>
  );
}
