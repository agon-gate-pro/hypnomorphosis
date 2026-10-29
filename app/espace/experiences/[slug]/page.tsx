import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import LecteurAudio from "@/components/LecteurAudio";
import { Icone, SpriteIcones } from "@/components/Icones";
import { experienceOuverte } from "@/lib/experiences";

export const metadata: Metadata = { title: "Mon expérience · HypnoMorphosis", robots: { index: false } };

// L'intérieur d'une expérience : carnet à imprimer et audios. Les fichiers passent par la route « fichiers »,
// qui revérifie les droits à chaque chargement. Le carnet en ligne viendra avec la base de données.
export default async function MonExperience({ params }: PageProps<"/espace/experiences/[slug]">) {
  await auth.protect();
  const e = experienceOuverte((await params).slug);
  if (!e?.contenus) notFound();
  const fichier = (nom: string) => `/espace/experiences/${e.slug}/fichiers/${nom}`;

  return (
    <>
      <SpriteIcones />
      <EnTete />
      <main className="espace">
        <section className="experience-tete grain">
          <div className="wrap">
            <div className="couv-mini">
              <Image src={e.couverture} alt="" fill sizes="170px" priority />
            </div>
            <div>
              <Link className="retour" href="/espace">← Mon espace</Link>
              <span className="caps">{e.categorie} · {e.duree}</span>
              <h1>{e.titre}</h1>
              <p>{e.resume}</p>
              <a className="btn btn-plein" href={fichier(e.contenus.carnet)} target="_blank" rel="noopener">
                <Icone nom="carnet" />Ouvrir mon carnet (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* consignes provisoires, reprises du brief (accueil) ; la phrase de sécurité est à valider par Bérénice */}
        <section className="wrap espace-bloc experience-grille">
          <div>
            <h2 className="espace-titre">Vos expériences audio</h2>
            <ol className="lecteurs">
              {e.contenus.audios.map((a, i) => (
                <li key={a.fichier}><LecteurAudio numero={i + 1} titre={a.titre} src={fichier(a.fichier)} /></li>
              ))}
            </ol>
            <p className="consigne">Installez-vous confortablement, dans un endroit calme, de préférence avec un casque. N’écoutez jamais ces audios en conduisant ou pendant une activité qui demande votre attention.</p>
          </div>
          <aside className="experience-guide">
            <h2 className="espace-titre">Pendant ces {e.duree}</h2>
            <ul className="acces">
              <li><Icone nom="carnet" /><span><b>Imprimez votre carnet</b> : vous y réaliserez directement les exercices</span></li>
              <li><Icone nom="casque" /><span><b>2 expériences audio guidées</b> pour vous laisser guider autrement</span></li>
              <li><Icone nom="chemin" /><span><b>Une ordalie</b>, pour expérimenter plutôt que simplement réfléchir</span></li>
              <li><Icone nom="plume" /><span><b>Un exercice chaque jour</b>, pour avancer pas à pas dans l’expérience</span></li>
              <li><Icone nom="sceau" /><span><b>Un engagement à signer</b>, pour marquer votre décision d’aller jusqu’au bout</span></li>
            </ul>
          </aside>
        </section>
      </main>
      <PiedDePage />
    </>
  );
}
