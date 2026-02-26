import type { Metadata, Viewport } from "next"; // Ajout de Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Séparation de la configuration de l'affichage (Viewport)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Empêche le zoom auto sur mobile lors du clic sur des inputs
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: 'Kyzzo | Site Officiel',
  description: "Découvrez l'univers musical de Kyzzo. Derniers singles, clips et productions.",
  icons: {
    icon: '/favicon.ico', // Pense à mettre ton logo ici
    apple: '/apple-icon.png', // Icône pour l'écran d'accueil iPhone
  },
  openGraph: {
    title: 'Kyzzo | Site Officiel',
    description: "Artiste & Producteur - Explorez ma discographie.",
    images: ['/kyzzo-photo-de-profile.png'], // Image qui s'affiche quand tu partages le lien sur Insta/WhatsApp
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth"> {/* lang="fr" et scroll fluide */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
        
        {/* Outils d'analyse Vercel pour suivre ton trafic mobile */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}