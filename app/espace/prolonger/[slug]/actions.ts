"use server";

import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import type { EtatAchat } from "@/app/experiences/[slug]/actions";
import { situationsDuCompte } from "@/lib/acces";
import { experience, prolongation } from "@/lib/experiences";
import { ouvrirPaiement } from "@/lib/paiement";
import { achatOuvert } from "@/lib/stripe";

// Prolongation d'un an d'une expérience achetée, à partir de 30 jours avant la fin (lib/acces.ts) : même case à cocher
// que pour l'achat, puis paiement sur la page Stripe. La nouvelle fin est calculée à l'enregistrement (lib/achats.ts).
export async function prolonger(slug: string, _etat: EtatAchat, donnees: FormData): Promise<EtatAchat> {
  const e = experience(slug);
  if (!e || e.prix === null || !achatOuvert()) return { erreur: "La prolongation n’est pas disponible pour le moment." };

  const { userId } = await auth.protect();
  if (donnees.get("renonciation") !== "oui") return { erreur: "Cochez la case ci-dessus pour continuer." };
  if (!(await situationsDuCompte()).get(slug)?.prolongeable) redirect("/espace");

  const compte = await currentUser();
  const adresse = await ouvrirPaiement({
    experience: e,
    type: "renouvellement",
    montantCentimes: prolongation.prixCentimes,
    nom: `${e.titre} · Prolongation d’un an`,
    description: "Une année d’accès de plus à votre carnet et à vos audios, dans votre espace HypnoMorphosis.",
    clerkUserId: userId,
    email: compte?.primaryEmailAddress?.emailAddress,
    annulation: `/espace/prolonger/${e.slug}`,
  });
  if (!adresse) return { erreur: "Le paiement n’a pas pu démarrer. Réessayez un peu plus tard." };
  redirect(adresse);
}
