'use client';

import { Shield, Star, Zap } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Avaliações Verificadas</h3>
            <p className="text-gray-600">
              Todas as avaliações são de clientes reais que instalaram sistemas solares
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Empresas Qualificadas</h3>
            <p className="text-gray-600">
              Trabalhamos apenas com empresas certificadas e com histórico comprovado
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comparação Fácil</h3>
            <p className="text-gray-600">
              Compare preços, serviços e avaliações para fazer a melhor escolha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
