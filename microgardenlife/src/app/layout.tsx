import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

// Use local fonts to avoid hydration issues with Google Fonts
const montserrat = localFont({
  src: [
    {
      path: '../assets/fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mont',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
})

const lato = localFont({
  src: [
    {
      path: '../assets/fonts/Lato-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Lato-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-lato',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif']
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${montserrat.variable} ${lato.variable} font-lato antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}