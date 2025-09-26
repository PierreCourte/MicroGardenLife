import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Please add your Stripe secret key to .env.local')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

export const PRODUCTS = {
  BOOK17: {
    priceId: process.env.PRICE_BOOK17!,
    productId: 'book17',
    name: 'Ton Jardin Micro-Pousses Maison',
    amount: 1700, // cents
  },
  VIDEO67: {
    priceId: process.env.PRICE_VIDEO67!,
    productId: 'video67',
    name: 'Formation Vidéo Complète',
    amount: 6700, // cents
  }
} as const

export async function createCheckoutSession(
  priceId: string,
  productId: string,
  email?: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/cancel`,
    customer_email: email,
    metadata: {
      productId,
    },
  })

  return session
}