import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import { mockPurchase, mockTestimonials } from '../mock/mockData';
import { useAuth } from '../context/AuthContext';
import { Book, Star, Check, Shield, ArrowRight } from 'lucide-react';

const BookLandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, addProduct } = useAuth();

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Mock purchase
      await mockPurchase('livre-digital', user?.email);
      
      // Add product to user account
      if (user) {
        addProduct('livre-digital');
      }
      
      // Redirect to upsell
      navigate('/formation');
    } catch (error) {
      console.error('Erreur lors de l\'achat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 hero-gradient">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-green/10 text-brand-green">
                  <Book className="w-4 h-4 mr-2" />
                  Livre Digital & Papier
                </span>
              </div>
              
              <h1 className="heading-1 text-brand-anthracite mb-6">
                Ton Jardin Micro-Pousses Maison
              </h1>
              
              <p className="body-large text-gray-600 mb-8">
                Le guide complet pour transformer ton appartement en oasis de fraîcheur. 
                Découvre tous les secrets pour cultiver 15+ variétés de micro-pousses, 
                même sans expérience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="btn-primary text-lg px-8 py-4"
                >
                  {loading ? 'Traitement...' : 'Obtiens ton exemplaire pour 17 €'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-gray-500">
                💳 Paiement 100% sécurisé • 📱 Accès immédiat • 📚 Version papier disponible
              </p>
            </div>

            {/* Right: Book Mockup */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 bg-gradient-to-br from-brand-green to-brand-green/80 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="p-8 h-full flex flex-col justify-center text-white">
                    <div className="text-center">
                      <Leaf className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Ton Jardin</h3>
                      <h4 className="text-xl mb-4">Micro-Pousses</h4>
                      <h5 className="text-lg">Maison</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Problem */}
            <div>
              <h2 className="heading-2 text-red-600 mb-6">Le Problème</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <p className="text-gray-700">Légumes chers et pas toujours frais au supermarché</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <p className="text-gray-700">Pesticides et produits chimiques dans ton assiette</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <p className="text-gray-700">Pas d'espace pour un potager traditionnel</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <p className="text-gray-700">Manque de nutriments dans l'alimentation moderne</p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="heading-2 text-brand-green mb-6">La Solution</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Check className="text-brand-green mt-1 w-5 h-5" />
                  <p className="text-gray-700">Jusqu'à <strong>40x plus de nutriments</strong> que les légumes matures</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-brand-green mt-1 w-5 h-5" />
                  <p className="text-gray-700">Récolte en seulement <strong>7 jours</strong>, toute l'année</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-brand-green mt-1 w-5 h-5" />
                  <p className="text-gray-700">Même en appartement, <strong>sur ton rebord de fenêtre</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="text-brand-green mt-1 w-5 h-5" />
                  <p className="text-gray-700">Rentable : <strong>1€ investit = 10€ de légumes</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center text-brand-anthracite mb-12">
            Ce que tu découvriras dans le livre
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="heading-3 mb-3">Les bases essentielles</h3>
              <p className="text-gray-600">Matériel, graines, substrats : tout ce dont tu as besoin pour commencer</p>
            </div>

            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="heading-3 mb-3">Planning de culture</h3>
              <p className="text-gray-600">Calendrier détaillé pour avoir des micro-pousses fraîches toute l'année</p>
            </div>

            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🥗</span>
              </div>
              <h3 className="heading-3 mb-3">15+ variétés expliquées</h3>
              <p className="text-gray-600">Radis, roquette, tournesol... Chaque variété avec ses spécificités</p>
            </div>

            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="heading-3 mb-3">30 recettes savoureuses</h3>
              <p className="text-gray-600">Salades, smoothies, tartines : comment sublimer tes micro-pousses</p>
            </div>

            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="heading-3 mb-3">Troubleshooting</h3>
              <p className="text-gray-600">Solutions aux problèmes les plus fréquents (moisissures, germination...)</p>
            </div>

            <div className="product-card">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="heading-3 mb-3">Aspect économique</h3>
              <p className="text-gray-600">Calculs de rentabilité et conseils pour optimiser tes coûts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center text-brand-anthracite mb-12">
            Ce qu'en disent nos lecteurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-brand-anthracite">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-20 h-20 text-brand-green mx-auto mb-6" />
          <h2 className="heading-2 text-brand-anthracite mb-6">
            Garantie Satisfait ou Remboursé
          </h2>
          <p className="body-large text-gray-600 mb-8">
            Tu as 30 jours pour tester toutes les techniques du livre. 
            Si tu n'obtiens pas tes premières micro-pousses, 
            nous te remboursons intégralement.
          </p>
          <Button
            onClick={handlePurchase}
            disabled={loading}
            className="btn-primary text-lg px-8 py-4"
          >
            {loading ? 'Traitement...' : 'Je commande maintenant - 17€'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BookLandingPage;