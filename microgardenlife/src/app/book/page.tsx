'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import LoadingButton from '@/components/LoadingButton'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BookLandingPage() {
  const [loading, setLoading] = useState(false)

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
          productId: 'book17'
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

  return (
    <Layout showNav>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-cream to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-sm font-medium mb-6">
                📖 Livre Digital & Papier
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-mont font-bold text-brand-anthracite mb-6">
                Ton Jardin Micro-Pousses Maison
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                La méthode claire, moderne et efficace pour cultiver, manger mieux et économiser — toute l'année.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <LoadingButton
                  onClick={handlePurchase}
                  loading={loading}
                  className="text-lg px-8 py-4"
                >
                  Obtenir l'ebook — 17 €
                </LoadingButton>
                <button className="btn-secondary text-lg px-8 py-4">
                  Feuilleter un extrait
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>💳</span>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span>Accès immédiat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📚</span>
                  <span>Version papier disponible</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-brand-green to-brand-green/80 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="p-8 h-full flex flex-col justify-center text-white text-center">
                    <div className="text-6xl mb-6">🌱</div>
                    <h3 className="text-2xl font-mont font-bold mb-4">
                      Ton Jardin Micro-Pousses Maison
                    </h3>
                    <p className="text-brand-cream/90">
                      150 pages • Photos • Recettes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Changes Everything */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-mont font-bold text-brand-anthracite text-center mb-12">
              Pourquoi ça change tout
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                    Récolte en 7 à 14 jours
                  </h3>
                  <p className="text-gray-600">
                    Plus besoin d'attendre 3 mois. Tes premiers légumes ultra-frais en moins de 2 semaines.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💪</span>
                </div>
                <div>
                  <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                    Jusqu'à 40× plus de nutriments*
                  </h3>
                  <p className="text-gray-600">
                    Les micro-pousses concentrent vitamines, minéraux et antioxydants à un niveau exceptionnel.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                    Rentable, sain, écologique
                  </h3>
                  <p className="text-gray-600">
                    1€ investi = 10€ de légumes bio équivalent. Zéro pesticide, empreinte carbone minimale.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                    Méthode pas-à-pas pour débutants
                  </h3>
                  <p className="text-gray-600">
                    Aucune expérience requise. Instructions visuelles claires, matériel minimal, résultats garantis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-20 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-mont font-bold text-brand-anthracite text-center mb-12">
              Au sommaire de l'ebook
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Matériel minimal', desc: 'Ce dont tu as vraiment besoin (spoiler: presque rien)' },
                { num: '2', title: 'Semis denses', desc: 'La technique pour maximiser tes récoltes' },
                { num: '3', title: 'Arrosage & aération', desc: 'Éviter les moisissures, garantir la croissance' },
                { num: '4', title: 'Récolte sans pertes', desc: 'Quand et comment récolter pour le maximum de saveur' },
                { num: '5', title: 'Nutrition & recettes', desc: '30 façons délicieuses de consommer tes micro-pousses' },
                { num: '6', title: 'Plan rentabilité', desc: 'Calculs réels pour économiser sur tes courses' },
              ].map((chapter, index) => (
                <div key={index} className="card hover:shadow-hover transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-mont font-bold text-sm">
                      {chapter.num}
                    </div>
                    <div>
                      <h3 className="font-mont font-semibold text-brand-anthracite mb-2">
                        {chapter.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {chapter.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-mont font-bold text-brand-anthracite text-center mb-12">
              Ce qu'en disent nos lecteurs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sophie M.', text: 'Méthode claire et résultats immédiats ! Mes radis roses sont magnifiques.', rating: 5 },
                { name: 'Marc L.', text: 'Parfait pour débuter. J\'ai économisé 50€ sur mes légumes le premier mois.', rating: 5 },
                { name: 'Julie R.', text: 'Les recettes sont délicieuses. Mes invités sont impressionnés par la fraîcheur !', rating: 5 }
              ].map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-mont font-semibold text-brand-anthracite">
                    — {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee & CTA */}
      <section className="py-20 bg-brand-green text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🛡️</div>
            <h2 className="text-4xl font-mont font-bold mb-6">
              Garantie Satisfait ou Remboursé
            </h2>
            <p className="text-xl text-brand-cream/90 mb-8 leading-relaxed">
              Tu as 30 jours pour tester toutes les techniques du livre. 
              Si tu n'obtiens pas tes premières micro-pousses, nous te remboursons intégralement.
            </p>
            <LoadingButton
              onClick={handlePurchase}
              loading={loading}
              className="bg-white text-brand-green hover:bg-gray-100 text-lg px-8 py-4"
            >
              Je commande maintenant — 17€
            </LoadingButton>
            <p className="text-sm text-brand-cream/75 mt-4">
              *Sources scientifiques disponibles dans l'ebook.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}