import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import { and, eq, gt, isNull, lte, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db, schema } from "@/lib/db";
import { experience } from "@/lib/experiences";
import { envoyerEmail } from "./envoi";
import { emailBienvenue, emailConfirmationAchat, emailSoutien } from "./modeles";

// Déclenchement des e-mails automatiques. Chaque e-mail a une référence unique (le compte, ou la ligne d'accès) :
// un même événement reçu deux fois n'envoie qu'un e-mail.

type Ligne = typeof schema.acces.$inferSelect;

async function coordonnees(clerkUserId: string) {
  const compte = await (await clerkClient()).users.getUser(clerkUserId);
  return { email: compte.primaryEmailAddress?.emailAddress ?? null, prenom: compte.firstName };
}

// Création du compte (webhook Clerk user.created)
export async function envoyerBienvenue(a: { clerkUserId: string; email: string; prenom: string | null }) {
  await envoyerEmail({ a: a.email, type: "bienvenue", reference: a.clerkUserId, clerkUserId: a.clerkUserId, contenu: emailBienvenue(a.prenom) });
}

// Achat enregistré (lib/achats.ts) ; l'adresse vient de Stripe si elle y est, sinon du compte
export async function envoyerConfirmationAchat(ligne: Ligne, emailStripe: string | null | undefined) {
  const e = experience(ligne.experience);
  if (!e || !ligne.fin) return;
  const { email, prenom } = await coordonnees(ligne.clerkUserId);
  const a = emailStripe || email;
  if (!a) return;
  await envoyerEmail({
    a,
    type: "confirmation_achat",
    reference: ligne.id,
    clerkUserId: ligne.clerkUserId,
    contenu: emailConfirmationAchat({ prenom, experience: e, montantCentimes: ligne.montantCentimes, fin: ligne.fin, renonciationLe: ligne.renonciationLe }),
  });
}

const jour = 24 * 60 * 60 * 1000;

// Tâche planifiée du matin : mot de soutien aux achats d'il y a au moins 15 jours, jamais encore envoyé.
// La fenêtre de 15 à 30 jours évite d'écrire à d'anciens achats si la tâche a été arrêtée un temps.
export async function envoyerSoutiens() {
  const maintenant = Date.now();
  const deja = alias(schema.emails, "deja");
  const lignes = await db
    .select({ acces: schema.acces })
    .from(schema.acces)
    // la référence d'un e-mail est du texte, l'identifiant d'un accès un uuid : comparaison après conversion
    .leftJoin(deja, and(eq(deja.type, "soutien"), eq(deja.reference, sql`${schema.acces.id}::text`)))
    .where(and(
      eq(schema.acces.origine, "achat"),
      lte(schema.acces.debut, new Date(maintenant - 15 * jour)),
      gt(schema.acces.debut, new Date(maintenant - 30 * jour)),
      isNull(deja.id),
    ));

  let envoyes = 0;
  for (const { acces: ligne } of lignes) {
    const e = experience(ligne.experience);
    if (!e) continue;
    const { email, prenom } = await coordonnees(ligne.clerkUserId);
    if (!email) continue;
    await envoyerEmail({ a: email, type: "soutien", reference: ligne.id, clerkUserId: ligne.clerkUserId, contenu: emailSoutien({ prenom, experience: e }) });
    envoyes++;
  }
  return envoyes;
}
