import "server-only";

import Stripe from "stripe";

// Client Stripe, sur le compte de Bérénice (branché par Madus). Clé restreinte (rk_) conseillée plutôt que la clé
// secrète complète. La version d'API est celle du SDK installé.

let client: Stripe | null = null;

export function stripe() {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) throw new Error("STRIPE_SECRET_KEY manquante : lancer `vercel env pull` pour récupérer .env.local");
  client ??= new Stripe(cle, { appInfo: { name: "HypnoMorphosis" } });
  return client;
}

// L'achat ne s'ouvre sur les fiches que lorsque la clé et le secret du webhook sont posés : sans webhook, un paiement
// réussi dont la cliente ne revient pas sur le site n'ouvrirait jamais son accès.
export function achatOuvert() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
}
