import "server-only";

import type Stripe from "stripe";
import { db, schema } from "@/lib/db";
import { experience } from "@/lib/experiences";

// Durée d'accès d'un achat : un an (renouvelable à 5,99 €, étape suivante)
const unAn = 365 * 24 * 60 * 60 * 1000;

// Enregistre l'accès payé par une session Checkout. Appelée par le webhook (qui fait foi) et par la page de retour
// (pour que la cliente n'attende pas) : `stripe_session_id` étant unique, le second appel ne crée rien.
// Renvoie le slug de l'expérience ouverte, ou null si la session n'ouvre rien.
export async function enregistrerAchat(session: Stripe.Checkout.Session): Promise<string | null> {
  // paiement différé encore en attente : l'accès s'ouvrira avec checkout.session.async_payment_succeeded
  if (session.payment_status === "unpaid") return null;

  const clerkUserId = session.client_reference_id;
  const slug = session.metadata?.experience;
  const e = slug ? experience(slug) : undefined;
  if (!clerkUserId || !e || e.prix === null) {
    console.error("Achat Stripe sans compte ou expérience reconnue", session.id);
    return null;
  }

  const renonciation = session.metadata?.renonciation_le;
  await db
    .insert(schema.acces)
    .values({
      clerkUserId,
      experience: e.slug,
      origine: "achat",
      debut: new Date(),
      fin: new Date(Date.now() + unAn),
      stripeSessionId: session.id,
      montantCentimes: session.amount_total,
      renonciationLe: renonciation ? new Date(renonciation) : null,
    })
    .onConflictDoNothing({ target: schema.acces.stripeSessionId });
  return e.slug;
}
