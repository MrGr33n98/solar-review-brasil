'use client';

import React, { useState, useEffect, useRef } from 'react'; // Importar React e hooks explicitamente

// ============================================================================
// MOCKS PARA AMBIENTE STANDALONE (em um projeto Next.js real, seriam imports)
// Estes mocks permitem que o código seja executado sem as dependências externas.
// ============================================================================

// Mock para useRouter de 'next/navigation'
const useRouter = () => ({
  push: (url: string) => {
    console.log(`Navigating to: ${url}`);
    // Em um ambiente real do navegador, você usaria window.location.href = url;
    // ou o roteador real do Next.js.
  },
});

// Mock para @/components/ui/card
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border bg-white text-gray-900 shadow-sm ${className || ''}`}>
    {children}
  </div>
);

// Mock para @/components/ui/card-header
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>
    {children}
  </div>
);

// Mock para @/components/ui/card-title
const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}>
    {children}
  </h3>
);

// Mock para @/components/ui/button
const Button = ({ children, className, type = 'button', variant = 'default', onClick, disabled }: { children: React.ReactNode; className?: string; type?: 'button' | 'submit'; variant?: 'default' | 'outline'; onClick?: (e: React.MouseEvent) => void; disabled?: boolean }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
    >
      {children}
    </button>
  );
};

// Mock para @/components/ui/label
const Label = ({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-1 ${className || ''}`}>
    {children}
  </label>
);

// Mock para @/components/ui/textarea
const Textarea = ({ id, value, onChange, rows, className }: { id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; rows?: number; className?: string }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    rows={rows}
    className={`flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
  />
);

// Mock para @/components/ui/switch
const Switch = ({ id, checked, onCheckedChange, className }: { id: string; checked: boolean; onCheckedChange: (checked: boolean) => void; className?: string }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    id={id}
    onClick={() => onCheckedChange(!checked)}
    className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200 ${className || ''}`}
  >
    <span
      data-state={checked ? 'checked' : 'unchecked'}
      className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </button>
);

// Mock para 'sonner' toast
const toast = {
  success: (message: string) => console.log('SUCCESS:', message),
  error: (message: string) => console.error('ERROR:', message),
};

// ============================================================================
// INTERFACE E COMPONENTE PRINCIPAL DO SEU ARQUIVO page.tsx
// ============================================================================

interface PageFunction {
  id: string;
  name: string;
  key: string;
  content: string;
  content_type: string;
  is_active: boolean;
}

export default function EditPageFunction({ params }: { params: { key: string } }) {
  const router = useRouter();
  const [pageFunction, setPageFunction] = useState<PageFunction | null>(null);
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular a busca de dados da API
    async function fetchPageFunction() {
      setLoading(true);
      try {
        // Mock de resposta da API
        const mockData: PageFunction = {
          id: '123',
          name: 'Home Page Content',
          key: params.key,
          content: `Este é o conteúdo dinâmico para a função de página '${params.key}'. Você pode editar este texto para personalizar a página.`,
          content_type: 'markdown',
          is_active: true,
        };

        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 500));

        setPageFunction(mockData);
        setContent(mockData.content);
        setIsActive(mockData.is_active);
        toast.success('Função de página carregada com sucesso!');
      } catch (error) {
        console.error('Erro ao carregar função de página:', error);
        toast.error('Erro ao carregar função de página');
      } finally {
        setLoading(false);
      }
    }

    fetchPageFunction();
  }, [params.key]); // Adicionado params.key como dependência para re-fetch se a chave mudar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simular o envio de dados para a API
    try {
      // Simular um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 700));

      console.log('Dados a serem salvos:', { content, is_active: isActive });
      // Em uma aplicação real, você faria um PATCH para a API:
      // const response = await fetch(`/api/v1/page_functions/${params.key}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content, is_active: isActive }),
      // });
      // if (!response.ok) throw new Error('Failed to update');

      toast.success('Alterações salvas com sucesso!');
      router.push('/dashboard/page-settings'); // Redireciona de volta após o salvamento
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      toast.error('Erro ao salvar alterações');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!pageFunction) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
        <p>Função de página não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <Card className="max-w-3xl mx-auto p-6 shadow-xl border border-gray-100 rounded-lg">
        <CardHeader className="mb-6 border-b pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Editar Função de Página: <span className="text-blue-600">{pageFunction.name}</span>
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label className="text-gray-700 font-semibold mb-1">Nome da Função</Label>
            <p className="text-gray-600 text-lg font-medium bg-gray-100 p-3 rounded-md border border-gray-200">
              {pageFunction.name}
            </p>
          </div>

          <div>
            <Label className="text-gray-700 font-semibold mb-1">Chave Única</Label>
            <p className="text-gray-600 text-lg font-mono bg-gray-100 p-3 rounded-md border border-gray-200">
              {pageFunction.key}
            </p>
          </div>

          <div>
            <Label htmlFor="content" className="text-gray-700 font-semibold mb-1">Conteúdo</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12} // Aumentado para mais espaço
              className="resize-y min-h-[200px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-gray-800"
            />
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-md border border-gray-200">
            <Switch
              id="is-active"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <Label htmlFor="is-active" className="text-gray-700 cursor-pointer select-none">
              Ativar Função (Torna o conteúdo visível no site)
            </Label>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/page-settings')}
              className="px-6 py-3 text-lg rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
