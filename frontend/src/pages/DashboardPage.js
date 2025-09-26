import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import { Download, Play, Book, FileText, Gift, User, ShoppingBag } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [userProducts, setUserProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/connexion');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user) {
        try {
          const products = await productsAPI.getUserProducts();
          setUserProducts(products);
        } catch (error) {
          console.error('Erreur lors du chargement des produits:', error);
        } finally {
          setLoadingProducts(false);
        }
      }
    };

    fetchUserProducts();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userProducts = user.products?.map(productId => mockProducts[productId]).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-brand-green" />
              </div>
              <div>
                <h1 className="heading-2 text-brand-anthracite">
                  Bienvenue {user.name} !
                </h1>
                <p className="text-gray-600">
                  Voici ton espace personnel MicroGardenLife
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="heading-2 text-brand-anthracite mb-6 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-3" />
                Mes Produits
              </h2>

              <div className="space-y-6">
                {userProducts.length > 0 ? (
                  userProducts.map((product) => (
                    <Card key={product.id} className="product-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center">
                              {product.type === 'guide' && <FileText className="w-6 h-6 text-brand-green" />}
                              {product.type === 'ebook' && <Book className="w-6 h-6 text-brand-green" />}
                              {product.type === 'course' && <Play className="w-6 h-6 text-brand-green" />}
                            </div>
                            <div>
                              <CardTitle className="text-brand-anthracite">
                                {product.title}
                              </CardTitle>
                              <CardDescription>
                                {product.description}
                              </CardDescription>
                            </div>
                          </div>
                          {product.type === 'guide' && (
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Gratuit
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{product.content}</p>
                        <div className="flex space-x-3">
                          {product.type === 'course' ? (
                            <Button className="btn-primary">
                              <Play className="w-4 h-4 mr-2" />
                              Regarder la formation
                            </Button>
                          ) : (
                            <Button className="btn-primary">
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="heading-3 text-gray-600 mb-2">
                        Aucun produit pour le moment
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Découvre nos produits pour commencer ton aventure micro-pousses
                      </p>
                      <Button 
                        onClick={() => navigate('/livre')}
                        className="btn-primary"
                      >
                        Découvrir nos produits
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-anthracite">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => navigate('/livre')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Book className="w-4 h-4 mr-2" />
                    Acheter le livre (17€)
                  </Button>
                  <Button 
                    onClick={() => navigate('/formation')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Formation vidéo (67€)
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Guide gratuit
                  </Button>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-anthracite">Mon compte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-brand-anthracite">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Produits possédés</p>
                      <p className="font-medium text-brand-anthracite">{userProducts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-brand-anthracite">Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Besoin d'aide ? Notre équipe est là pour toi !
                  </p>
                  <Button variant="outline" className="w-full">
                    Contacter le support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;