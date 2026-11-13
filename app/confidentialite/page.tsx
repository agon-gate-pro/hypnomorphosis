import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { Contact } from "@/components/PageLegale";
import { metaPage, societe } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Confidentialité · HypnoMorphosis",
  description: "Données collectées par HypnoMorphosis, usage, durée de conservation, prestataires et droits des personnes (RGPD).",
  chemin: "/confidentialite",
});

// Politique RGPD, alignée sur ce que le site fait réellement (docs/FONCTIONNEMENT.md) : comptes Clerk, achats en base
// Neon, paiement Stripe, e-mails Resend, fichiers Vercel Blob, aucun outil de mesure d'audience ni cookie publicitaire.
export default function Confidentialite() {
  return (
    <PageLegale titre="Confidentialité" miseAJour="13 novembre 2026">
      <h2>Responsable du traitement</h2>
      <p>
        {societe.raisonSociale} ({societe.sigle}), {societe.adresse}, CIF {societe.cif}. Pour toute question sur vos données :{" "}
        <Contact email={societe.email} /> ou le <Link href="/contact">formulaire de contact</Link>.
      </p>

      <h2>Les données que nous utilisons, et pourquoi</h2>
      <ul>
        <li>
          <strong>Votre compte</strong> : prénom, nom, adresse e-mail et, si vous l’utilisez, la connexion avec Google. Ils
          servent à créer votre espace et à vous y donner accès (exécution du contrat).
        </li>
        <li>
          <strong>Vos achats et vos accès</strong> : expérience achetée, date, montant, durée d’accès et accord donné sur le
          droit de rétractation. Ils servent à ouvrir vos expériences et à respecter nos obligations comptables.
        </li>
        <li>
          <strong>Le paiement</strong> : il est traité par Stripe. Vos données bancaires ne sont jamais transmises ni conservées
          par le site.
        </li>
        <li>
          <strong>Les annonces par e-mail</strong> : seulement si vous avez coché la case prévue dans votre espace
          (consentement). Nous gardons votre choix et sa date. Vous pouvez la décocher à tout moment ; chaque e-mail contient un
          lien de désinscription.
        </li>
        <li>
          <strong>Les messages envoyés par le formulaire de contact</strong> : prénom, e-mail et message, transmis par e-mail
          pour vous répondre. Ils ne sont pas enregistrés sur le site.
        </li>
      </ul>
      <p>
        Nous ne vendons ni ne louons vos données. Nous ne recueillons rien sur ce que vous écrivez dans votre carnet : il reste
        sur votre appareil ou sur papier.
      </p>

      <h2>Durée de conservation</h2>
      <ul>
        <li>Compte : tant qu’il existe. Vous pouvez le supprimer à tout moment depuis « Mon compte ».</li>
        <li>Achats : six ans, durée des obligations comptables en Espagne, y compris après la suppression du compte.</li>
        <li>Choix concernant les annonces : jusqu’à votre désinscription, puis le temps de pouvoir prouver votre choix.</li>
      </ul>

      <h2>Nos prestataires</h2>
      <p>Vos données sont traitées pour notre compte par des prestataires choisis pour leur sérieux :</p>
      <ul>
        <li>Vercel (hébergement du site ; fichiers des expériences stockés à Paris) ;</li>
        <li>Clerk (comptes et connexion) ;</li>
        <li>Neon (base de données des achats et des accès, hébergée à Francfort) ;</li>
        <li>Stripe (paiement) ;</li>
        <li>Resend (envoi des e-mails).</li>
      </ul>
      <p>
        Certains sont établis aux États-Unis. Ces transferts sont encadrés par le cadre de protection des données UE–États-Unis
        (Data Privacy Framework) ou par les clauses contractuelles types de la Commission européenne.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n’utilise que les cookies nécessaires à son fonctionnement, notamment pour vous garder connecté(e) à votre
        espace. Il n’utilise aucun cookie publicitaire ni outil de mesure d’audience : aucun consentement n’est donc demandé.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander à accéder à vos données, à les rectifier, à les effacer, à en limiter l’usage, à vous y opposer ou à
        les recevoir dans un format courant. Écrivez-nous (voir plus haut) : nous répondons sous un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l’Agencia Española de Protección de Datos
        (aepd.es) ou l’autorité de votre pays de résidence (en France, la CNIL, cnil.fr).
      </p>
    </PageLegale>
  );
}
