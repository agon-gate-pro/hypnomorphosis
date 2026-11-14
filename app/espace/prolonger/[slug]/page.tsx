import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import FormulaireAchat from "@/components/FormulaireAchat";
import PiedDePage from "@/components/PiedDePage";
import { periodeProlongation, situationsDuCompte } from "@/lib/acces";
import { dateLongue } from "@/lib/dates";
import { experience, prolongation } from "@/lib/experiences";
import { achatOuvert } from "@/lib/stripe";
import { prolonger } from "./actions";

export const metadata: Metadata = { title: "Prolonger mon accès · HypnoMorphosis", robots: { index: false } };

// Prolongation d'un an d'une expérience achetée, ouverte à partir de 30 jours avant la fin, puis sans limite après.
// Liens depuis Mon espace, la page de l'expérience, l'e-mail de rappel et la fiche (accès terminé).
export default async function Prolonger({ params }: PageProps<"/espace/prolonger/[slug]">) {
  await auth.protect();
  const e = experience((await params).slug);
  if (!e || e.prix === null) notFound();
  const situation = (await situationsDuCompte()).get(e.slug);
  if (!situation?.prolongeable || !situation.fin) redirect("/espace");
  const nouvelleFin = periodeProlongation(situation.fin).fin;

  return (
    <>
      <EnTete />
      <main className="espace">
        <section className="experience-tete grain">
          <div className="wrap">
            <div className="couv-mini">
              <Image src={e.couverture} alt="" fill sizes="170px" priority />
            </div>
            <div>
              <Link className="retour" href="/espace">← Mon espace</Link>
              <span className="caps">Prolonger mon accès · {e.duree}</span>
              <h1>{e.titre}</h1>
              <p>
                {situation.ouverte
                  ? <>Votre accès se termine le {dateLongue(situation.fin)}.</>
                  : <>Votre accès a pris fin le {dateLongue(situation.fin)}.</>}
              </p>
              <div className="prolonger-texte">
                <p>
                  Prolongez-le d’une année pour retrouver votre carnet et vos audios jusqu’au <b>{dateLongue(nouvelleFin)}</b>.
                  {situation.ouverte && " L’année s’ajoute à votre date de fin : vous ne perdez aucun jour."}
                </p>
              </div>
              {achatOuvert() ? (
                <FormulaireAchat action={prolonger.bind(null, e.slug)} prix={prolongation.prix} libelle="Prolonger d’un an" />
              ) : (
                <div className="fiche-achat">
                  <span className="prix">{prolongation.prix}</span>
                  <span className="btn btn-plein inactif" aria-disabled="true">Prolongation bientôt disponible</span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <PiedDePage />
    </>
  );
}
