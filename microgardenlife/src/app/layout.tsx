import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";

// Use Google Fonts with display: swap to prevent hydration issues
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont',
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  title: "MicroGardenLife - Cultive tes micro-pousses à domicile",
  description: "La méthode premium pour cultiver tes micro-pousses à domicile. Nutrition optimale, saveurs intenses, récoltes express en 7 jours.",
  keywords: "micro-pousses, microgreens, jardinage, nutrition, alimentation saine",
  openGraph: {
    title: "MicroGardenLife - Cultive tes micro-pousses à domicile",
    description: "La méthode premium pour cultiver tes micro-pousses à domicile",
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${montserrat.variable} ${lato.variable}`}>
      <body className="font-lato antialiased bg-brand-cream text-brand-anthracite" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}