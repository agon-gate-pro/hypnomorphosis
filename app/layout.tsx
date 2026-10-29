import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { descriptionSite as description, urlSite } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost" });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-marcellus" });

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
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

// Les formulaires Clerk aux couleurs du carnet : papier, encre olive, titres en Cormorant,
// boutons à angles droits et en capitales espacées comme les .btn du site.
const apparenceClerk = {
  variables: {
    colorPrimary: "#555a40",
    colorPrimaryForeground: "#fbf9f4",
    colorForeground: "#33352a",
    colorMutedForeground: "#6d6c5d",
    colorBackground: "#fbf9f4",
    colorInput: "#ffffff",
    colorInputForeground: "#33352a",
    colorBorder: "#d9d4c4",
    // anneau de focus doré et discret plutôt qu'olive appuyé
    colorRing: "rgb(201 164 106 / 0.45)",
    borderRadius: "2px",
    fontFamily: "var(--font-jost), system-ui, sans-serif",
    fontSize: "15px",
  },
  elements: {
    headerTitle: { fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "34px", lineHeight: 1.15, letterSpacing: 0 },
    headerSubtitle: { fontSize: "15px" },
    formButtonPrimary: { textTransform: "uppercase", letterSpacing: ".14em", fontWeight: 400, fontSize: "13px", padding: "13px 20px", boxShadow: "none" },
    socialButtonsBlockButton: { borderColor: "#d9d4c4", backgroundColor: "#ffffff" },
    // « Vous n'avez pas de compte ? S'inscrire » : centré et passant à la ligne proprement sur téléphone
    footerAction: { flexWrap: "wrap", justifyContent: "center", textAlign: "center", columnGap: "6px" },
    // badge « Principal » de Mon compte : à peine lisible avec les couleurs par défaut
    badge: { color: "#555a40", backgroundColor: "#ecebe2", borderColor: "#d9d4c4" },
  },
} as const;

/**
 * `frFR`, avec des titres qui parlent d'expériences plutôt que du nom technique de l'application
 * Clerk, et un rappel des spams à l'étape du code reçu par e-mail (repris de Set et Brique).
 */
const textesClerk = {
  ...frFR,
  signIn: {
    ...frFR.signIn,
    start: { ...frFR.signIn!.start, title: "Bon retour parmi nous", subtitle: "Recevez un code par e-mail pour retrouver vos expériences." },
    emailCode: { ...frFR.signIn!.emailCode, subtitle: "Code envoyé par e-mail. Rien reçu ? Regardez dans vos spams." },
  },
  signUp: {
    ...frFR.signUp,
    start: { ...frFR.signUp!.start, title: "Créer mon espace", subtitle: "Pour recevoir l’expérience découverte et retrouver vos carnets." },
    emailCode: { ...frFR.signUp!.emailCode, subtitle: "Code envoyé par e-mail. Rien reçu ? Regardez dans vos spams." },
  },
};

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
      <body>
        <ClerkProvider
          localization={textesClerk}
          appearance={apparenceClerk}
          signInUrl="/connexion"
          signUpUrl="/inscription"
          signInFallbackRedirectUrl="/espace"
          signUpFallbackRedirectUrl="/espace"
          afterSignOutUrl="/"
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
