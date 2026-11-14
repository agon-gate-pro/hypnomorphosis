"use server";

import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { situationsDuCompte } from "@/lib/acces";
import { experience } from "@/lib/experiences";
import { ouvrirPaiement } from "@/lib/paiement";
import { achatOuvert } from "@/lib/stripe";

export type EtatAchat = { erreur?: string };

// Achat depuis la fiche : compte obligatoire (l'accès s'ouvre dans Mon espace), renonciation au droit de rétractation
// cochée (contenu numérique ouvert dès le paiement), puis paiement sur la page Stripe.
export async function acheter(slug: string, _etat: EtatAchat, donnees: FormData): Promise<EtatAchat> {
  const e = experience(slug);
  if (!e || e.prix === null || !e.prixCentimes || !achatOuvert()) return { erreur: "L’achat n’est pas disponible pour le moment." };

  const { userId } = await auth();
  // sans compte : création du compte, puis retour sur la fiche
  if (!userId) redirect(`/inscription?redirect_url=${encodeURIComponent(`/experiences/${slug}`)}`);

  if (donnees.get("renonciation") !== "oui") return { erreur: "Cochez la case ci-dessus pour continuer." };
  const situation = (await situationsDuCompte()).get(slug);
  if (situation?.ouverte) redirect(`/espace/experiences/${slug}`);
  // déjà achetée, accès terminé : prolongation à 5,99 € plutôt qu'un nouvel achat
  if (situation?.achetee) redirect(`/espace/prolonger/${slug}`);

  const compte = await currentUser();
  const audios = e.contenus?.audios.length ?? 5;
  const adresse = await ouvrirPaiement({
    experience: e,
    type: "achat",
    montantCentimes: e.prixCentimes,
    nom: `${e.titre} · Expérience HypnoMorphosis`,
    description: `Accès d’un an : carnet à imprimer ou à remplir sur tablette et ${audios} audios guidés.`,
    clerkUserId: userId,
    email: compte?.primaryEmailAddress?.emailAddress,
    annulation: `/experiences/${e.slug}`,
  });
  if (!adresse) return { erreur: "Le paiement n’a pas pu démarrer. Réessayez un peu plus tard." };
  redirect(adresse);
}
