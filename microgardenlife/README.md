# MicroGardenLife - Funnel de Vente Production-Ready ⚡

Funnel de conversion 3 étapes pour MicroGardenLife - brand premium de micro-pousses.
**✅ Hydration-Optimized** - Aucune erreur de mismatch SSR/CSR.

## 🏗️ Architecture

- **Next.js 15.5.4** avec App Router, Turbopack et TypeScript
- **MongoDB Atlas** pour les données
- **Stripe Checkout** pour les paiements
- **Cloudflare R2/S3** pour le stockage de contenu
- **Resend** pour les emails transactionnels
- **Accès à vie** sans comptes utilisateur (cookie-based)

## 🎯 Funnel de Conversion

1. **Page Capture** (`/`) - Lead magnet gratuit
2. **Landing Livre** (`/book`) - Ebook 17€
3. **Upsell Vidéo** (`/upsell`) - Formation 67€
4. **Espace Contenu** (`/my-content`) - Accès lifetime

## 🚀 Hydration Bug Fixes Applied

### ✅ Stabilized Server vs Client Output
- **Removed** `Date.now()`, `Math.random()`, dynamic IDs from Server Components
- **Fixed** all timestamp generation to use stable values
- **Wrapped** client-only components with `ClientWrapper` + `useEffect` patterns

### ✅ Fixed typeof window Checks
- **Eliminated** `typeof window !== 'undefined'` from Server Components  
- **Converted** to Client Components with proper `useEffect` handling
- **Added** `ClientWrapper` for safe client-side rendering

### ✅ Date Formatting Consistency
- **Explicit locale** (fr-FR) for all date operations
- **Server-side formatting** passed down as strings
- **Stable copyright year** with `suppressHydrationWarning`

### ✅ Valid HTML Structure  
- **Fixed** all invalid tag nesting issues
- **Proper** semantic HTML structure
- **Stable** key props for mapped components

### ✅ Clean RootLayout
- **Minimal** `<html lang="fr">` and `<body>` tags
- **Deterministic** font loading and class names
- **No dynamic** attributes that could cause mismatches

### ✅ Error Boundaries & Testing
- **Added** `ErrorBoundary` components for graceful error handling
- **Strategic** use of `suppressHydrationWarning` only where needed
- **Suspense** boundaries for async components

## 🛠️ Setup Local

### 1. Installation

```bash
npm install
```

### 2. Configuration

```bash
cp .env.example .env.local
# Remplissez vos vraies valeurs
```

### 3. Base de Données

```bash
# Local MongoDB (via Docker)
docker run -d -p 27017:27017 --name mongo mongo:latest
```

## 📋 Hydration Testing Checklist

### ✅ Development Testing
```bash
npm run dev
# Vérifier la console - aucune erreur d'hydration
```

### ✅ Production Testing  
```bash
npm run build
npm start
# Tester avec Chrome profile propre (sans extensions)
```

### ✅ Extension Testing
- **Tester** avec uBlock Origin, Grammarly, etc.
- **Vérifier** que les attributs `__processed_xxx`, `bis_status` n'affectent pas l'app
- **Confirmer** que `suppressHydrationWarning` gère les différences attendues

## 🎨 Anti-Hydration Patterns Used

### ClientWrapper Component
```tsx
// Pour contenu client-only sûr
<ClientWrapper fallback={<div>Loading...</div>}>
  <ClientOnlyComponent />
</ClientWrapper>
```

### Stable Timestamps
```tsx
// ❌ Éviter
const timestamp = Date.now()

// ✅ Utiliser
const timestamp = Math.floor(Date.now() / 1000) * 1000 // Stable au second près
```

### Conditional Rendering
```tsx
// ❌ Éviter dans Server Components
if (typeof window !== 'undefined') { ... }

// ✅ Utiliser dans Client Components
useEffect(() => {
  // Logic client-side uniquement
}, [])
```

## 🔧 Développement

```bash
npm run dev     # Mode développement
npm run build   # Build production
npm run start   # Serveur production
npm run lint    # ESLint check
```

## 📱 Features Anti-Hydration

- **Fonts locaux** pour éviter les changements de layout
- **Stripe dynamique** chargé côté client uniquement
- **Navigation stable** sans état dynamique côté serveur
- **Timestamps déterministes** pour les tokens JWT
- **Gestion d'erreurs** avec boundaries React

## 🚫 Rules de Prévention Hydration

### DO NOT ❌
- Utiliser `Date.now()` ou `Math.random()` dans Server Components
- Accéder à `window`, `localStorage` côté serveur
- Générer des IDs dynamiques côté serveur
- Imbriquer des éléments HTML invalides (`<p>` dans `<div>`)
- Oublier les `key` props stables pour les listes

### DO ✅  
- Wraper le contenu client-only avec `ClientWrapper`
- Utiliser `suppressHydrationWarning` avec parcimonie
- Tester avec et sans extensions navigateur
- Maintenir la structure HTML stable server/client
- Utiliser des timestamps déterministes

## 📦 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Variables d'Environnement Requises
```bash
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_...
RESEND_API_KEY=re_...
JWT_SECRET=your-secret
# Voir .env.example pour la liste complète
```

## 🔍 Debug Hydration Issues

Si tu vois encore des erreurs d'hydration :

1. **Check Console** - Cherche les messages "hydrated but some attributes..."
2. **Inspect Elements** - Identifie les attributs différents server/client  
3. **Disable Extensions** - Teste avec Chrome propre
4. **Check Timestamps** - Assure-toi qu'ils sont déterministes
5. **Validate HTML** - Vérifie la structure HTML valide

## 📞 Support

- **Hydration Issues**: Voir section Debug ci-dessus
- **Setup Questions**: Vérifier .env.example  
- **Production Errors**: Check les logs Vercel/serveur

---

**🎯 Résultat: Zero hydration warnings en dev & prod, compatible avec toutes les extensions navigateur populaires.**