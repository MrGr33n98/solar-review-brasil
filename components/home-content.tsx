'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, CheckCircle } from 'lucide-react';
import { GoogleSearch } from '@/components/google-search';
import { Features } from '@/components/features';
import { BannerCarousel } from '@/components/banner-carousel';
import { HowItWorks } from '@/components/how-it-works';
import { ContactCTA } from '@/components/contact-cta';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import Link from 'next/link';

const Header = dynamic(
  () => import('./layout/header').then(mod => mod.Header),
  { ssr: false }
);

const Footer = dynamic(
  () => import('./layout/footer').then(mod => mod.Footer),
  { ssr: false }
);

export default function HomeContent() {
  const router = useRouter();

  const handleSearch = (query: string, location?: string) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (location) searchParams.set('location', location);
    router.push(`/empresas?${searchParams.toString()}`);
  };

  const [step, setStep] = useState('info');

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full filter blur-[128px] opacity-20" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full filter blur-[128px] opacity-20" />

          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Compare e Encontre a Melhor<br />
                <span className="text-blue-400">Energia Solar</span> para Você
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12">
                Mais de 500 empresas avaliadas por especialistas e clientes reais
              </p>
              <div className="max-w-3xl mx-auto mb-12">
                <GoogleSearch onSearch={handleSearch} />
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-8 mt-12 text-gray-400">
                <div className="flex items-center gap-3 text-lg">
                  <CheckCircle className="h-6 w-6" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Users className="h-6 w-6" />
                  <span>+10.000 Avaliações</span>
                </div>
                <div className="flex items-center gap-3 text-lg">
                  <Shield className="h-6 w-6" />
                  <span>Empresas Verificadas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* How it Works Section */}
        <HowItWorks />

        {/* Companies Carousel */}
        <BannerCarousel />

        {/* Contact CTA Section */}
        <ContactCTA />

        {/* Company Registration Section */}
        <main className="container mx-auto py-10">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Cadastro de Empresa</CardTitle>
              <CardDescription>
                Cadastre sua empresa para começar a receber leads qualificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={step} onValueChange={setStep}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="access">Acesso</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome da Empresa</Label>
                      <Input id="name" placeholder="Solar Energy LTDA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="00.000.000/0000-00" />
                    </div>
                    <Button onClick={() => setStep("access")}>Próximo</Button>
                  </div>
                </TabsContent>

                <TabsContent value="access">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="empresa@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input id="password" type="password" />
                    </div>
                    <Button type="submit">Cadastrar</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>

        <div className="text-center py-10">
          <Link href="/cadastre-sua-empresa">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Para Empresas
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
