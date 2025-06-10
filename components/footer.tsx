import React from 'react';
import { Sun, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Social media links data
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

// Link groups data for better maintainability
const linkGroups = [
  {
    title: 'Links Úteis',
    links: [
      { href: '/como-funciona', label: 'Como Funciona' },
      { href: '/calculadora', label: 'Calculadora Solar' },
      { href: '/guias', label: 'Guias e Tutoriais' },
      { href: '/faq', label: 'Perguntas Frequentes' },
    ]
  },
  {
    title: 'Categorias',
    links: [
      { href: '/residencial', label: 'Solar Residencial' },
      { href: '/comercial', label: 'Solar Comercial' },
      { href: '/industrial', label: 'Solar Industrial' },
      { href: '/rural', label: 'Solar Rural' },
    ]
  }
];

// Legal links data
const legalLinks = [
  { href: '/privacidade', label: 'Política de Privacidade' },
  { href: '/termos', label: 'Termos de Uso' },
  { href: '/cookies', label: 'Política de Cookies' },
];

// FooterLink component for consistent styling
const FooterLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link 
    href={href} 
    className={cn("text-gray-400 hover:text-white transition duration-200", className)}
  >
    {children}
  </Link>
);

// SocialIcon component
const SocialIcon = ({ Icon, href, label }: { Icon: React.ElementType; href: string; label: string }) => (
  <a 
    href={href} 
    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </a>
);

// ContactItem component
const ContactItem = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <li className="flex items-center text-gray-400 hover:text-gray-300 transition-colors">
    <Icon className="h-5 w-5 mr-2 text-gray-500" aria-hidden="true" />
    <span>{children}</span>
  </li>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Sun className="h-6 w-6 text-blue-400 mr-2" aria-hidden="true" />
              <h3 className="text-xl font-bold text-blue-400">Solar Review Brasil</h3>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              A plataforma que conecta você às melhores empresas de energia solar em todo o Brasil, 
              com avaliações verificadas e comparações transparentes.
            </p>
            
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((link) => (
                <SocialIcon 
                  key={link.label}
                  Icon={link.icon}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          </div>
          
          {/* Link Groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contato</h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPin}>São Paulo, SP - Brasil</ContactItem>
              <ContactItem icon={Phone}>(11) 9999-9999</ContactItem>
              <ContactItem icon={Mail}>contato@solarreviewbrasil.com</ContactItem>
            </ul>
            
            <div className="mt-6">
              <Link 
                href="/contato" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md inline-flex items-center transition-colors"
              >
                Fale Conosco
                <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Solar Review Brasil. Todos os direitos reservados.
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm justify-center">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}