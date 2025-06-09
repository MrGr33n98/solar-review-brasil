import { NextResponse } from 'next/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { users } from '@/lib/users';
import { companies } from '@/lib/data';
import { slugify } from '@/lib/utils';
import type { Company, User } from '@/types';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  companyName: z.string().min(1),
  companyDescription: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = registerSchema.parse(data);

    if (users.some(u => u.email === parsed.email)) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const company: Company = {
      id: uuidv4(),
      name: parsed.companyName,
      slug: slugify(parsed.companyName),
      description: parsed.companyDescription || '',
      logo: '',
      banner: '',
      rating: 0,
      reviewCount: 0,
      planType: 'free',
      location: { city: '', state: '' },
      specialties: [],
      established: new Date().getFullYear(),
      verificationBadges: []
    };
    companies.push(company);

    const user: User = {
      id: uuidv4(),
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
      companyId: company.id
    };
    users.push(user);

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
