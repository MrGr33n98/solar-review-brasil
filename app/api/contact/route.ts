import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { ContactRequest } from '@/types';
import { contactRequests } from '@/lib/contacts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRequest: ContactRequest = {
      id: uuidv4(),
      ...body,
      createdAt: new Date(),
      status: 'pending'
    };
    
    contactRequests.push(newRequest);
    
    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create contact request' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const search = searchParams.get('search') || '';

  let filtered = contactRequests;
  if (search) {
    filtered = contactRequests.filter(req => 
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const total = filtered.length;
  const pages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return NextResponse.json({
    data: filtered.slice(start, end),
    total,
    page,
    pages
  });
}
