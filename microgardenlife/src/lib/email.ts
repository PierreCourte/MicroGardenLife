import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'MicroGardenLife <hello@microgardenlife.com>'

export async function sendActivationEmail(
  email: string,
  token: string,
  productId: string
) {
  const activationUrl = `${process.env.APP_URL}/activate?token=${token}`
  
  const productName = productId === 'book17' 
    ? 'Ton Jardin Micro-Pousses Maison'
    : 'Formation Vidéo Complète Micro-Pousses'

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Ton accès MicroGardenLife — active-le maintenant 🌱',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1A4D2E; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { background: #1A4D2E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; }
            .footer { margin-top: 20px; padding: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Bienvenue dans MicroGardenLife</h1>
            </div>
            <div class="content">
              <p>Merci pour ton achat de <strong>${productName}</strong> !</p>
              
              <p>Clique ci-dessous pour activer ton accès à vie sur ce navigateur :</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${activationUrl}" class="button">Activer mon accès</a>
              </p>
              
              <p><strong>Important :</strong></p>
              <ul>
                <li>Ce lien est valide pendant 24 heures</li>
                <li>L'accès se fera sur ce navigateur</li>
                <li>Tu peux demander un nouveau lien si besoin</li>
                <li>Usage strictement personnel</li>
              </ul>
              
              <p>Si tu as des questions, réponds simplement à cet email.</p>
              
              <p>À bientôt dans ton espace membre !<br>
              L'équipe MicroGardenLife 🌱</p>
            </div>
            <div class="footer">
              <p>MicroGardenLife - Micro-pousses premium à domicile</p>
              <p>Tu peux te désabonner à tout moment en nous contactant.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Bienvenue dans MicroGardenLife ! 🌱

Merci pour ton achat de ${productName}.

Active ton accès à vie : ${activationUrl}

Important:
- Lien valide 24h
- Accès sur ce navigateur
- Usage personnel uniquement

L'équipe MicroGardenLife
      `
    })

    if (error) {
      console.error('Email error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendFreebieEmail(email: string, token: string) {
  const accessUrl = `${process.env.APP_URL}/access?token=${token}`

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: 'Ton guide gratuit est prêt 🌱',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1A4D2E; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; }
            .button { background: #1A4D2E; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌱 Ton guide gratuit t'attend !</h1>
            </div>
            <div class="content">
              <p>Voici ton accès au guide express <strong>"6 étapes pour cultiver tes micro-pousses maison"</strong>.</p>
              
              <p style="text-align: center; margin: 30px 0;">
                <a href="${accessUrl}" class="button">Télécharger mon guide</a>
              </p>
              
              <p><em>Lien valide pendant 1 heure.</em></p>
              
              <p>Bonne lecture ! 🌱</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Ton guide gratuit est prêt ! 🌱

Télécharge-le ici : ${accessUrl}

(Lien valide 1h)

L'équipe MicroGardenLife`
    })

    return !error
  } catch (error) {
    console.error('Freebie email error:', error)
    return false
  }
}