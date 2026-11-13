import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import BoutonDeconnexion from "@/components/BoutonDeconnexion";
import CaseAnnonces from "@/components/CaseAnnonces";
import { Icone, SpriteIcones } from "@/components/Icones";
import { accesDuCompte } from "@/lib/acces";
import { experiencesADecouvrir, experiencesOuvertes } from "@/lib/experiences";
import type { ChoixAnnonces } from "./actions";

export const metadata: Metadata = { title: "Mon espace · HypnoMorphosis", robots: { index: false } };

export default async function Espace() {
  // renvoie vers /connexion, puis ici, si la visiteuse n'est pas connectée
  await auth.protect();
  const utilisatrice = await currentUser();
  const prenom = utilisatrice?.firstName?.trim();
  const annonces = utilisatrice?.privateMetadata.annonces as ChoixAnnonces | undefined;
  const acces = await accesDuCompte();
  const ouvertes = experiencesOuvertes(acces);
  // une expérience déjà ouverte ne figure plus dans les suggestions
  const aDecouvrir = experiencesADecouvrir().filter((e) => !acces.includes(e.slug));

  return (
    <>
      <SpriteIcones />
      <EnTete />
      <main className="espace">
        <section className="espace-tete grain">
          <div className="wrap">
            <span className="caps">Mon espace</span>
            <h1>Bonjour{prenom ? <>, <em>{prenom}</em></> : null}</h1>
            <p>Retrouvez ici vos expériences : les audios à écouter et le carnet à imprimer ou à remplir sur tablette.</p>
            <div className="espace-actions">
              <Link className="btn btn-trait" href="/espace/compte">Gérer mon compte</Link>
              <BoutonDeconnexion className="lien-discret" />
            </div>
          </div>
        </section>

        <section className="wrap espace-bloc">
          <h2 className="espace-titre">Mes expériences</h2>
          <ul className="espace-liste">
            {ouvertes.map((e) => (
              <li key={e.slug} className="espace-carnet">
                <div className="couv-mini">
                  <Image src={e.couverture} alt="" fill sizes="140px" />
                </div>
                <div className="espace-carnet-texte">
                  <span className="caps">{e.prix === null ? "Offerte" : "Expérience"} · {e.duree}</span>
                  <h3>{e.titre}</h3>
                  <p>{e.resume}</p>
                  <div className="formats">
                    <span><Icone nom="casque" />Audios</span>
                    <span><Icone nom="carnet" />Carnet à imprimer</span>
                    <span><Icone nom="ecran" />Sur tablette</span>
                  </div>
                  {e.contenus
                    ? <Link className="btn btn-plein" href={`/espace/experiences/${e.slug}`}>Ouvrir mon expérience</Link>
                    : <span className="btn btn-plein inactif" aria-disabled="true">Bientôt disponible</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap espace-bloc espace-annonces">
          <h2 className="espace-titre">Nouvelles expériences</h2>
          <CaseAnnonces accepte={annonces?.accepte === true} />
        </section>

        {/* rien à proposer quand toutes les expériences sont déjà ouvertes */}
        {aDecouvrir.length > 0 && (
          <section className="espace-suite">
            <div className="wrap espace-bloc">
              <h2 className="espace-titre">Pour continuer le chemin</h2>
              <ul className="espace-grille">
                {aDecouvrir.map((e) => (
                  <li key={e.slug}>
                    <Link className="espace-suggestion" href={`/experiences/${e.slug}`}>
                      <div className="couv-mini">
                        <Image src={e.couverture} alt="" fill sizes="96px" />
                      </div>
                      <div>
                        <span className="caps">{e.duree}</span>
                        <h3>{e.titre}</h3>
                        <p>{e.resume}</p>
                        <span className="prix">{e.prix}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <PiedDePage />
    </>
  );
}
