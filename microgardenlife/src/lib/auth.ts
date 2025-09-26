import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'
const COOKIE_NAME = 'microgf_session'

export interface SessionData {
  email: string
  issuedAt: number
}

export function createSessionToken(email: string): string {
  // Use a stable timestamp to avoid hydration issues
  const issuedAt = Math.floor(Date.now() / 1000) * 1000 // Round to nearest second
  
  const payload: SessionData = {
    email,
    issuedAt
  }
  
  // 10 years expiry for lifetime access
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10y' })
}

export function verifySessionToken(token: string): SessionData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionData
    return decoded
  } catch (error) {
    return null
  }
}

export function setSessionCookie(email: string): string {
  const token = createSessionToken(email)
  
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 10 * 365 * 24 * 60 * 60, // 10 years
    path: '/'
  })
  
  return token
}

export function getSessionFromCookies(): SessionData | null {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  
  if (!token) return null
  
  return verifySessionToken(token)
}

export function createMagicToken(email: string, productId: string): string {
  // Use stable timestamp for consistent token generation
  const now = Math.floor(Date.now() / 1000)
  
  const payload = {
    email,
    productId,
    type: 'magic',
    exp: now + (24 * 60 * 60) // 24h expiry
  }
  
  return jwt.sign(payload, JWT_SECRET)
}

export function verifyMagicToken(token: string): { email: string; productId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    if (decoded.type !== 'magic') return null
    
    return {
      email: decoded.email,
      productId: decoded.productId
    }
  } catch (error) {
    return null
  }
}