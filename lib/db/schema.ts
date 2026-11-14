import { sql } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

// Toute modification passe par ce fichier, puis `pnpm db:generate` (fichier SQL dans drizzle/) et `pnpm db:migrate`.
// Les colonnes sont écrites en camelCase ici et en snake_case dans la base (option `casing`).

export const origineAcces = pgEnum("origine_acces", ["achat", "renouvellement", "offert"]);

// Accès d'un compte à une expérience payante : une ligne par achat, renouvellement ou accès offert, gardée pour
// l'historique. Une expérience est ouverte tant qu'une de ses lignes est en cours (fin vide ou dans le futur).
// La découverte, ouverte à tous, n'a pas de ligne. Les fiches des expériences restent dans lib/experiences.ts.
export const acces = pgTable(
  "acces",
  {
    id: uuid().primaryKey().defaultRandom(),
    clerkUserId: text().notNull(),
    experience: text().notNull(), // slug de lib/experiences.ts
    origine: origineAcces().notNull(),
    debut: timestamp({ withTimezone: true }).notNull().defaultNow(),
    fin: timestamp({ withTimezone: true }), // vide : sans limite (accès offert) ; un an après l'achat sinon
    stripeSessionId: text().unique(), // achats seulement, pour ne jamais enregistrer deux fois le même paiement
    montantCentimes: integer(),
    // achats : moment où la cliente a coché la renonciation au droit de rétractation (contenu ouvert dès le paiement)
    renonciationLe: timestamp({ withTimezone: true }),
    creeLe: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("acces_compte_experience_idx").on(t.clerkUserId, t.experience)],
);

// Journal des e-mails envoyés par le site. La ligne est réservée avant l'envoi : l'index unique sur (type, référence)
// empêche d'envoyer deux fois le même e-mail (deux webhooks, deux passages de la tâche planifiée).
export const emails = pgTable(
  "emails",
  {
    id: uuid().primaryKey().defaultRandom(),
    clerkUserId: text(),
    type: text().notNull(), // bienvenue, confirmation_achat, soutien (lib/email/modeles.ts)
    reference: text(), // compte pour la bienvenue, ligne d'accès pour les e-mails d'un achat
    destinataire: text().notNull(),
    sujet: text().notNull(),
    statut: text().notNull(), // en_cours, envoye, echec, ignore (pas de clé Resend)
    idResend: text(),
    erreur: text(),
    creeLe: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("emails_type_reference_idx").on(t.type, t.reference).where(sql`${t.reference} is not null`)],
);
