import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Navigation from '../components/Navigation';
import { mockPurchase } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, Check, Gift, Clock, ArrowRight } from 'lucide-react';

const UpsellPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, addProduct } = useAuth();

  const handlePurchase = async () => {
    setLoading(true);
    try {
      await mockPurchase('formation-video', user?.email);
      
      if (user) {
        addProduct('formation-video');
      }
      
      navigate('/espace-membre');
    } catch (error) {
      console.error('Erreur lors de l\'achat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/espace-membre');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-brand-cream to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-yellow/20 text-brand-anthracite">
              <Gift className="w-4 h-4 mr-2" />
              Offre Spéciale - Accès Immédiat
            </span>
          </div>

          <h1 className="heading-1 text-brand-anthracite mb-6">
            Passe à l'action : deviens autonome avec les micro-pousses
          </h1>

          <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu as le livre, maintenant accélère tes résultats avec notre formation vidéo complète. 
            Vois chaque geste en action et évite les erreurs de débutant.
          </p>

          {/* Video Placeholder */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-8 max-w-3xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-brand-green to-brand-green/80 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <PlayCircle className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Formation Vidéo Complète</h3>
                <p className="text-lg opacity-90">6 modules pratiques • 6 heures de contenu</p>
              </div>
            </div>
            <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
              <PlayCircle className="w-16 h-16 text-white" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handlePurchase}
              disabled={loading}
              className="btn-primary text-lg px-8 py-4"
            >
              {loading ? 'Traitement...' : 'Accès immédiat - 67€'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="btn-secondary text-lg px-8 py-4"
            >
              Continuer sans la formation
            </Button>
          </div>
        </div>
      </section>

      {/* Why Video Training */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center text-brand-anthracite mb-12">
            Pourquoi une formation vidéo ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👀</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Apprentissage visuel</h3>
                  <p className="text-gray-600">Vois chaque geste, chaque technique en action. Bien plus efficace qu'un simple livre.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Résultats plus rapides</h3>
                  <p className="text-gray-600">Évite les erreurs courantes et obtiens tes premières récoltes dès le premier essai.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Guidance étape par étape</h3>
                  <p className="text-gray-600">Suis le formateur pas à pas, comme si tu étais dans son atelier.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Astuces d'expert</h3>
                  <p className="text-gray-600">Découvre les petits secrets qui font la différence entre amateur et expert.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Accès à vie</h3>
                  <p className="text-gray-600">Regarde et re-regarde autant de fois que nécessaire, quand tu veux.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="heading-3 mb-2">Sur tous tes appareils</h3>
                  <p className="text-gray-600">Ordinateur, tablette, téléphone : apprends où tu veux, quand tu veux.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-2 text-center text-brand-anthracite mb-12">
            Contenu de la formation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <h3 className="heading-3">Préparation et matériel</h3>
                </div>
                <p className="text-gray-600">Choix des graines, préparation des bacs, optimisation de ton espace de culture.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <h3 className="heading-3">Techniques de semis</h3>
                </div>
                <p className="text-gray-600">Densité parfaite, répartition homogène, techniques selon les variétés.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <h3 className="heading-3">Entretien quotidien</h3>
                </div>
                <p className="text-gray-600">Arrosage optimal, gestion de la lumière, maintien de l'humidité.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  <h3 className="heading-3">Récolte et conservation</h3>
                </div>
                <p className="text-gray-600">Moment parfait pour récolter, techniques de coupe, stockage pour maximiser la fraîcheur.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                  <h3 className="heading-3">Recettes et nutrition</h3>
                </div>
                <p className="text-gray-600">Préparations savoureuses, combinaisons nutritionnelles, recettes exclusives.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <span className="w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                  <h3 className="heading-3">Rentabilité et business</h3>
                </div>
                <p className="text-gray-600">Calculs économiques, vente de surplus, transformation en activité complémentaire.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-2 text-center text-brand-anthracite mb-12">
            Bonus inclus dans la formation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-brand-yellow/10 rounded-xl">
              <Gift className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="heading-3 mb-3">Checklists PDF</h3>
              <p className="text-gray-600">Guides pratiques imprimables pour chaque étape</p>
            </div>

            <div className="text-center p-6 bg-brand-yellow/10 rounded-xl">
              <Gift className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="heading-3 mb-3">Calendrier de culture</h3>
              <p className="text-gray-600">Planning annuel personnalisable selon tes goûts</p>
            </div>

            <div className="text-center p-6 bg-brand-yellow/10 rounded-xl">
              <Gift className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
              <h3 className="heading-3 mb-3">Recettes exclusives</h3>
              <p className="text-gray-600">20 recettes créatives non-disponibles ailleurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency & Final CTA */}
      <section className="py-16 px-4 bg-brand-green text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-16 h-16 mx-auto mb-6" />
          <h2 className="heading-2 mb-6">
            Offre spéciale réservée aux lecteurs du livre
          </h2>
          <p className="body-large mb-8 opacity-90">
            Cette formation est normalement proposée à 97€. 
            En tant que lecteur du livre, profite de <strong>30€ de réduction</strong> valable seulement aujourd'hui.
          </p>

          <div className="mb-8">
            <div className="inline-block bg-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center space-x-4 text-2xl font-bold">
                <span className="line-through opacity-60">97€</span>
                <span>→</span>
                <span className="text-brand-yellow text-3xl">67€</span>
              </div>
              <p className="text-sm opacity-80 mt-2">Économie de 30€</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handlePurchase}
              disabled={loading}
              className="bg-white text-brand-green hover:bg-gray-100 text-lg px-8 py-4 font-semibold"
            >
              {loading ? 'Traitement...' : 'J\'accède à la formation - 67€'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm opacity-75 mt-6">
            Garantie satisfait ou remboursé 30 jours • Accès à vie • Support technique inclus
          </p>
        </div>
      </section>
    </div>
  );
};

export default UpsellPage;