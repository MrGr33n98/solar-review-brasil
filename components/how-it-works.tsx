'use client';

import { Search, Building2, MessageCircle } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pesquise</h3>
            <p className="text-gray-600">
              Encontre empresas solares na sua região e compare avaliações
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compare</h3>
            <p className="text-gray-600">
              Analise detalhes, preços e avaliações de diferentes empresas
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Contate</h3>
            <p className="text-gray-600">
              Entre em contato com as empresas escolhidas diretamente pela plataforma
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
