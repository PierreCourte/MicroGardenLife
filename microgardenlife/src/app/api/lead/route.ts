import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendFreebieEmail } from '@/lib/email'
import { createMagicToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, source } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Save lead
    const lead = {
      email: email.toLowerCase(),
      firstName: firstName || '',
      source: source || 'unknown',
      createdAt: new Date(),
    }

    await db.collection('leads').insertOne(lead)

    // Create magic token for freebie access (1h expiry)
    const token = createMagicToken(email, 'freebie-ebook')

    // Send freebie email
    await sendFreebieEmail(email, token)

    return NextResponse.json({
      success: true,
      message: 'Guide envoyé par email'
    })

  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}