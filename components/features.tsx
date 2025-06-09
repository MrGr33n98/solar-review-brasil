'use client';

import { ShieldCheck, Star, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o SolarReviews Brasil?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <ShieldCheck className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Empresas Verificadas</h3>
              <p className="text-gray-600">Todas as empresas passam por um processo de validação para garantir mais segurança.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Avaliações Reais</h3>
              <p className="text-gray-600">Confira a experiência de outros clientes e compare a reputação dos instaladores.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Sun className="h-8 w-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ferramentas Exclusivas</h3>
              <p className="text-gray-600">Use nossa calculadora solar e encontre a melhor solução para o seu projeto.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
