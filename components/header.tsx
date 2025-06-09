'use client';

import Link from 'next/link';
import { Search, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-2 rounded-lg">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              SolarReviews<span className="text-blue-500">Brasil</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/empresas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Empresas
            </Link>
            <Link href="/calculadora" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Calculadora Solar
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contato
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar empresas..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              Área da Empresa
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <Link 
                href="/empresas" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Empresas
              </Link>
              <Link 
                href="/calculadora" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Calculadora Solar
              </Link>
              <Link 
                href="/sobre" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="/contato" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="px-3 py-2">
                <Input
                  type="text"
                  placeholder="Buscar empresas..."
                  className="w-full"
                />
              </div>
              <div className="px-3 py-2">
                <Button variant="outline" className="w-full">
                  Área da Empresa
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}