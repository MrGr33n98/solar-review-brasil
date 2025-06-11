'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SolarProduct } from '@/types/product';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/dashboard/image-upload';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const productTypes = [
  { value: 'panel', label: 'Painel Solar' },
  { value: 'inverter', label: 'Inversor' },
  { value: 'battery', label: 'Bateria' },
  { value: 'other', label: 'Outro' }
] as const;

const productSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  type: z.enum(['panel', 'inverter', 'battery', 'other']),
  manufacturer: z.string().min(2, 'Fabricante deve ter pelo menos 2 caracteres'),
  model: z.string().min(2, 'Modelo deve ter pelo menos 2 caracteres'),
  power: z.number().optional(),
  efficiency: z.number().min(0).max(100).optional(),
  warranty: z.number().min(0, 'Garantia deve ser um número positivo'),
  price: z.number().min(0, 'Preço deve ser um número positivo'),
  imageUrl: z.string().optional(),
  specifications: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  inStock: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [products, setProducts] = useState<SolarProduct[]>([]); // Replace with actual data fetching

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'panel',
      manufacturer: '',
      model: '',
      power: undefined,
      efficiency: undefined,
      warranty: 0,
      price: 0,
      imageUrl: '',
      inStock: true,
    },
  });

  async function onSubmit(data: ProductFormData) {
    try {
      setLoading(true);
      // TODO: Implement product creation/update logic
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      toast({
        title: 'Produto salvo',
        description: 'O produto foi salvo com sucesso.',
      });

      form.reset();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o produto.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        <Button
          onClick={() => {/* TODO: Implement new product creation */}}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Adicionar Produto
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar/Editar Produto</CardTitle>
            <CardDescription>
              Adicione ou edite as informações do produto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Produto</FormLabel>
                        <FormControl>
                          <Input placeholder="Painel Solar 450W" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Produto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fabricante</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do fabricante" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo</FormLabel>
                        <FormControl>
                          <Input placeholder="Número do modelo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="power"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potência (W)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="450"
                            {...field}
                            onChange={e => field.onChange(e.target.valueAsNumber)} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="efficiency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eficiência (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="21.5"
                            {...field}
                            onChange={e => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="warranty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garantia (anos)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="25"
                            {...field}
                            onChange={e => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1500"
                            {...field}
                            onChange={e => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva o produto..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem do Produto</FormLabel>
                      <FormControl>
                        <ImageUpload
                          label="Imagem"
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange('')}
                          aspectRatio="1"
                          maxWidth="max-w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={e => field.onChange(e.target.checked)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                      </FormControl>
                      <FormLabel className="m-0">Produto em Estoque</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => form.reset()}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? 'Salvando...' : 'Salvar Produto'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {product.imageUrl && (
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                    {/* TODO: Add Image component */}
                  </div>
                )}
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.manufacturer} - {product.model}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tipo:</span>
                    <span className="font-medium">
                      {productTypes.find(t => t.value === product.type)?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Preço:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
