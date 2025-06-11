import { NextResponse } from 'next/server';
import { z } from 'zod';
import { companies } from '@/lib/data';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const companyFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
  website: z.string().url('Website deve ser uma URL válida').optional(),
  address: z.string().min(5, 'Endereço deve ter no mínimo 5 caracteres'),
  city: z.string().min(2, 'Cidade deve ter no mínimo 2 caracteres'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  logo: z.instanceof(File, { message: 'Logo é obrigatório' }),
  banner: z.instanceof(File, { message: 'Banner é obrigatório' }),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export async function GET() {
  return NextResponse.json(companies);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const validatedData = companyFormSchema.parse(Object.fromEntries(formData));

    // Create a new FormData object for the Rails API
    const apiFormData = new FormData();
    
    // Add all text fields
    apiFormData.append('company[name]', validatedData.name);
    apiFormData.append('company[description]', validatedData.description);
    apiFormData.append('company[cnpj]', validatedData.cnpj);
    apiFormData.append('company[email]', validatedData.email);
    apiFormData.append('company[phone]', validatedData.phone);
    apiFormData.append('company[website]', validatedData.website || '');
    apiFormData.append('company[address]', validatedData.address);
    apiFormData.append('company[city]', validatedData.city);
    apiFormData.append('company[state]', validatedData.state);
    
    // Add the files
    if (formData.get('logo')) {
      apiFormData.append('company[logo]', formData.get('logo'));
    }
    if (formData.get('banner')) {
      apiFormData.append('company[banner]', formData.get('banner'));
    }

    const response = await fetch(`${baseURL}/api/v1/companies`, {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    const company = await response.json();
    return NextResponse.json(company);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Company registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
