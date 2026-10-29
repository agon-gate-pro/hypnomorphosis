import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Apparitions from "@/components/Apparitions";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import { SpriteIcones } from "@/components/Icones";
import DonneesStructurees from "@/components/DonneesStructurees";
import { berenice, lienFigaro, metaPage, organisation, urlSite } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Derrière HypnoMorphosis · Bérénice, ancienne infirmière urgentiste et hypnothérapeute",
  description: "L’histoire de Bérénice, ancienne infirmière urgentiste devenue hypnothérapeute : des urgences au cabinet, puis la création d’HypnoMorphosis, des expériences d’hypnose à vivre chez soi.",
  chemin: "/derriere-hypnomorphosis",
});

// page de profil : Bérénice, créatrice de la marque
const donnees = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfilePage", "@id": `${urlSite}/derriere-hypnomorphosis`, url: `${urlSite}/derriere-hypnomorphosis`, inLanguage: "fr", mainEntity: { "@id": berenice["@id"] } },
    berenice,
    organisation,
  ],
};

const delai = (rang: number) => ({ "--delai": `${rang * 0.25}s` }) as CSSProperties;

// Texte de Bérénice, repris mot pour mot de son brief (docs/SITE INTERNET.pdf, section 7), typographie corrigée.
// Seul le bloc du studio est ajouté par Agon Gate, avec un texte provisoire en attendant ses propres mots.
export default function DerriereHypnoMorphosis() {
  return (
    <>
      <DonneesStructurees donnees={donnees} />
      <SpriteIcones />
      <EnTete />
      <main>
        <section className="histoire-ouverture grain">
          <div className="wrap">
            <div className="portrait revele">
              <Image src="/images/berenice.jpg" alt="Bérénice" fill sizes="240px" priority />
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Derrière HypnoMorphosis</span>
              <h1>Derrière HypnoMorphosis, <em>il y a moi.</em></h1>
              <p>Je suis Bérénice, ancienne infirmière urgentiste et aujourd’hui hypnothérapeute.</p>
            </div>
          </div>
        </section>

        <section className="histoire-recit">
          <div className="colonne revele">
            <p>J’ai toujours cru profondément en la médecine d’urgence. Dans l’urgence, il faut agir, soulager, trouver des solutions. Mais lorsque j’ai ensuite exercé comme infirmière à domicile, j’ai découvert une autre réalité.</p>
            <p>Des personnes que l’on orientait d’un spécialiste à l’autre. Des symptômes qui persistaient. Des réponses qui ne venaient pas toujours. Et parfois, cette impression qu’il manquait quelque chose.</p>
            <p>C’est dans ce contexte, pour des raisons à la fois personnelles et professionnelles, que je me suis formée à l’hypnose.</p>
            <p>Et puis j’ai commencé à l’utiliser. D’abord sur moi, puis auprès de certaines personnes que j’accompagnais dans le cadre de mon activité d’infirmière.</p>
            <p>Je dois être honnête&nbsp;: <strong>je ne m’attendais pas à ça.</strong></p>
            <p>J’ai observé des changements qui m’ont moi-même surprise. Des résultats que je n’aurais pas imaginé possibles avant de les voir se produire. Comme si, quelque part, l’hypnose venait me dire&nbsp;:</p>
          </div>
          <blockquote className="histoire-citation revele">«&nbsp;Oui. C’est possible. Et oui, ça existe.&nbsp;»</blockquote>
          <div className="colonne revele">
            <p>J’ai alors choisi d’aller plus loin. Pendant plusieurs années, j’ai exercé en cabinet, en accompagnant des personnes avec l’hypnose et en continuant à me former.</p>
            <p>Aujourd’hui, HypnoMorphosis est une nouvelle étape.</p>
            <p>Je souhaite pouvoir transmettre cette approche au-delà du cabinet, à travers des expériences accessibles en ligne, pour permettre à davantage de personnes de découvrir ce que l’hypnose peut réellement ouvrir.</p>
          </div>
        </section>

        {/* Le studio où Bérénice enregistre : montrer une vraie personne et un vrai lieu (idée d'Alexis, 2026-10-29).
            Photo du fauteuil et texte provisoires, en attendant sa photo dans le fauteuil et ses propres mots. */}
        <section className="studio fond-pierre" id="studio">
          <div className="wrap">
            <div className="studio-photo revele">
              <Image src="/images/studio-fauteuil.jpg" alt="Le fauteuil du studio où Bérénice enregistre ses audios" fill sizes="(max-width: 820px) 92vw, 460px" />
              <span className="legende">Le fauteuil où naissent les audios</span>
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Là où naissent vos audios</span>
              <h2 className="section">Une vraie voix, <em>un vrai lieu</em></h2>
              <p>Chaque carnet est écrit par moi, et chaque audio est enregistré ici, dans mon studio, avec ma propre voix.</p>
              <ul className="preuves">
                <li><b>Parcours</b><span>Ancienne infirmière urgentiste</span></li>
                <li><b>Aujourd’hui</b><span>Hypnothérapeute</span></li>
                <li><b>Création</b><span>Textes, exercices et voix&nbsp;: tout est de Bérénice</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="histoire-recit">
          <div className="colonne revele">
            <h2 className="section">Une autre façon d’expérimenter l’hypnose</h2>
            <p>Au fil des années, j’ai compris que l’hypnose n’était pas seulement une technique ou un outil parmi d’autres.</p>
            <p>Ce qui m’intéresse, c’est ce qu’elle peut provoquer dans l’expérience que nous faisons d’une situation. Parce qu’une situation peut rester exactement la même, et pourtant, quelque chose peut changer.</p>
            <p>Une perception. Une sensation. Une réaction. Une certitude que l’on croyait immuable. Parfois même, la façon dont on se perçoit soi-même ou dont on appréhende ce qui nous entoure.</p>
            <p>C’est cette possibilité qui est au cœur d’HypnoMorphosis&nbsp;: <strong>transformer l’expérience, sans forcément avoir besoin de transformer ce qui nous entoure.</strong></p>
            <p>Et finalement, après toutes ces années à l’expérimenter, je crois que je pourrais résumer ce que l’hypnose représente pour moi en une seule phrase&nbsp;:</p>
          </div>
        </section>

        <section className="histoire-fin grain">
          <div className="wrap revele">
            <blockquote>«&nbsp;L’hypnose, ça sert à rien et pourtant ça change tout.&nbsp;»</blockquote>
            <div className="actions">
              <Link className="btn btn-plein" href="/inscription">Vivre l’expérience découverte</Link>
              <a className="presse" href={lienFigaro} target="_blank" rel="noopener">Vu dans <i>Madame Figaro</i></a>
            </div>
          </div>
        </section>
      </main>
      <PiedDePage />
      <Apparitions />
    </>
  );
}
