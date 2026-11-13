import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "drizzle-kit";

// Les migrations passent par la connexion directe (sans pooler), comme le recommande Neon ; le site utilise DATABASE_URL.
const urlBrute = process.env.DATABASE_URL_UNPOOLED;
if (!urlBrute) {
  throw new Error("DATABASE_URL_UNPOOLED manquante : lancer `vercel env pull` pour récupérer .env.local");
}
// même écriture du mode SSL que lib/db/index.ts
const url = urlBrute.replace(/sslmode=(require|prefer|verify-ca)\b/, "sslmode=verify-full");

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  casing: "snake_case",
  strict: true,
  verbose: true,
});
