import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { MotionProvider } from '@/components/layout/motion-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SolarReviews Brasil - Avaliações de Empresas de Energia Solar',
  description: 'A maior plataforma de avaliações de empresas de energia solar do Brasil. Encontre os melhores instaladores qualificados e confiáveis.',
  keywords: 'energia solar, painéis solares, instalação solar, avaliações, reviews, empresas solares, Brasil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MotionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}