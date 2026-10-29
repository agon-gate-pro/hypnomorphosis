import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Apparitions from "@/components/Apparitions";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import { Icone, SpriteIcones } from "@/components/Icones";
import { categories, experience, experiencesADecouvrir } from "@/lib/experiences";

const delai = (rang: number) => ({ "--delai": `${rang * 0.25}s` }) as CSSProperties;

// une page par expérience payante ; la découverte a son propre parcours (/inscription)
export const dynamicParams = false;
export function generateStaticParams() {
  return experiencesADecouvrir().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/experiences/[slug]">): Promise<Metadata> {
  const e = experience((await params).slug);
  if (!e) return {};
  return { title: `${e.titre} · HypnoMorphosis`, description: e.resume };
}

// passages entre ** du brief, mis en valeur
function Paragraphe({ texte }: { texte: string }) {
  return <p>{texte.split("**").map((morceau, i) => (i % 2 ? <strong key={i}>{morceau}</strong> : morceau))}</p>;
}

// Textes de Bérénice, repris mot pour mot de son brief (docs/SITE INTERNET.pdf, section 5), typographie corrigée.
// L'achat arrive avec Stripe : en attendant, le bouton est inactif.
export default async function FicheExperience({ params }: PageProps<"/experiences/[slug]">) {
  const e = experience((await params).slug);
  if (!e?.fiche || !e.prix) notFound();
  const { fiche } = e;

  const achat = (
    <div className="fiche-achat">
      <span className="prix">{e.prix}</span>
      <span className="btn btn-plein inactif" aria-disabled="true">Achat bientôt disponible</span>
    </div>
  );

  return (
    <>
      <SpriteIcones />
      <EnTete />
      <main>
        <section className="fiche-ouverture grain">
          <div className="wrap">
            <div className="fiche-couv revele">
              <Image src={e.couverture} alt={`Couverture du carnet ${e.titre}`} fill sizes="(max-width: 820px) 80vw, 400px" priority />
            </div>
            <div className="revele" style={delai(1)}>
              <span className="caps">{e.categorie} · {e.duree}</span>
              <h1>{e.titre}</h1>
              <p className="sous-titre">{e.resume}</p>
              {categories[e.categorie] && <p className="categorie">{categories[e.categorie]}</p>}
              {achat}
            </div>
          </div>
        </section>

        <section className="histoire-recit fiche-recit">
          <div className="colonne revele">
            <h2 className="section">Vous vous reconnaîtrez peut-être…</h2>
            {fiche.reconnaitre.map((t) => <Paragraphe key={t} texte={t} />)}
            <h2 className="section">Ce que vous allez explorer</h2>
            {fiche.explorer.map((t) => <Paragraphe key={t} texte={t} />)}
            <h2 className="section">{fiche.retrouverTitre}</h2>
            {fiche.retrouver.map((t) => <Paragraphe key={t} texte={t} />)}
          </div>
        </section>

        <section className="fiche-details">
          <div className="wrap">
            <div className="revele">
              <h2 className="section">Votre expérience en un coup d’œil</h2>
              <ul className="acces">
                <li><Icone nom="sablier" /><span><b>{e.jours} jours</b> d’expérience</span></li>
                <li><Icone nom="carnet" /><span><b>Un cahier d’accompagnement{fiche.pages ? ` de ${fiche.pages} pages` : ""}</b> à imprimer</span></li>
                <li><Icone nom="casque" /><span><b>5 expériences audio guidées</b></span></li>
                <li><Icone nom="plume" /><span><b>{e.jours} exercices</b>, un par jour</span></li>
                <li><Icone nom="spirale" /><span><b>Des expériences hypnotiques</b> et des exercices d’introspection</span></li>
              </ul>
            </div>
            <div className="revele" style={delai(1)}>
              <h2 className="section">Comment cela fonctionne&nbsp;?</h2>
              <ol className="etapes">
                <li><b>Vous achetez votre expérience</b><span>Après votre achat, vous recevez vos accès personnels à votre espace privé HypnoMorphosis.</span></li>
                <li><b>Vous téléchargez votre cahier</b><span>Votre cahier d’accompagnement est disponible dans votre espace. Vous pouvez le télécharger, l’imprimer et y réaliser directement les différents exercices.</span></li>
                <li><b>Vous vivez l’expérience, jour après jour</b><span>Pendant {e.jours} jours, vous avancez à votre rythme à travers les exercices, les expériences hypnotiques et les audios guidés accessibles directement depuis votre espace privé.</span></li>
                <li><b>Vous laissez l’expérience faire son chemin</b><span>Chaque étape vous invite à expérimenter, observer et avancer progressivement au fil des {e.jours} jours.</span></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="fiche-fin grain">
          <div className="wrap revele">
            <span className="caps">{e.titre} · {e.duree}</span>
            <p className="sous-titre">{e.resume}</p>
            {achat}
            <p className="essai">Envie d’essayer d’abord&nbsp;? <Link href="/inscription">L’expérience découverte est gratuite</Link></p>
          </div>
        </section>
      </main>
      <PiedDePage />
      <Apparitions />
    </>
  );
}
