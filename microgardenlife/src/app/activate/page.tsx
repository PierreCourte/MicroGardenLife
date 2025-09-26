'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'

function ActivateContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setError('Token manquant')
      return
    }

    activateAccess()
  }, [token])

  const activateAccess = async () => {
    if (!token) return

    try {
      const response = await fetch('/api/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        setStatus('success')
        // Redirect to content after 2 seconds
        setTimeout(() => {
          router.push('/my-content')
        }, 2000)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Erreur d\'activation')
      }
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          {status === 'loading' && (
            <>
              <div className="text-6xl mb-6">🔑</div>
              <h1 className="text-3xl font-mont font-bold text-brand-green mb-4">
                Activation en cours...
              </h1>
              <div className="loading-spinner mx-auto"></div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-3xl font-mont font-bold text-brand-green mb-4">
                Accès activé !
              </h1>
              <p className="text-brand-anthracite mb-6">
                Parfait ! Ton accès à vie est maintenant configuré sur ce navigateur.
                Redirection vers ton contenu...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-6xl mb-6">❌</div>
              <h1 className="text-3xl font-mont font-bold text-red-600 mb-4">
                Erreur d'activation
              </h1>
              <p className="text-brand-anthracite mb-6">
                {error}
              </p>
              <button
                onClick={() => router.push('/my-content')}
                className="btn-secondary"
              >
                Réessayer l'accès
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default function ActivatePage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    }>
      <ActivateContent />
    </Suspense>
  )
}