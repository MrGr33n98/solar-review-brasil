'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Pronto para Começar sua Jornada Solar?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Compare orçamentos gratuitos de instaladores solares qualificados na sua região
        </p>
        <Link href="/empresas">
          <Button size="lg" variant="secondary">
            Encontrar Empresas
          </Button>
        </Link>
      </div>
    </section>
  );
}
