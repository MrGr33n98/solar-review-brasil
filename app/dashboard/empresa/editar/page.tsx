'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const companySchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  website: z.string().url('URL inválida'),
  phone: z.string().min(10, 'Telefone inválido'),
  address: z.string().min(5, 'Endereço inválido'),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres')
});

export default function EditCompanyPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema)
  });

  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (response.ok) {
        router.push('/dashboard/empresa');
      } else {
        const data = await response.json();
        setError(data.error || 'Erro ao atualizar empresa');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil da Empresa</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add remaining form fields */}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Form>
    </div>
  );
}