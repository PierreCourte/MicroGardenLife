import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getDatabase } from '@/lib/mongodb'
import { sendActivationEmail } from '@/lib/email'
import { createMagicToken } from '@/lib/auth'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any

      // Extract data
      const email = session.customer_email || session.customer_details?.email
      const productId = session.metadata?.productId
      const amount = session.amount_total

      if (!email || !productId) {
        console.error('Missing email or productId in webhook')
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
      }

      const db = await getDatabase()

      // Create order record
      const order = {
        email: email.toLowerCase(),
        productId,
        amount,
        stripeSessionId: session.id,
        createdAt: new Date(),
        revoked: false,
        meta: {
          ip: request.ip,
          userAgent: request.headers.get('user-agent'),
        }
      }

      const orderResult = await db.collection('orders').insertOne(order)

      // Create magic activation token (24h expiry)
      const token = createMagicToken(email, productId)

      // Save token
      await db.collection('accessTokens').insertOne({
        email: email.toLowerCase(),
        productId,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        used: false,
        deviceInfo: {
          ip: request.ip || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      })

      // Send activation email
      await sendActivationEmail(email, token, productId)

      console.log(`Order created for ${email}: ${productId} (${orderResult.insertedId})`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 500 }
    )
  }
}