# Contrats API - Funnel MicroGardenLife

## Vue d'ensemble
Funnel de vente 3 étapes avec système d'authentification et espace membre.

## Données mockées actuelles (à remplacer)
- **mockData.js** : Produits, témoignages, fonctions lead capture et purchase
- **AuthContext.js** : Système d'auth avec localStorage (à migrer vers JWT)

## Modèles de données à implémenter

### User
```javascript
{
  id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  products: [String], // IDs des produits possédés
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  id: String,
  title: String,
  description: String,
  type: String, // 'guide', 'ebook', 'course'
  price: Number,
  content: String,
  downloadUrl: String,
  videoUrl: String,
  createdAt: Date
}
```

### Lead
```javascript
{
  id: ObjectId,
  name: String,
  email: String,
  source: String, // 'lead-magnet', 'book-page', etc.
  createdAt: Date
}
```

### Purchase
```javascript
{
  id: ObjectId,
  userId: ObjectId,
  productId: String,
  amount: Number,
  status: String, // 'pending', 'completed', 'failed'
  stripeSessionId: String,
  createdAt: Date
}
```

## Endpoints API à implémenter

### Authentication
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion utilisateur
- `GET /api/auth/me` - Profil utilisateur connecté
- `POST /api/auth/logout` - Déconnexion

### Leads
- `POST /api/leads` - Capturer un lead (formulaire lead magnet)

### Products
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détail d'un produit

### User Products
- `GET /api/user/products` - Produits possédés par l'utilisateur connecté
- `POST /api/user/products` - Ajouter un produit à l'utilisateur

### Purchases (pour intégration Stripe future)
- `POST /api/purchases/create-session` - Créer session Stripe
- `POST /api/purchases/webhook` - Webhook Stripe

## Intégrations futures
1. **Stripe** : Paiement réel (actuellement mocké)
2. **MailChimp** : Synchronisation des leads (actuellement mocké)
3. **File Storage** : Stockage des fichiers PDF/vidéos

## Modifications frontend nécessaires
1. Remplacer `mockData.js` par appels API réels
2. Migrer `AuthContext` vers JWT tokens
3. Ajouter gestion des erreurs API
4. Implémenter loading states

## Sécurité
- JWT tokens pour l'authentification
- Hash des mots de passe avec bcrypt
- Validation des données d'entrée
- Rate limiting sur les endpoints sensibles

## Priorités d'implémentation
1. ✅ Frontend avec mock data
2. 🔄 Modèles et endpoints de base
3. 🔄 Système d'authentification JWT
4. 🔄 Intégration frontend/backend
5. ⏳ Tests et validation
6. ⏳ Intégrations Stripe et MailChimp