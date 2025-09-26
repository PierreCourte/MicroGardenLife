# MicroGardenLife - Funnel de Vente Production

Funnel de conversion 3 étapes pour MicroGardenLife - brand premium de micro-pousses.

## Architecture

- **Next.js 14** avec TypeScript
- **MongoDB Atlas** pour les données
- **Stripe Checkout** pour les paiements
- **Cloudflare R2** pour le stockage de contenu
- **Resend** pour les emails transactionnels
- **Accès à vie** sans comptes utilisateur (cookie-based)

## Funnel de Conversion

1. **Page Capture** (`/`) - Lead magnet gratuit
2. **Landing Livre** (`/book`) - Ebook 17€
3. **Upsell Vidéo** (`/upsell`) - Formation 67€
4. **Espace Contenu** (`/my-content`) - Accès lifetime

## Setup Local

### 1. Installation

```bash
npm install
```

### 2. Base de Données

Configurez MongoDB Atlas ou utilisez une instance locale :

```bash
# Local MongoDB (via Docker)
docker run -d -p 27017:27017 --name mongo mongo:latest
```

### 3. Configuration Stripe

1. Créez un compte Stripe (mode test)
2. Récupérez vos clés API
3. Créez les produits/prix :

```bash
# Script de création des produits Stripe
npm run stripe:setup
```

### 4. Configuration R2/S3

#### Cloudflare R2
1. Créez un bucket R2
2. Générez des clés API R2
3. Configurez CORS pour votre domaine

#### AWS S3 (alternative)
1. Créez un bucket S3
2. Configurez IAM avec permissions GetObject/PutObject
3. Configurez CORS

### 5. Configuration Resend

1. Créez un compte Resend
2. Vérifiez votre domaine d'envoi
3. Récupérez votre clé API

### 6. Variables d'environnement

```bash
cp .env.example .env.local
# Remplissez vos vraies valeurs
```

## Développement

```bash
npm run dev
```

## Structure du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Page capture (/)
│   ├── book/              # Landing livre (/book)
│   ├── upsell/            # Upsell vidéo (/upsell)
│   ├── my-content/        # Espace contenu
│   ├── activate/          # Activation magic link
│   ├── api/               # API Routes
│   │   ├── lead/          # POST /api/lead
│   │   ├── stripe/        # Webhook Stripe
│   │   ├── content-url/   # Génération URLs signées
│   │   └── admin/         # Panel admin
│   └── legal/             # Pages légales
├── components/            # Composants React
├── lib/                   # Utilitaires
│   ├── mongodb.ts         # Connexion MongoDB
│   ├── stripe.ts          # Configuration Stripe
│   ├── storage.ts         # R2/S3 helper
│   ├── email.ts           # Resend integration
│   ├── auth.ts            # JWT helpers
│   └── pdf.ts             # Watermarking PDF
└── styles/               # CSS/Tailwind
```

## Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub
2. Configurez les variables d'environnement
3. Deployez

```bash
npm run build
vercel --prod
```

### Cloudflare Pages

```bash
npm run build
wrangler pages publish out
```

## Configuration Avancée

### Webhook Stripe

1. Configurez l'endpoint : `https://votredomaine.com/api/stripe/webhook`
2. Événements : `checkout.session.completed`
3. Récupérez le secret webhook

### Upload Contenu

#### Ebook (PDF)
```bash
# Placez votre PDF source dans /public/content/
# Il sera automatiquement watermarké à l'achat
```

#### Vidéos (HLS)
```bash
# Uploadez vos fichiers HLS vers R2/S3:
# videos/video67/master.m3u8
# videos/video67/segments/*.ts
npm run upload:video
```

### Monitoring

- Logs d'accès dans MongoDB (`accessLogs`)
- Métriques Stripe Dashboard
- Alertes Resend pour les emails

## Sécurité

- **Pas de comptes utilisateur** - accès cookie-based
- **URLs signées** avec expiration (1h)
- **Rate limiting** sur les endpoints sensibles
- **Watermarking** automatique du contenu
- **GDPR compliant** avec consentement explicit

## Support

- Email: support@microgardenlife.com
- Documentation technique en français
- Garantie satisfait ou remboursé 30 jours