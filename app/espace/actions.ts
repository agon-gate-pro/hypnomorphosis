"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

// choix de la cliente pour les annonces (nouvelles expériences, offres), gardé avec sa date comme preuve du consentement
export type ChoixAnnonces = { accepte: boolean; date: string };

// Enregistré dans les métadonnées privées du compte Clerk, que seul le serveur lit. Repris en base avec le chantier des e-mails.
export async function choisirAnnonces(accepte: boolean): Promise<{ ok: boolean }> {
  const { userId } = await auth();
  if (!userId) return { ok: false };
  const annonces: ChoixAnnonces = { accepte, date: new Date().toISOString() };
  try {
    await (await clerkClient()).users.updateUserMetadata(userId, { privateMetadata: { annonces } });
    return { ok: true };
  } catch (erreur) {
    console.error("Choix des annonces non enregistré", erreur instanceof Error ? erreur.message : erreur);
    return { ok: false };
  }
}
