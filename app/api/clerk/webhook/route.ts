import type { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { envoyerBienvenue } from "@/lib/email/automatiques";

// Webhook Clerk : à la création d'un compte, e-mail de bienvenue avec l'accès à l'expérience découverte.
// Signature vérifiée avec CLERK_WEBHOOK_SIGNING_SECRET (point de terminaison créé dans le tableau de bord Clerk pour
// https://<site>/api/clerk/webhook, événement user.created).
export async function POST(requete: NextRequest) {
  let evenement;
  try {
    evenement = await verifyWebhook(requete);
  } catch {
    return Response.json({ erreur: "Signature invalide" }, { status: 400 });
  }

  if (evenement.type === "user.created") {
    const compte = evenement.data;
    const email = compte.email_addresses.find((a) => a.id === compte.primary_email_address_id)?.email_address;
    if (email) await envoyerBienvenue({ clerkUserId: compte.id, email, prenom: compte.first_name });
  }
  return Response.json({ recu: true });
}
