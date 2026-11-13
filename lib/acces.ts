import { auth } from "@clerk/nextjs/server";
import { and, eq, gt, isNull, or } from "drizzle-orm";
import { db, schema } from "@/lib/db";

// Expériences payantes ouvertes au compte connecté : celles qui ont une ligne d'accès en cours dans la base
// (achat, renouvellement ou accès offert, sans fin ou avec une fin dans le futur).
export async function accesDuCompte(): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) return [];
  const { acces } = schema;
  const lignes = await db
    .selectDistinct({ experience: acces.experience })
    .from(acces)
    .where(and(eq(acces.clerkUserId, userId), or(isNull(acces.fin), gt(acces.fin, new Date()))));
  return lignes.map((l) => l.experience);
}
