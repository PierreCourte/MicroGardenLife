import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, PRODUCTS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { productId, email } = await request.json()

    // Validate product
    let product
    if (productId === 'book17') {
      product = PRODUCTS.BOOK17
    } else if (productId === 'video67') {
      product = PRODUCTS.VIDEO67
    } else {
      return NextResponse.json(
        { error: 'Produit invalide' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession(
      product.priceId,
      product.productId,
      email
    )

    return NextResponse.json({ 
      id: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du checkout' },
      { status: 500 }
    )
  }
}