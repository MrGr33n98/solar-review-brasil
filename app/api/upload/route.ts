import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { put } from '@vercel/blob';
import { z } from 'zod';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string().regex(/^image\/(jpeg|png|webp)$/),
  size: z.number().max(MAX_FILE_SIZE),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    const validation = uploadSchema.safeParse({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
