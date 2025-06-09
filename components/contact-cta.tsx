import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="mb-6">Entre em contato e receba orçamentos das melhores empresas de energia solar.</p>
        <Button asChild variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          <Link href="/contato" className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Fale Conosco
          </Link>
        </Button>
      </div>
    </section>
  );
}
