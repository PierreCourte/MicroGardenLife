'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
  showNav?: boolean
  className?: string
}

export default function Layout({ children, showNav = false, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-brand-cream ${className}`}>
      {showNav && (
        <nav className="bg-white shadow-soft border-b border-brand-gray/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <span className="font-mont font-bold text-brand-green text-xl">
                  MicroGardenLife
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link 
                  href="/book" 
                  className="text-brand-anthracite hover:text-brand-green transition-colors"
                >
                  Livre 17€
                </Link>
                <Link 
                  href="/my-content" 
                  className="text-brand-anthracite hover:text-brand-green transition-colors"
                >
                  Mon contenu
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-brand-anthracite text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="font-mont font-bold text-xl">MicroGardenLife</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                La méthode premium pour cultiver tes micro-pousses à domicile.
                Nutrition optimale, saveurs intenses, récoltes express.
              </p>
            </div>
            
            <div>
              <h3 className="font-mont font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/legal/mentions" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/legal/cgv" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    CGV
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/legal/privacy" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-mont font-semibold mb-4">Support</h3>
              <p className="text-gray-300">
                Questions ? Écris-nous à<br />
                <a 
                  href="mailto:hello@microgardenlife.com" 
                  className="text-brand-yellow hover:underline"
                >
                  hello@microgardenlife.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MicroGardenLife. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}