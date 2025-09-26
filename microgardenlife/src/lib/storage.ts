import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// R2/S3 configuration
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.STORAGE_PROVIDER === 'r2' 
    ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
    : undefined,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.R2_BUCKET || process.env.S3_BUCKET!

export async function generateSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  })

  return await getSignedUrl(s3Client, command, { expiresIn })
}

export async function uploadFile(key: string, body: Buffer, contentType: string): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  })

  await s3Client.send(command)
}

export function getContentKey(productId: string, orderId?: string): string {
  if (productId === 'book17') {
    return orderId 
      ? `ebooks/personalized/${orderId}.pdf`
      : 'ebooks/source/microgreens-guide.pdf'
  }
  
  if (productId === 'video67') {
    return 'videos/video67/master.m3u8'
  }
  
  if (productId === 'freebie-ebook') {
    return 'freebies/guide-6-etapes.pdf'
  }
  
  throw new Error(`Unknown product ID: ${productId}`)
}