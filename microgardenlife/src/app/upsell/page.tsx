'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import LoadingButton from '@/components/LoadingButton'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function UpsellPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    setLoading(true)
    
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe non disponible')

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'video67'
        }),
      })

      const session = await response.json()
      
      if (session.error) {
        throw new Error(session.error)
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

    } catch (error) {
      console.error('Erreur checkout:', error)
      alert('Erreur lors du paiement. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    router.push('/my-content')
  }

  return (
    <Layout showNav>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-cream to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-yellow/20 text-brand-anthracite text-sm font-medium mb-6">
              🎁 Offre Spéciale — Accès Immédiat
            </div>

            <h1 className="text-5xl lg:text-6xl font-mont font-bold text-brand-anthracite mb-6">
              Passe à l'action en vidéo 🎥
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Tu as le livre, maintenant accélère tes résultats avec notre formation vidéo complète. 
              Apprends en 6 modules courts, concrets et motivants. Zéro blabla.
            </p>

            {/* Video Placeholder */}
            <div className="relative bg-gradient-to-br from-brand-green to-brand-green/80 rounded-2xl overflow-hidden mb-8 max-w-3xl mx-auto">
              <div className="aspect-w-16 aspect-h-9 flex items-center justify-center py-20">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">▶️</div>
                  <h3 className="text-2xl font-mont font-bold mb-2">Formation Vidéo Complète</h3>
                  <p className="text-lg text-brand-cream/90">6 modules pratiques • 6 heures de contenu</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <LoadingButton
                onClick={handlePurchase}
                loading={loading}
                className="text-lg px-8 py-4"
              >
                Accès immédiat — 67€
              </LoadingButton>
              <button
                onClick={handleSkip}
                className="btn-secondary text-lg px-8 py-4"
              >
                Continuer sans la formation
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>Garantie 30 jours</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>♾️</span>
                <span>Accès à vie</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>Support inclus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-mont font-bold text-brand-anthracite text-center mb-12">
              Les 6 modules de la formation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  num: '1',
                  title: 'Matériel minimal & hygiène',
                  desc: 'Setup parfait et bonnes pratiques pour éviter contamination'
                },
                {
                  num: '2', 
                  title: 'Semis parfaits (terre/coco/hydro)',
                  desc: 'Comparaison des 3 méthodes et leurs avantages'
                },
                {
                  num: '3',
                  title: 'Arrosage & prévention moisissures', 
                  desc: 'Techniques avancées pour des pousses saines'
                },
                {
                  num: '4',
                  title: 'Récolte & stockage',
                  desc: 'Timing optimal et conservation pour garder fraîcheur'
                },
                {
                  num: '5',
                  title: '10 recettes express & dressage',
                  desc: 'Démonstrations culinaires et présentation pro'
                },
                {
                  num: '6',
                  title: 'Nutrition & routine santé',
                  desc: 'Intégrer les micro-pousses dans ton quotidien'
                }
              ].map((module, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-brand-cream/50 rounded-brand">
                  <div className="w-10 h-10 bg-brand-green text-white rounded-full flex items-center justify-center font-mont font-bold">
                    {module.num}
                  </div>
                  <div>
                    <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600">
                      {module.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-mont font-bold text-brand-anthracite text-center mb-12">
              Bonus inclus dans la formation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-brand shadow-soft">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-mont font-semibold text-brand-anthracite mb-3">
                  Checklists PDF
                </h3>
                <p className="text-gray-600">
                  Guides imprimables pour chaque étape, à garder près de toi
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-brand shadow-soft">
                <div className="text-4xl mb-4">🗓️</div>
                <h3 className="font-mont font-semibold text-brand-anthracite mb-3">
                  Plan de culture 30 jours
                </h3>
                <p className="text-gray-600">
                  Programme complet pour ton premier mois de récoltes
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-brand shadow-soft">
                <div className="text-4xl mb-4">🥗</div>
                <h3 className="font-mont font-semibold text-brand-anthracite mb-3">
                  Tableau des variétés
                </h3>
                <p className="text-gray-600">
                  Guide visuel des 15+ variétés avec temps de croissance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">⏰</div>
            <h2 className="text-4xl font-mont font-bold mb-6">
              Offre spéciale réservée aux lecteurs du livre
            </h2>
            <p className="text-xl text-brand-cream/90 mb-8 leading-relaxed">
              Cette formation est normalement proposée à 97€. 
              En tant que lecteur du livre, profite de <strong>30€ de réduction</strong> valable seulement aujourd'hui.
            </p>

            <div className="inline-block bg-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center space-x-4 text-2xl font-mont font-bold">
                <span className="line-through opacity-60">97€</span>
                <span>→</span>
                <span className="text-brand-yellow text-3xl">67€</span>
              </div>
              <p className="text-sm text-brand-cream/75 mt-2">Économie de 30€</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LoadingButton
                onClick={handlePurchase}
                loading={loading}
                className="bg-white text-brand-green hover:bg-gray-100 text-lg px-8 py-4 font-mont font-semibold"
              >
                J'accède à la formation — 67€
              </LoadingButton>
            </div>

            <p className="text-sm text-brand-cream/75 mt-6">
              Garantie satisfait ou remboursé 30 jours • Accès à vie • Support technique inclus
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}