import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromCookies, verifyMagicToken } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'
import { generateSignedUrl, getContentKey } from '@/lib/storage'
import { ensureWatermarkedPDF } from '@/lib/pdf'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const token = searchParams.get('token') // Optional single-use token

    if (!productId) {
      return NextResponse.json(
        { error: 'productId requis' },
        { status: 400 }
      )
    }

    let email: string | null = null

    // Check session cookie first
    const session = getSessionFromCookies()
    if (session) {
      email = session.email
    } 
    // Fallback to magic token
    else if (token) {
      const tokenData = verifyMagicToken(token)
      if (tokenData && tokenData.productId === productId) {
        email = tokenData.email
      }
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 401 }
      )
    }

    const db = await getDatabase()

    // Check if user has access to this product
    const order = await db.collection('orders').findOne({
      email: email.toLowerCase(),
      productId,
      revoked: false
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Produit non acheté' },
        { status: 403 }
      )
    }

    // Log access
    await db.collection('accessLogs').insertOne({
      orderId: order._id?.toString(),
      email,
      productId,
      action: productId === 'book17' ? 'download' : 'stream_start',
      ip: request.ip,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date()
    })

    // Handle different product types
    if (productId === 'book17') {
      // Ensure watermarked PDF exists
      await ensureWatermarkedPDF(email, order._id!.toString())
      
      // Generate signed URL for personalized PDF
      const key = getContentKey(productId, order._id!.toString())
      const url = await generateSignedUrl(key)
      
      return NextResponse.json({
        url,
        watermark: {
          text: `MicroGardenLife — ${email} — ${order._id}`,
          orderId: order._id!.toString()
        }
      })
    }

    if (productId === 'video67') {
      // Generate signed URL for HLS manifest
      const key = getContentKey(productId)
      const url = await generateSignedUrl(key)
      
      return NextResponse.json({
        url,
        watermark: {
          text: `${email} — Commande ${order._id}`,
          orderId: order._id!.toString()
        }
      })
    }

    if (productId === 'freebie-ebook') {
      // Freebie guide (no watermark needed)
      const key = getContentKey(productId)
      const url = await generateSignedUrl(key)
      
      return NextResponse.json({ url })
    }

    return NextResponse.json(
      { error: 'Type de produit non supporté' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Content URL error:', error)
    return NextResponse.json(
      { error: 'Erreur interne' },
      { status: 500 }
    )
  }
}