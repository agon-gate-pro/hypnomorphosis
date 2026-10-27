import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });

const description =
  "Expériences d’hypnose à vivre chez soi : carnets, audios guidés et exercices pour ouvrir le champ de vos possibles. Commencez par l’expérience découverte gratuite.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hypnomorphosis.vercel.app"),
  title: "HypnoMorphosis · Ouvrir le champ de vos possibles",
  description,
  openGraph: {
    title: "HypnoMorphosis · Ouvrir le champ de vos possibles",
    description,
    siteName: "HypnoMorphosis",
    locale: "fr_FR",
    type: "website",
  },
  // site pas encore lancé : rien ne doit être indexé
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#fbf9f4" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // la classe js est ajoutée avant l'hydratation, d'où suppressHydrationWarning
    <html lang="fr" className={`${cormorant.variable} ${jost.variable} ${marcellus.variable}`} suppressHydrationWarning>
      <head>
        {/* les blocs ne sont masqués pour l'apparition au défilement que si le script tourne */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
