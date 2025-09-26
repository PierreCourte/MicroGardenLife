import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { Leaf, Mail, Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(loginData.email, loginData.password);
      navigate('/espace-membre');
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(signupData);
      navigate('/espace-membre');
    } catch (error) {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Leaf className="w-16 h-16 text-brand-green mx-auto mb-4" />
            <h1 className="heading-2 text-brand-anthracite">Mon Espace MicroGardenLife</h1>
            <p className="text-gray-600 mt-2">Accède à tes produits digitaux</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Se connecter</CardTitle>
                  <CardDescription>
                    Entre tes identifiants pour accéder à ton espace membre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="ton@email.com"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Créer un compte</CardTitle>
                  <CardDescription>
                    Crée ton compte pour accéder à tes produits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          name="name"
                          type="text"
                          placeholder="Ton prénom"
                          value={signupData.name}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          name="email"
                          type="email"
                          placeholder="ton@email.com"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={handleSignupChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? 'Création...' : 'Créer mon compte'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <Link to="/" className="text-brand-green hover:text-brand-anthracite transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;