import "server-only";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";

// Accès d'un compte aux expériences payantes, calculés à partir de ses lignes dans la base (achat, renouvellement ou
// accès offert ; une ligne sans fin, ou avec une fin dans le futur, ouvre l'expérience).

const jour = 24 * 60 * 60 * 1000;
const unAn = 365 * jour;
// la prolongation est proposée à partir de 30 jours avant la fin, puis sans limite après la fin
// (choix d'Alexis du 2026-11-14, à confirmer par Bérénice)
const fenetreProlongation = 30 * jour;

export type Situation = {
  experience: string;
  ouverte: boolean;
  // date de fin la plus lointaine ; null : sans limite (accès offert)
  fin: Date | null;
  // achetée au moins une fois : prolongeable à 5,99 €
  achetee: boolean;
  // achetée, avec une fin dans moins de 30 jours ou déjà passée
  prolongeable: boolean;
};

export async function situationsDu(clerkUserId: string, maintenant = new Date()): Promise<Map<string, Situation>> {
  const lignes = await db
    .select({ experience: schema.acces.experience, origine: schema.acces.origine, fin: schema.acces.fin })
    .from(schema.acces)
    .where(eq(schema.acces.clerkUserId, clerkUserId));

  const parExperience = new Map<string, typeof lignes>();
  for (const l of lignes) parExperience.set(l.experience, [...(parExperience.get(l.experience) ?? []), l]);

  const situations = new Map<string, Situation>();
  for (const [experience, ls] of parExperience) {
    const sansFin = ls.some((l) => l.fin === null);
    const fin = sansFin ? null : new Date(Math.max(...ls.map((l) => l.fin!.getTime())));
    const ouverte = fin === null || fin > maintenant;
    const achetee = ls.some((l) => l.origine !== "offert");
    const prolongeable = achetee && fin !== null && fin.getTime() - maintenant.getTime() < fenetreProlongation;
    situations.set(experience, { experience, ouverte, fin, achetee, prolongeable });
  }
  return situations;
}

// Situations du compte connecté (vide sans connexion)
export async function situationsDuCompte(): Promise<Map<string, Situation>> {
  const { userId } = await auth();
  return userId ? situationsDu(userId) : new Map();
}

// Expériences payantes ouvertes au compte connecté
export async function accesDuCompte(): Promise<string[]> {
  return [...(await situationsDuCompte()).values()].filter((s) => s.ouverte).map((s) => s.experience);
}

// Nouvelle période d'une prolongation : un an ajouté à la fin en cours, ou à aujourd'hui si l'accès a pris fin
export function periodeProlongation(fin: Date | null, maintenant = new Date()) {
  const debut = fin && fin > maintenant ? fin : maintenant;
  return { debut, fin: new Date(debut.getTime() + unAn) };
}
