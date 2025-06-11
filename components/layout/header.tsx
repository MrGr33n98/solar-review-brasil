'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sun, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed w-full top-0 z-50 bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Sun className={cn(
                "h-8 w-8 transition-all duration-300 group-hover:rotate-180",
                "text-white"
              )} />
            </div>
            <span className={cn(
              "text-xl lg:text-2xl font-bold transition-colors duration-300",
              "text-white"
            )}>
              Solar Review Brasil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: '/empresas', label: 'Empresas' },
              { href: '/calculadora', label: 'Calculadora' },
              { href: '/sobre', label: 'Sobre' },
              { href: '/contato', label: 'Contato' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-all duration-300 hover:scale-105",
                  "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}            <Link href="/auth/empresa/cadastro"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Para Empresas
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors duration-300",
              "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white rounded-b-2xl shadow-xl border border-gray-100 mt-2"
          >
            <nav className="p-4 space-y-3">
              {[
                { href: '/empresas', label: 'Empresas' },
                { href: '/calculadora', label: 'Calculadora' },
                { href: '/sobre', label: 'Sobre' },
                { href: '/contato', label: 'Contato' },
                { href: '/auth/empresa/cadastro', label: 'Para Empresas', special: true }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl font-medium transition-all duration-300",                    link.special
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
