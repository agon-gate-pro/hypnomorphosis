import "server-only";

import { headers } from "next/headers";
import type { Experience } from "@/lib/experiences";
import { urlSite } from "@/lib/site";
import { stripe } from "@/lib/stripe";

// étiquette des sessions du site dans le tableau de bord Stripe (fiche ou Mon espace → Checkout)
const parcours = "hypnomorphosis-fiche-qtwbzmle";

// Ouvre une page de paiement Stripe Checkout pour un achat (49 €) ou une prolongation (5,99 €) et renvoie son adresse,
// ou null si Stripe ne répond pas. L'accès est enregistré au retour par le webhook (lib/achats.ts), avec la date de la
// renonciation au droit de rétractation gardée dans la session.
export async function ouvrirPaiement(a: {
  experience: Experience;
  type: "achat" | "renouvellement";
  montantCentimes: number;
  nom: string;
  description: string;
  clerkUserId: string;
  email: string | undefined;
  // page où revenir si la cliente abandonne le paiement
  annulation: string;
}): Promise<string | null> {
  // adresse du site d'où part le paiement (production, prévisualisation ou local), pour y revenir ensuite
  const origine = (await headers()).get("origin") ?? urlSite;
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity: 1,
        price_data: { currency: "eur", unit_amount: a.montantCentimes, product_data: { name: a.nom, description: a.description } },
      }],
      client_reference_id: a.clerkUserId,
      customer_email: a.email,
      metadata: { experience: a.experience.slug, type: a.type, renonciation_le: new Date().toISOString() },
      payment_intent_data: { metadata: { experience: a.experience.slug, type: a.type, clerk_user_id: a.clerkUserId } },
      allow_promotion_codes: true,
      locale: "fr",
      success_url: `${origine}/espace/achat?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origine}${a.annulation}`,
      integration_identifier: parcours,
    });
    return session.url;
  } catch (erreur) {
    console.error("Session Stripe non créée", erreur instanceof Error ? erreur.message : erreur);
    return null;
  }
}
