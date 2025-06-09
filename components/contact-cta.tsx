'use client';

import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactCTA() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Pronto para economizar com energia solar?</h2>
        <p className="text-lg text-blue-100">Fale com as empresas parceiras e solicite um orçamento sem compromisso.</p>
        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          <Link href="/contato">
            <Mail className="h-5 w-5 mr-2" />Entrar em Contato
          </Link>
        </Button>
      </div>
    </section>
  );
}
