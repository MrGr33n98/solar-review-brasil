'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Carregando...</div>
    </div>
  );
};

const HomeClient = dynamic(() => import('@/components/home-client'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default function HomeWrapper() {
  return <HomeClient />;
}
