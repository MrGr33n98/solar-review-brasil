import Link from 'next/link';
import { Sun, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-900">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4" aria-label="Ir para página inicial">
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                SolarReviews<span className="text-blue-400">Brasil</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              A maior plataforma de avaliações de empresas de energia solar do Brasil. 
              Conectamos consumidores a instaladores qualificados e confiáveis.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contato@solarreviewsbrasil.com.br</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/empresas" className="text-gray-400 hover:text-white transition-colors">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/calculadora" className="text-gray-400 hover:text-white transition-colors">
                  Calculadora Solar
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-white">Para Empresas</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/empresa/cadastro" className="text-gray-400 hover:text-white transition-colors">
                  Cadastre sua Empresa
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-gray-400 hover:text-white transition-colors">
                  Planos Premium
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Área da Empresa
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-gray-400 hover:text-white transition-colors">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}