"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { accesDuCompte } from "@/lib/acces";
import { experience } from "@/lib/experiences";
import { urlSite } from "@/lib/site";
import { achatOuvert, stripe } from "@/lib/stripe";

export type EtatAchat = { erreur?: string };

// étiquette des sessions de ce parcours dans le tableau de bord Stripe (fiche d'expérience → Checkout)
const parcours = "hypnomorphosis-fiche-qtwbzmle";

// Achat depuis la fiche : compte obligatoire (l'accès s'ouvre dans Mon espace), renonciation au droit de rétractation
// cochée (contenu numérique ouvert dès le paiement), puis paiement sur la page Stripe. L'accès est enregistré par le
// webhook (lib/achats.ts), avec la date de la renonciation gardée dans la session.
export async function acheter(slug: string, _etat: EtatAchat, donnees: FormData): Promise<EtatAchat> {
  const e = experience(slug);
  if (!e || e.prix === null || !e.prixCentimes || !achatOuvert()) return { erreur: "L’achat n’est pas disponible pour le moment." };

  const { userId } = await auth();
  // sans compte : création du compte, puis retour sur la fiche
  if (!userId) redirect(`/inscription?redirect_url=${encodeURIComponent(`/experiences/${slug}`)}`);

  if (donnees.get("renonciation") !== "oui") return { erreur: "Cochez la case ci-dessus pour continuer." };
  if ((await accesDuCompte()).includes(slug)) redirect(`/espace/experiences/${slug}`);

  const compte = await currentUser();
  // adresse du site d'où part l'achat (production, prévisualisation ou local), pour y revenir après le paiement
  const origine = (await headers()).get("origin") ?? urlSite;
  const audios = e.contenus?.audios.length ?? 5;

  let adresse: string | null = null;
  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: e.prixCentimes,
          product_data: {
            name: `${e.titre} · Expérience HypnoMorphosis`,
            description: `Accès d’un an : carnet à imprimer ou à remplir sur tablette et ${audios} audios guidés.`,
          },
        },
      }],
      client_reference_id: userId,
      customer_email: compte?.primaryEmailAddress?.emailAddress,
      metadata: { experience: e.slug, renonciation_le: new Date().toISOString() },
      payment_intent_data: { metadata: { experience: e.slug, clerk_user_id: userId } },
      allow_promotion_codes: true,
      locale: "fr",
      success_url: `${origine}/espace/achat?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origine}/experiences/${e.slug}`,
      integration_identifier: parcours,
    });
    adresse = session.url;
  } catch (erreur) {
    console.error("Session Stripe non créée", erreur instanceof Error ? erreur.message : erreur);
  }
  if (!adresse) return { erreur: "Le paiement n’a pas pu démarrer. Réessayez un peu plus tard." };
  redirect(adresse);
}
