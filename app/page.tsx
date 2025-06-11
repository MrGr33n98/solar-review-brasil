import type { Metadata } from 'next';
import PageClient from '@/components/pages/page-client';

export const metadata: Metadata = {
  title: 'Solar Review Brasil',
  description: 'Compare as melhores empresas de energia solar do Brasil',
};

export default function Page() {
  return <PageClient />;
}
