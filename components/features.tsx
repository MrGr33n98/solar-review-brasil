import { CheckCircle, Search, Shield } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Por que usar o SolarReviews Brasil?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Empresas Verificadas</h3>
            <p className="text-gray-600">
              Todas as empresas passam por um processo de validação antes de aparecerem aqui.
            </p>
          </div>
          <div className="text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Avaliações Reais</h3>
            <p className="text-gray-600">
              Leia comentários de clientes que já instalaram energia solar.
            </p>
          </div>
          <div className="text-center">
            <Search className="h-8 w-8 mx-auto text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Encontre Rápido</h3>
            <p className="text-gray-600">Use a busca avançada para localizar empresas na sua região.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
