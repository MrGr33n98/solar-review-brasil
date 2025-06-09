import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { uploadedImageUrls } from '@/lib/uploads';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File not provided' }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 });
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const extension = file.type === 'image/png' ? 'png' : 'jpg';
  const key = `${uuidv4()}.${extension}`;
  const bucket = process.env.S3_BUCKET_NAME!;
  const body = Buffer.from(await file.arrayBuffer());

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: file.type,
      })
    );

    const url = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    uploadedImageUrls.push(url);
    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
