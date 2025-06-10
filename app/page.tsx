import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

export const metadata: Metadata = {
  title: 'Solar Review Brasil',
  description: 'Compare as melhores empresas de energia solar do Brasil',
};

const LoadingSpinner = () => {
  return React.createElement('div', {
    className: 'min-h-screen flex items-center justify-center',
    children: React.createElement('div', {
      className: 'text-2xl text-gray-600',
      children: 'Carregando...',
    }),
  });
};

const HomeClient = dynamic(() => import('@/components/home-client'), {
  ssr: false,
  loading: LoadingSpinner,
});

export default function Page() {
  return React.createElement(HomeClient);
}
