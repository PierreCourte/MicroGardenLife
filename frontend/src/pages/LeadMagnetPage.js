import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import Navigation from '../components/Navigation';
import { submitLead } from '../mock/mockData';
import { useAuth } from '../context/AuthContext';
import { Download, Leaf, ArrowRight } from 'lucide-react';

const LeadMagnetPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit lead to mock API
      await submitLead(formData);
      
      // Create user account with free guide access
      await register({
        name: formData.name,
        email: formData.email,
        products: ['guide-gratuit']
      });

      setSubmitted(true);
      
      // Redirect to book landing page after 2 seconds
      setTimeout(() => {
        navigate('/livre');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <Leaf className="w-16 h-16 text-brand-green mx-auto mb-4" />
            <h2 className="heading-2 text-brand-green mb-4">Merci !</h2>
            <p className="body-medium text-brand-anthracite">
              Ton guide t'attend dans ton espace membre. Redirection en cours...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <Leaf className="w-20 h-20 text-brand-green mx-auto mb-4" />
          </div>

          {/* Main Headline */}
          <h1 className="heading-1 text-brand-green mb-6">
            Transforme ton appart en mini-jardin nourricier
          </h1>

          {/* Sub-headline */}
          <p className="body-large text-brand-anthracite mb-8 max-w-xl mx-auto">
            Télécharge gratuitement le guide express <strong>"6 étapes pour cultiver tes micro-pousses maison"</strong> et découvre comment avoir des légumes ultra-frais en seulement 7 jours.
          </p>

          {/* Lead Capture Form */}
          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="mb-6 text-center">
              <Download className="w-12 h-12 text-brand-green mx-auto mb-3" />
              <h3 className="heading-3 text-brand-anthracite mb-2">
                Guide Gratuit
              </h3>
              <p className="text-sm text-gray-600">
                Reçois ton guide PDF instantanément
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-brand-anthracite font-medium">
                  Prénom
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ton prénom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-200 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-brand-anthracite font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ton@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 border-gray-200 focus:border-brand-green focus:ring-brand-green"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg"
              >
                {loading ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    Je reçois mon guide gratuit
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Pas de spam, promis ! Tu recevras uniquement nos meilleurs conseils.
            </p>
          </div>

          {/* Benefits Points */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-brand-anthracite mb-2">Résultats rapides</h4>
              <p className="text-sm text-gray-600">Premières pousses en 7 jours seulement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-brand-anthracite mb-2">Chez toi</h4>
              <p className="text-sm text-gray-600">Même en appartement, sans jardin</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="font-semibold text-brand-anthracite mb-2">100% naturel</h4>
              <p className="text-sm text-gray-600">Sans pesticides, ultra-nutritif</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadMagnetPage;