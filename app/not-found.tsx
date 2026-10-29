import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";

export const metadata: Metadata = { title: "Page introuvable · HypnoMorphosis", robots: { index: false } };

// adresse inconnue ou expérience retirée : on ramène vers l'accueil et les expériences
export default function PageIntrouvable() {
  return (
    <>
      <EnTete />
      <main className="introuvable grain">
        <div className="boussole" aria-hidden="true" />
        <div className="contenu wrap">
          <Image className="embleme" src="/logo/hypnomorphosis-embleme.svg" alt="" width={72} height={72} />
          <span className="caps">Page introuvable</span>
          <h1>Ce chemin ne mène <em>nulle part</em></h1>
          <p>La page que vous cherchez n’existe pas ou a changé d’adresse. D’autres chemins vous attendent.</p>
          <div className="actions">
            <Link className="btn btn-plein" href="/">Revenir à l’accueil</Link>
            <Link className="btn btn-trait" href="/#experiences">Voir les expériences</Link>
          </div>
        </div>
      </main>
      <PiedDePage />
    </>
  );
}
