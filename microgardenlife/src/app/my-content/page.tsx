'use client'

import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import LoadingButton from '@/components/LoadingButton'
import FormInput from '@/components/FormInput'
import ClientWrapper from '@/components/ClientWrapper'

interface UserProduct {
  productId: string
  title: string
  description: string
  type: 'ebook' | 'course' | 'freebie'
}

export default function MyContentPage() {
  const [products, setProducts] = useState<UserProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [email, setEmail] = useState('')
  const [requestLoading, setRequestLoading] = useState(false)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    try {
      // Try to get user products (will fail if no session)
      const response = await fetch('/api/user/products')
      
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
        setHasAccess(true)
      } else {
        setHasAccess(false)
      }
    } catch (error) {
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  const handleContentAccess = async (productId: string) => {
    try {
      const response = await fetch(`/api/content-url?productId=${productId}`)
      
      if (response.ok) {
        const data = await response.json()
        
        if (productId === 'video67') {
          // For video, open in same tab with player
          if (typeof window !== 'undefined') {
            window.location.href = `/player?url=${encodeURIComponent(data.url)}&watermark=${encodeURIComponent(data.watermark.text)}`
          }
        } else {
          // For PDFs, open in new tab
          if (typeof window !== 'undefined') {
            window.open(data.url, '_blank')
          }
        }
      } else {
        alert('Erreur d\'accès au contenu')
      }
    } catch (error) {
      alert('Erreur d\'accès au contenu')
    }
  }

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setRequestLoading(true)
    
    try {
      const response = await fetch('/api/generate-activation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert('Email d\'activation envoyé ! Vérifie ta boîte mail.')
      } else {
        alert('Aucun achat trouvé pour cet email')
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi')
    } finally {
      setRequestLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout showNav>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    )
  }

  if (!hasAccess) {
    return (
      <Layout showNav>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-mont font-bold text-brand-green mb-6">
              Accès au contenu
            </h1>
            <p className="text-brand-anthracite mb-8">
              Tu as acheté un de nos produits ? Entre ton email pour recevoir un lien d'activation.
            </p>

            <form onSubmit={handleRequestAccess} className="space-y-4">
              <FormInput
                type="email"
                placeholder="Email utilisé lors de l'achat"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <LoadingButton
                type="submit"
                loading={requestLoading}
                className="w-full"
              >
                Recevoir le lien d'activation
              </LoadingButton>
            </form>

            <p className="text-sm text-gray-500 mt-6">
              Pas encore d'achat ?{' '}
              <a href="/book" className="text-brand-green underline">
                Découvre notre livre premium
              </a>
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout showNav>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🌱</div>
            <h1 className="text-4xl font-mont font-bold text-brand-green mb-4">
              Mon Espace MicroGardenLife
            </h1>
            <p className="text-xl text-gray-600">
              Accède à tes contenus premium à vie
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product) => (
                <div key={product.productId} className="card">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center">
                      {product.type === 'ebook' && <span className="text-xl">📖</span>}
                      {product.type === 'course' && <span className="text-xl">🎥</span>}
                      {product.type === 'freebie' && <span className="text-xl">🎁</span>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                      
                      <ClientWrapper>
                        <LoadingButton
                          onClick={() => handleContentAccess(product.productId)}
                          className="w-full"
                        >
                          {product.type === 'course' ? 'Regarder' : 'Télécharger'}
                        </LoadingButton>
                      </ClientWrapper>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-6">📦</div>
              <h2 className="text-2xl font-mont font-semibold text-brand-anthracite mb-4">
                Aucun contenu pour le moment
              </h2>
              <p className="text-gray-600 mb-8">
                Découvre nos produits premium pour commencer ton aventure micro-pousses
              </p>
              <a href="/book" className="btn-primary">
                Découvrir le livre
              </a>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-16 p-6 bg-brand-cream rounded-brand">
            <h3 className="font-mont font-semibold text-brand-anthracite mb-4">
              Actions rapides
            </h3>
            <div className="flex flex-wrap gap-4">
              <a href="/book" className="btn-secondary">
                Livre 17€
              </a>
              <a href="/upsell" className="btn-secondary">
                Formation 67€
              </a>
              <a href="mailto:hello@microgardenlife.com" className="btn-secondary">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}