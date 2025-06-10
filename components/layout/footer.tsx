'use client';

import Link from 'next/link';
import { Sun, ArrowRight } from 'lucide-react';

export const Footer = function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Sun className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Solar Review Brasil</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                A plataforma líder que conecta você às melhores empresas de energia solar do Brasil, 
                com transparência total e avaliações verificadas.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label={social}
                  >
                    <span className="text-sm font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
              <ul className="space-y-4">
                {[
                  { href: '/empresas', label: 'Encontrar Empresas' },
                  { href: '/calculadora', label: 'Calculadora Solar' },
                  { href: '/sobre', label: 'Sobre Nós' },
                  { href: '/blog', label: 'Blog' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                {[
                  { href: '/privacidade', label: 'Política de Privacidade' },
                  { href: '/termos', label: 'Termos de Uso' },
                  { href: '/cookies', label: 'Política de Cookies' },
                  { href: '/contato', label: 'Contato' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} Solar Review Brasil. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Feito com ❤️ para um Brasil mais sustentável</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
