import { NextResponse } from 'next/server';
import { contactRequests } from '@/lib/contacts';
import { reviews } from '@/lib/data';
import { prisma } from '@/lib/prisma';

export async function GET() {
  let contactCount = contactRequests.length;
  let reviewCount = reviews.length;
  if (prisma.contactRequest?.count) {
    contactCount = await prisma.contactRequest.count();
  }
  if (prisma.review?.count) {
    reviewCount = await prisma.review.count();
  }
  return NextResponse.json({ contactCount, reviewCount });
}
