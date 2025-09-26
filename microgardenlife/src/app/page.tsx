'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import FormInput from '@/components/FormInput'
import LoadingButton from '@/components/LoadingButton'

export default function LeadMagnetPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    consent: false
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.consent) {
      setError('Veuillez accepter la politique de confidentialité')
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          source: 'lead-magnet'
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setSubmitted(true)
      
      // Auto-redirect to book page after success
      setTimeout(() => {
        router.push('/book')
      }, 2000)
      
    } catch (err) {
      setError('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-6">🌱</div>
            <h2 className="text-2xl font-mont font-bold text-brand-green mb-4">
              C'est parti !
            </h2>
            <p className="text-brand-anthracite mb-6">
              Vérifie ta boîte mail, ton guide t'attend. 
              Redirection vers notre livre premium...
            </p>
            <div className="loading-spinner mx-auto"></div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-6">🌱</div>
            <h1 className="text-4xl md:text-5xl font-mont font-bold text-brand-green mb-6 leading-tight">
              Transforme ton appart en mini-jardin nourricier
            </h1>
            <p className="text-lg text-brand-anthracite mb-8 leading-relaxed">
              Télécharge gratuitement le guide express en 
              <strong> 6 étapes pour cultiver tes micro-pousses</strong> à la maison.
            </p>
          </div>

          {/* Lead Capture Form */}
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📥</span>
              </div>
              <h3 className="text-xl font-mont font-semibold text-brand-anthracite">
                Guide Gratuit
              </h3>
              <p className="text-sm text-gray-600">
                PDF prêt en 2 minutes dans ta boîte mail
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                type="text"
                placeholder="Ton prénom (optionnel)"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              
              <FormInput
                type="email"
                placeholder="ton@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              {/* GDPR Consent */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1"
                  required
                />
                <label htmlFor="consent" className="text-sm text-brand-anthracite">
                  En téléchargeant, j'accepte de recevoir des conseils par email et la{' '}
                  <a 
                    href="/legal/privacy" 
                    className="text-brand-green underline hover:no-underline"
                    target="_blank"
                  >
                    politique de confidentialité
                  </a>
                  .
                </label>
              </div>

              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full text-lg"
              >
                Je reçois mon guide gratuit
              </LoadingButton>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              En téléchargeant, tu acceptes notre politique de confidentialité.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="font-mont font-semibold text-brand-anthracite mb-2">
                Résultats express
              </h4>
              <p className="text-sm text-gray-600">
                Premières pousses en 7 jours seulement
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🏠</span>
              </div>
              <h4 className="font-mont font-semibold text-brand-anthracite mb-2">
                Chez toi
              </h4>
              <p className="text-sm text-gray-600">
                Même en appartement, zéro matériel pro
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💚</span>
              </div>
              <h4 className="font-mont font-semibold text-brand-anthracite mb-2">
                100% naturel
              </h4>
              <p className="text-sm text-gray-600">
                Sans pesticides, ultra-nutritif
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
