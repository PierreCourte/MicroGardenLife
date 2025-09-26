import { ObjectId } from 'mongodb'

export interface Lead {
  _id?: ObjectId
  email: string
  firstName?: string
  source: string
  createdAt: Date
}

export interface Order {
  _id?: ObjectId
  email: string
  productId: 'book17' | 'video67'
  amount: number
  stripeSessionId: string
  createdAt: Date
  revoked: boolean
  meta: {
    ip?: string
    userAgent?: string
  }
}

export interface AccessToken {
  _id?: ObjectId
  email: string
  productId: string
  token: string
  createdAt: Date
  expiresAt: Date
  used: boolean
  deviceInfo?: {
    ip: string
    userAgent: string
  }
}

export interface AccessLog {
  _id?: ObjectId
  orderId?: string
  email: string
  productId: string
  action: 'generate_url' | 'download' | 'stream_start'
  ip?: string
  userAgent?: string
  timestamp: Date
}