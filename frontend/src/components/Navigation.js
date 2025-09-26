import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { User, LogOut, Home } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-header">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate('/')}
          className="text-xl font-bold text-brand-green hover:text-brand-anthracite transition-colors"
        >
          🌱 MicroGardenLife
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/espace-membre')}
              className="flex items-center space-x-2"
            >
              <User size={16} />
              <span>Mon Espace</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/connexion')}
            className="flex items-center space-x-2"
          >
            <User size={16} />
            <span>Connexion</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;