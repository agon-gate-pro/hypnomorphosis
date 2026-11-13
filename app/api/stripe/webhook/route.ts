import type Stripe from "stripe";
import { enregistrerAchat } from "@/lib/achats";
import { stripe } from "@/lib/stripe";

// Webhook Stripe : c'est lui qui fait foi pour ouvrir un accès payé, même si la cliente ferme son navigateur avant de
// revenir sur le site. Signature vérifiée avec STRIPE_WEBHOOK_SECRET (point de terminaison créé dans Stripe pour
// https://<site>/api/stripe/webhook, événements checkout.session.completed, .async_payment_succeeded et
// .async_payment_failed). En local : `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
export async function POST(requete: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("Webhook Stripe : STRIPE_WEBHOOK_SECRET manquante");
    return Response.json({ erreur: "Webhook non configuré" }, { status: 500 });
  }
  const signature = requete.headers.get("stripe-signature");
  if (!signature) return Response.json({ erreur: "Signature absente" }, { status: 400 });

  let evenement: Stripe.Event;
  try {
    evenement = stripe().webhooks.constructEvent(await requete.text(), signature, secret);
  } catch {
    return Response.json({ erreur: "Signature invalide" }, { status: 400 });
  }

  switch (evenement.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      await enregistrerAchat(evenement.data.object);
      break;
    case "checkout.session.async_payment_failed":
      // rien n'a été ouvert : la cliente peut relancer l'achat depuis la fiche
      console.error("Paiement différé refusé", evenement.data.object.id);
      break;
  }
  return Response.json({ recu: true });
}
