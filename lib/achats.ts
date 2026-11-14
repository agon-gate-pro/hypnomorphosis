import "server-only";

import { after } from "next/server";
import type Stripe from "stripe";
import { periodeProlongation, situationsDu } from "@/lib/acces";
import { db, schema } from "@/lib/db";
import { envoyerConfirmationAchat } from "@/lib/email/automatiques";
import { experience } from "@/lib/experiences";

// Durée d'accès d'un achat : un an, prolongeable d'un an à 5,99 € (metadata.type « renouvellement »)
const unAn = 365 * 24 * 60 * 60 * 1000;

// Enregistre l'accès payé par une session Checkout (achat ou prolongation). Appelée par le webhook (qui fait foi) et
// par la page de retour (pour que la cliente n'attende pas) : `stripe_session_id` étant unique, le second appel ne crée
// rien. Renvoie le slug de l'expérience ouverte, ou null si la session n'ouvre rien.
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

  // prolongation : un an de plus à partir de la fin en cours (ou d'aujourd'hui si l'accès a pris fin)
  const renouvellement = session.metadata?.type === "renouvellement";
  const periode = renouvellement
    ? periodeProlongation((await situationsDu(clerkUserId)).get(e.slug)?.fin ?? null)
    : { debut: new Date(), fin: new Date(Date.now() + unAn) };

  const renonciation = session.metadata?.renonciation_le;
  const [ligne] = await db
    .insert(schema.acces)
    .values({
      clerkUserId,
      experience: e.slug,
      origine: renouvellement ? "renouvellement" : "achat",
      debut: periode.debut,
      fin: periode.fin,
      stripeSessionId: session.id,
      montantCentimes: session.amount_total,
      renonciationLe: renonciation ? new Date(renonciation) : null,
    })
    .onConflictDoNothing({ target: schema.acces.stripeSessionId })
    .returning();
  // première fois que ce paiement est enregistré : e-mail de confirmation, après la réponse (webhook ou page de retour)
  if (ligne) after(() => envoyerConfirmationAchat(ligne, session.customer_details?.email ?? session.customer_email));
  return e.slug;
}
