import { NextRequest, NextResponse } from 'next/server'
import { verifyMagicToken, setSessionCookie } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token requis' },
        { status: 400 }
      )
    }

    // Verify magic token
    const tokenData = verifyMagicToken(token)
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      )
    }

    const db = await getDatabase()

    // Check if token exists and is unused
    const accessToken = await db.collection('accessTokens').findOne({
      token,
      used: false
    })

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Token déjà utilisé ou invalide' },
        { status: 400 }
      )
    }

    // Mark token as used
    await db.collection('accessTokens').updateOne(
      { token },
      { $set: { used: true } }
    )

    // Set lifetime session cookie
    setSessionCookie(tokenData.email)

    return NextResponse.json({
      success: true,
      email: tokenData.email,
      productId: tokenData.productId
    })

  } catch (error) {
    console.error('Activation error:', error)
    return NextResponse.json(
      { error: 'Erreur d\'activation' },
      { status: 500 }
    )
  }
}