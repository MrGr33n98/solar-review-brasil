import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactRequests } from '@/lib/contacts';
import { v4 as uuidv4 } from 'uuid';

const schema = z.object({
  companyId: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = schema.parse(data);
    const contact = { id: uuidv4(), createdAt: new Date().toISOString(), ...parsed };
    contactRequests.push(contact);
    console.log('New contact request', contact);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(contactRequests);
}
