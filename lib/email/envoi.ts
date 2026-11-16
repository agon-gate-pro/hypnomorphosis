import "server-only";

import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { db, schema } from "@/lib/db";
import { societe } from "@/lib/site";
import { rendreEmail, type ContenuEmail } from "./mise-en-page";

// Envoi par Resend (compte direct, équipe agon-gate).
// - Expéditeur : EMAIL_FROM (HypnoMorphosis <bonjour@hypnomorphosis.com>, domaine vérifié dans Resend le 2026-11-16) ;
//   à défaut, l'adresse de test de Resend, qui n'écrit qu'à l'adresse du compte Resend.
// - EMAIL_TEST_RECIPIENT : si renseignée, tout part à cette adresse (la base est partagée avec le site en ligne).
// - Sans clé Resend, rien ne part : l'e-mail est journalisé « ignore ».
// Un envoi raté ne fait jamais échouer ce qui l'a déclenché (achat, inscription) : l'erreur va au journal `emails`.

const expediteur = process.env.EMAIL_FROM || "HypnoMorphosis <onboarding@resend.dev>";
// les réponses des clientes arrivent sur l'adresse de contact de Bérénice (l'adresse d'envoi n'a pas de boîte)
const reponses = societe.email ?? undefined;

let client: Resend | null = null;
function resend() {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) return null;
  client ??= new Resend(cle);
  return client;
}

type Envoi = {
  a: string;
  type: string;
  // e-mail unique par (type, référence) : un second appel avec la même référence n'envoie rien
  reference: string;
  clerkUserId?: string | null;
  contenu: ContenuEmail;
};

export async function envoyerEmail({ a, type, reference, clerkUserId = null, contenu }: Envoi) {
  const test = process.env.EMAIL_TEST_RECIPIENT;
  const destinataire = test || a;
  const sujet = test ? `[test → ${a}] ${contenu.sujet}` : contenu.sujet;

  // réserve la ligne : si elle existe déjà, cet e-mail est parti (ou part) ailleurs
  const [ligne] = await db
    .insert(schema.emails)
    .values({ clerkUserId, type, reference, destinataire: a, sujet: contenu.sujet, statut: "en_cours" })
    .onConflictDoNothing()
    .returning({ id: schema.emails.id });
  if (!ligne) return;

  const api = resend();
  let statut = "ignore";
  let idResend: string | null = null;
  let erreur: string | null = null;
  if (api) {
    try {
      const { html, text } = rendreEmail(contenu);
      const r = await api.emails.send({ from: expediteur, to: destinataire, replyTo: reponses, subject: sujet, html, text }, { idempotencyKey: `email/${ligne.id}` });
      if (r.error) {
        statut = "echec";
        erreur = `${r.error.name}: ${r.error.message}`;
      } else {
        statut = "envoye";
        idResend = r.data?.id ?? null;
      }
    } catch (e) {
      statut = "echec";
      erreur = e instanceof Error ? e.message : String(e);
    }
  }
  if (erreur) console.error(`E-mail ${type} non envoyé`, erreur);
  await db.update(schema.emails).set({ statut, idResend, erreur }).where(eq(schema.emails.id, ligne.id));
}
