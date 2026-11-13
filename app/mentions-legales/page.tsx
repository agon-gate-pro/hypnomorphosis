import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { AComplet, Contact } from "@/components/PageLegale";
import { metaPage, societe } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Mentions légales · HypnoMorphosis",
  description: "Éditeur, hébergement et propriété intellectuelle du site HypnoMorphosis.",
  chemin: "/mentions-legales",
});

// Informations exigées par la loi espagnole sur les services de la société de l'information (LSSI, article 10),
// l'activité étant portée par une société espagnole.
export default function MentionsLegales() {
  return (
    <PageLegale titre="Mentions légales" miseAJour="13 novembre 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site HypnoMorphosis est édité par <strong>{societe.raisonSociale}</strong> ({societe.sigle}), société à responsabilité
        limitée de droit espagnol.
      </p>
      <ul>
        <li>Siège : {societe.adresse}</li>
        <li>Numéro d’identification fiscale (CIF) : {societe.cif}</li>
        <li>Registre du commerce : {societe.registre ?? <AComplet quoi="inscription au Registro Mercantil" />}</li>
        <li>Représentant légal : {societe.representant}</li>
        <li>Contact : <Contact email={societe.email} /> ou le <Link href="/contact">formulaire de contact</Link></li>
      </ul>
      <p>Les contenus des expériences (carnets, audios, textes) sont créés par Bérénice Hervet, hypnothérapeute.</p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com).
        Les carnets et les audios sont stockés en Europe (Paris) et la base de données des comptes et des achats en Europe
        (Francfort).
      </p>

      <h2>Conception du site</h2>
      <p>Site conçu et réalisé par Agon Gate.</p>

      <h2>Propriété intellectuelle</h2>
      <p>
        La marque HypnoMorphosis, son logo, les textes, les carnets, les audios, les images et l’ensemble des contenus du site
        sont protégés par le droit de la propriété intellectuelle. Toute reproduction, diffusion ou utilisation, totale ou
        partielle, sans autorisation écrite préalable est interdite. Les expériences achetées sont réservées à l’usage personnel
        de la personne qui les a achetées (voir les <Link href="/cgv">conditions générales de vente</Link>).
      </p>

      <h2>Données personnelles</h2>
      <p>
        La manière dont vos données sont utilisées et protégées est décrite dans la page{" "}
        <Link href="/confidentialite">Confidentialité</Link>.
      </p>
    </PageLegale>
  );
}
