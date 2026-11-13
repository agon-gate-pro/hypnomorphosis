import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Connexion à la base Neon (Vercel Marketplace), même montage que Set et Brique.

const urlBrute = process.env.DATABASE_URL;
if (!urlBrute) {
  throw new Error("DATABASE_URL manquante : lancer `vercel env pull` pour récupérer .env.local");
}

// Neon fournit `sslmode=require`, que `pg` 8 traite déjà comme `verify-full` mais avec un avertissement à la première
// connexion, affiché par Next en dev comme une erreur. On écrit le mode explicitement, à comportement identique.
export function sslExplicite(url: string) {
  return url.replace(/sslmode=(require|prefer|verify-ca)\b/, "sslmode=verify-full");
}

// un seul pool par instance de fonction, réutilisé entre les requêtes (Fluid Compute) ; attachDatabasePool ferme
// proprement les connexions quand l'instance s'arrête
const globalPourDb = globalThis as unknown as { pool?: Pool };

const pool = globalPourDb.pool ?? new Pool({ connectionString: sslExplicite(urlBrute), max: 5, idleTimeoutMillis: 30_000 });

if (!globalPourDb.pool) {
  globalPourDb.pool = pool;
  attachDatabasePool(pool);
}

export const db = drizzle(pool, { schema, casing: "snake_case" });
export { schema };
