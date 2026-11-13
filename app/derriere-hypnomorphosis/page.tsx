import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Apparitions from "@/components/Apparitions";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import DonneesStructurees from "@/components/DonneesStructurees";
import { berenice, lienFigaro, metaPage, organisation, urlSite } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Derrière HypnoMorphosis · Bérénice Hervet, ancienne infirmière urgentiste et hypnothérapeute",
  description: "L’histoire de Bérénice Hervet, ancienne infirmière urgentiste devenue hypnothérapeute : des urgences au cabinet, puis la création d’HypnoMorphosis, des expériences d’hypnose à vivre chez soi.",
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
      <EnTete />
      <main>
        <section className="histoire-ouverture grain">
          <div className="wrap">
            <div className="portrait revele">
              <Image src="/images/berenice.jpg" alt="Bérénice Hervet, hypnothérapeute" fill sizes="240px" priority />
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Bérénice Hervet · Hypnothérapeute</span>
              <h1>Derrière HypnoMorphosis, <em>il y a moi.</em></h1>
              <p>Je suis Bérénice, ancienne infirmière urgentiste et aujourd’hui hypnothérapeute.</p>
            </div>
          </div>
        </section>

        <section className="histoire-recit">
          <div className="colonne revele">
            <p>J’ai toujours cru profondément en la médecine d’urgence. Dans l’urgence, il faut agir, soulager, trouver des solutions. Mais lorsque j’ai ensuite exercé comme infirmière à domicile, j’ai découvert une autre réalité.</p>
            <p>Des symptômes qui persistaient, des réponses qui ne venaient pas toujours. Et parfois, cette impression qu’il manquait quelque chose.</p>
            <p>C’est dans ce contexte que je me suis formée à l’hypnose, et que j’ai commencé à l’utiliser&nbsp;: d’abord sur moi, puis auprès de certaines personnes que j’accompagnais.</p>
            <p>Je dois être honnête&nbsp;: <strong>je ne m’attendais pas à ça.</strong></p>
            <p>J’ai observé des changements qui m’ont moi-même surprise. Comme si, quelque part, l’hypnose venait me dire&nbsp;:</p>
          </div>
          <blockquote className="histoire-citation revele">«&nbsp;Oui. C’est possible. Et oui, ça existe.&nbsp;»</blockquote>
          <div className="colonne revele">
            <p>J’ai alors exercé plusieurs années en cabinet. Aujourd’hui, avec HypnoMorphosis, je souhaite transmettre cette approche au-delà du cabinet, pour permettre à davantage de personnes de découvrir ce que l’hypnose peut réellement ouvrir.</p>
          </div>
        </section>

        {/* Le studio où Bérénice enregistre : montrer une vraie personne et un vrai lieu (idée d'Alexis, 2026-10-29).
            Photo du studio retouchée, envoyée par Bérénice (2026-11-09) ; texte provisoire en attendant ses propres mots. */}
        <section className="studio fond-pierre" id="studio">
          <div className="wrap">
            <div className="studio-photo revele">
              <Image src="/images/studio-2.jpg" alt="Le studio où Bérénice enregistre ses audios : deux fauteuils, une affiche et une étagère" fill sizes="(max-width: 820px) 92vw, 460px" />
              <span className="legende">Le studio où naissent les audios</span>
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">Là où naissent vos audios</span>
              <h2 className="section">Une vraie voix, <em>un vrai lieu</em></h2>
              <p>Chaque carnet est écrit par moi, et chaque audio est enregistré ici, dans mon studio, avec ma propre voix.</p>
            </div>
          </div>
        </section>

        <section className="histoire-recit">
          <div className="colonne revele">
            <h2 className="section">Une autre façon d’expérimenter l’hypnose</h2>
            <p>Au fil des années, j’ai compris que l’hypnose n’était pas seulement une technique ou un outil parmi d’autres.</p>
            <p>Une situation peut rester exactement la même, et pourtant, quelque chose peut changer&nbsp;: une perception, une réaction, une certitude que l’on croyait immuable.</p>
            <p>C’est cette possibilité qui est au cœur d’HypnoMorphosis&nbsp;: <strong>transformer l’expérience, sans forcément avoir besoin de transformer ce qui nous entoure.</strong></p>
            <p>Si je devais résumer ce que l’hypnose représente pour moi en une seule phrase&nbsp;:</p>
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
