'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const companyProfileSchema = z.object({
  name: z.string().min(2, {
    message: 'Nome da empresa deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'Descrição deve ter pelo menos 10 caracteres.',
  }),
  website: z.string().url({
    message: 'URL inválida.',
  }),
  email: z.string().email({
    message: 'Email inválido.',
  }),
  phone: z.string().min(10, {
    message: 'Número de telefone inválido.',
  }),
  address: z.string().min(5, {
    message: 'Endereço deve ter pelo menos 5 caracteres.',
  }),
});

type ProfileFormValues = z.infer<typeof companyProfileSchema>;

export function CompanyProfileForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      name: '',
      description: '',
      website: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      setLoading(true);
      const response = await fetch('/api/company/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast({
        title: 'Perfil atualizado',
        description: 'As informações da empresa foram atualizadas com sucesso.',
      });
    } catch (error) {
      console.error('Error updating company profile:', error);
      toast({
        title: 'Erro ao atualizar',
        description: 'Ocorreu um erro ao atualizar as informações da empresa.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Solar Brasil Ltda." {...field} />
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
                <Textarea
                  placeholder="Descreva sua empresa..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Uma breve descrição da sua empresa e seus serviços.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://www.exemplo.com.br" type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="contato@empresa.com.br" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(11) 99999-9999" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Rua Exemplo, 123 - São Paulo, SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Form>
  );
}
