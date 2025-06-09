import type { Metadata } from 'next';
import HomeClient from '@/components/home-client';

export const metadata: Metadata = {
  title: 'SolarReviews Brasil - Avaliações de Empresas de Energia Solar',
  description: 'Compare avaliações de empresas de energia solar e encontre o melhor instalador para seu projeto fotovoltaico.',
};

export default function Home() {
  return <HomeClient />;
}