import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import { enregistrerAchat } from "@/lib/achats";
import { experience } from "@/lib/experiences";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Merci · HypnoMorphosis", robots: { index: false } };

// Retour de la page de paiement Stripe. Le webhook ouvre l'accès ; cette page l'enregistre aussi (sans doublon)
// pour que la cliente trouve son expérience ouverte tout de suite, même si le webhook arrive après elle.
export default async function RetourAchat({ searchParams }: PageProps<"/espace/achat">) {
  const { userId } = await auth.protect();
  const { session_id: idSession } = await searchParams;
  if (typeof idSession !== "string" || !idSession.startsWith("cs_")) notFound();

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe().checkout.sessions.retrieve(idSession);
  } catch {
    notFound();
  }
  // une session ne se lit que par le compte qui l'a payée
  if (session.client_reference_id !== userId) notFound();

  const ouverte = await enregistrerAchat(session);
  const e = experience(session.metadata?.experience ?? "");

  return (
    <>
      <EnTete />
      <main className="espace">
        <section className="espace-tete grain">
          <div className="wrap">
            <span className="caps">Merci</span>
            {ouverte && e ? (
              <>
                <h1>{e.titre} <em>est ouverte</em></h1>
                <p>Votre expérience vous attend dans votre espace, pour un an. Prenez le temps de vous installer avant de commencer.</p>
                <div className="espace-actions">
                  <Link className="btn btn-plein" href={`/espace/experiences/${e.slug}`}>Commencer mon expérience</Link>
                  <Link className="lien-discret" href="/espace">Mon espace</Link>
                </div>
              </>
            ) : (
              <>
                <h1>Paiement <em>en cours</em></h1>
                <p>Votre paiement est en cours de confirmation. Votre expérience s’ouvrira dans votre espace dès qu’il sera validé.</p>
                <div className="espace-actions">
                  <Link className="btn btn-plein" href="/espace">Mon espace</Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <PiedDePage />
    </>
  );
}
