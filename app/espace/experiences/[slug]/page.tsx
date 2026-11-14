import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import LecteurAudio from "@/components/LecteurAudio";
import { Icone } from "@/components/Icones";
import { situationsDuCompte } from "@/lib/acces";
import { dateLongue } from "@/lib/dates";
import { experienceOuverte, prolongation } from "@/lib/experiences";

export const metadata: Metadata = { title: "Mon expérience · HypnoMorphosis", robots: { index: false } };

// L'intérieur d'une expérience : carnet à imprimer et audios. Les fichiers passent par la route « fichiers »,
// qui revérifie les droits à chaque chargement.
export default async function MonExperience({ params }: PageProps<"/espace/experiences/[slug]">) {
  await auth.protect();
  const situations = await situationsDuCompte();
  const acces = [...situations.values()].filter((s) => s.ouverte).map((s) => s.experience);
  const e = experienceOuverte((await params).slug, acces);
  if (!e?.contenus) notFound();
  const situation = situations.get(e.slug);
  const fichier = (nom: string) => `/espace/experiences/${e.slug}/fichiers/${nom}`;
  const nomAudios = e.contenus.titreAudios ?? e.titre;

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
              <span className="caps">{e.prix === null ? "Offerte" : "Expérience"} · {e.duree}</span>
              <h1>{e.titre}</h1>
              <p>{e.resume}</p>
              <a className="btn btn-plein" href={fichier(e.contenus.carnet)} target="_blank" rel="noopener">
                <Icone nom="carnet" />Ouvrir mon carnet (PDF)
              </a>
              <Link className="lien-aide" href="/aide/tablette">Le remplir sur tablette, sans l’imprimer&nbsp;?</Link>
              {/* dans les 30 derniers jours d'un accès acheté */}
              {situation?.prolongeable && situation.fin && (
                <div className="prolonger-encart">
                  <p>Votre accès se termine le {dateLongue(situation.fin)}.</p>
                  <Link className="btn btn-trait" href={`/espace/prolonger/${e.slug}`}>Prolonger d’un an · {prolongation.prix}</Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* consignes provisoires, reprises du brief (accueil) ; la phrase de sécurité est à valider par Bérénice */}
        <section className="wrap espace-bloc experience-grille">
          <div>
            <h2 className="espace-titre">Vos expériences audio</h2>
            <ol className="lecteurs">
              {e.contenus.audios.map((audio, i) => (
                <li key={audio}><LecteurAudio numero={i + 1} titre={`${nomAudios} – Audio ${i + 1}`} src={fichier(audio)} /></li>
              ))}
            </ol>
            <p className="consigne">Installez-vous confortablement, dans un endroit calme, de préférence avec un casque. N’écoutez jamais ces audios en conduisant ou pendant une activité qui demande votre attention.</p>
          </div>
          <aside className="experience-guide">
            <h2 className="espace-titre">Pendant ces {e.duree}</h2>
            <ul className="acces">
              <li><Icone nom="carnet" /><span><b>Imprimez votre carnet</b> ou ouvrez-le sur votre tablette : vous y réaliserez directement les exercices</span></li>
              <li><Icone nom="casque" /><span><b>{e.contenus.audios.length} expériences audio guidées</b> pour vous laisser guider autrement</span></li>
              {/* mêmes éléments dans toutes les expériences (Bérénice, 2026-11-13) */}
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
