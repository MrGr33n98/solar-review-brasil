import { NextResponse } from 'next/server';
import { z } from 'zod';
import { companies } from '@/lib/data';
import type { Company } from '@/types';

const updateSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  planType: z.enum(['free', 'premium', 'enterprise']).optional(),
  premiumExpiresAt: z.string().optional(),
  location: z
    .object({
      city: z.string(),
      state: z.string(),
    })
    .optional(),
  specialties: z.array(z.string()).optional(),
  established: z.number().optional(),
  website: z.string().optional(),
  phone: z.string().optional(),
  verificationBadges: z.array(z.string()).optional(),
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const company = companies.find((c) => c.id === params.id);
  if (!company) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(company);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const parsed = updateSchema.parse(data);
    const index = companies.findIndex((c) => c.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
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
  const index = companies.findIndex((c) => c.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const removed = companies.splice(index, 1)[0];
  return NextResponse.json(removed);
}
