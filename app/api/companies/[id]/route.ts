import { NextResponse } from 'next/server';
import { z } from 'zod';
import { companies } from '@/lib/data';
import type { Company } from '@/types';

const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  logo: z.string(),
  banner: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  planType: z.enum(['free', 'premium', 'enterprise']),
  premiumExpiresAt: z.string().optional(),
  location: z.object({
    city: z.string(),
    state: z.string(),
  }),
  specialties: z.array(z.string()),
  established: z.number(),
  website: z.string().optional(),
  phone: z.string().optional(),
  verificationBadges: z.array(z.string()).optional(),
});

const updateSchema = companySchema.partial();

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const company = companies.find(c => c.id === params.id);
  if (!company) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(company);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const index = companies.findIndex(c => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const data = await req.json();
    const parsed = updateSchema.parse(data);
    const updated: Company = { ...companies[index], ...parsed };
    companies[index] = updated;
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const index = companies.findIndex(c => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  companies.splice(index, 1);
  return NextResponse.json({ success: true });
}
