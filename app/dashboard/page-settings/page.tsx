'use client';

import React, { useEffect, useState } from 'react';

// ============================================================================
// MOCKS PARA AMBIENTE STANDALONE (em um projeto Next.js real, seriam imports)
// ============================================================================

// Mock para @/components/ui/button
const Button = ({ children, className, onClick, disabled }: { children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void; disabled?: boolean }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 ${className || ''}`}
    >
      {children}
    </button>
  );
};

// Mock para @/components/ui/card
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className || ''}`}>
    {children}
  </div>
);

// Mock para @/components/ui/card-header
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className || ''}`}>
    {children}
  </div>
);

// Mock para @/components/ui/card-title
const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className || ''}`}>
    {children}
  </h3>
);

// Mock para @/components/ui/card-content
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-4 sm:p-6 pt-0 ${className || ''}`}>
    {children}
  </div>
);

// Mock para useToast hook
const useToast = () => {
  return {
    toast: (options: { title: string; description?: string; variant?: string }) => {
      console.log(`[Toast] ${options.title}: ${options.description || ''} (Variant: ${options.variant || 'default'})`);
      // Em um ambiente real, 'toast' seria uma função que exibe notificações visuais.
    },
  };
};

// Mock para window.location.href (simula a navegação)
// Em um projeto Next.js real, você usaria useRouter().push()
const useRouter = () => ({
  push: (url: string) => {
    console.log(`Navigating to: ${url}`);
    //window.location.href = url; // Descomente para navegação real em navegador
  }
});


// ============================================================================
// INTERFACE E COMPONENTE PRINCIPAL DO SEU ARQUIVO page.tsx
// ============================================================================

interface PageFunction {
  id: number;
  name: string;
  key: string;
  content: string;
  content_type: string;
  is_active: boolean;
}

export default function PageSettings() {
  const [pageFunctions, setPageFunctions] = useState<PageFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter(); // Inicializa o mock de useRouter

  useEffect(() => {
    const fetchPageFunctions = async () => {
      try {
        // Simulação de resposta da API (dados mockados)
        const mockData: PageFunction[] = [
          { id: 1, name: 'Página Inicial - Hero', key: 'home-hero', content: 'Descubra a Economia Solar: Compare e Conecte-se às Melhores Empresas!', content_type: 'text', is_active: true },
          { id: 2, name: 'Página Inicial - Benefícios', key: 'home-benefits', content: 'Por Que Escolher a SolarConnect? Compare Preços, Avaliações Reais...', content_type: 'markdown', is_active: true },
          { id: 3, name: 'Página de Contato - Formulário', key: 'contact-form', content: 'Preencha o formulário para entrar em contato conosco.', content_type: 'html', is_active: false },
          { id: 4, name: 'Política de Privacidade', key: 'privacy-policy', content: 'Nossa política de privacidade detalha como seus dados são coletados e usados.', content_type: 'markdown', is_active: true },
          { id: 5, name: 'Termos de Serviço', key: 'terms-of-service', content: 'Leia nossos termos de serviço antes de usar a plataforma.', content_type: 'markdown', is_active: false },
        ];

        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 800));

        setPageFunctions(mockData);
        toast({
          title: 'Sucesso',
          description: 'Funções de página carregadas com sucesso.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Erro ao carregar funções de página:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao carregar funções de página.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPageFunctions();
  }, [toast]); // Adicionado `toast` como dependência para evitar warnings

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
        <p>Carregando funções de página...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Configurações de Página</h1>
      <div className="grid gap-4 sm:gap-6">
        {pageFunctions.length === 0 ? (
          <p className="text-gray-600 text-center py-10">Nenhuma função de página encontrada.</p>
        ) : (
          pageFunctions.map((func) => (
            <Card key={func.key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex-1 p-0 mb-4 sm:mb-0">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">{func.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-none p-0">
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <p className="text-sm text-gray-500 font-mono">Key: {func.key}</p>
                  <p className="text-sm text-gray-700">
                    Conteúdo: {func.content.substring(0, 70)}
                    {func.content.length > 70 ? '...' : ''}
                  </p>
                  <div className="flex justify-between items-center mt-3 sm:mt-4 w-full">
                    <span className={`font-medium ${func.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      Status: {func.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                    <Button
                      onClick={() => router.push(`/dashboard/page-settings/${func.key}/edit`)}
                      className="px-4 py-2 text-base rounded-md"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
