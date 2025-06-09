import { Search, Star, Phone } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Como funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Search className="h-8 w-8 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Busque empresas</h3>
            <p className="text-gray-600">Encontre instaladores próximos de você usando nossa pesquisa.</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto text-yellow-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Compare avaliações</h3>
            <p className="text-gray-600">Veja a opinião de outros clientes antes de decidir.</p>
          </div>
          <div className="text-center">
            <Phone className="h-8 w-8 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Entre em contato</h3>
            <p className="text-gray-600">Solicite orçamentos e fale diretamente com a empresa escolhida.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
