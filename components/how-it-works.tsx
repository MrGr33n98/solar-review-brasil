'use client';

import { Search, Star, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Search className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Encontre Empresas</h3>
              <p className="text-gray-600">Busque instaladores na sua região e filtre por especialidade.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compare Avaliações</h3>
              <p className="text-gray-600">Analise a reputação das empresas através das avaliações verificadas.</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Solicite Orçamentos</h3>
              <p className="text-gray-600">Entre em contato direto com os instaladores e peça uma proposta.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
