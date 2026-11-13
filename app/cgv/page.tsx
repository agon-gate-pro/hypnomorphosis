import type { Metadata } from "next";
import Link from "next/link";
import PageLegale, { Contact } from "@/components/PageLegale";
import { metaPage, societe } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Conditions générales de vente · HypnoMorphosis",
  description: "Conditions de vente des expériences HypnoMorphosis : prix, paiement, accès d’un an, absence de droit de rétractation.",
  chemin: "/cgv",
});

// Vente de contenus numériques par une société espagnole à des particuliers, surtout francophones.
// L'article sur la rétractation suit la spécification (section 5) : directive 2011/83/UE, article 16 m).
export default function Cgv() {
  return (
    <PageLegale titre="Conditions générales de vente" miseAJour="13 novembre 2026">
      <h2>1. Le vendeur</h2>
      <p>
        Les expériences HypnoMorphosis sont vendues par {societe.raisonSociale} ({societe.sigle}), {societe.adresse}, CIF{" "}
        {societe.cif} (voir les <Link href="/mentions-legales">mentions légales</Link>). Contact : <Contact email={societe.email} /> ou
        le <Link href="/contact">formulaire de contact</Link>.
      </p>
      <p>
        Ces conditions s’appliquent à tout achat sur le site. Elles sont acceptées en cochant la case prévue avant le paiement.
      </p>

      <h2>2. Les expériences</h2>
      <p>
        Une expérience HypnoMorphosis est un contenu numérique : un carnet d’exercices au format PDF, à imprimer ou à remplir sur
        tablette, et des audios d’hypnose guidés, à écouter depuis votre espace personnel. Le contenu et la durée de chaque
        expérience sont décrits sur sa fiche.
      </p>
      <p>L’expérience découverte est gratuite et reste accessible avec un compte, sans limite de durée.</p>

      <h2>3. Le compte</h2>
      <p>
        Un compte est nécessaire pour recevoir l’expérience découverte et pour acheter une expérience. Il est personnel : vous
        êtes responsable de la confidentialité de vos accès et ne devez pas les partager.
      </p>

      <h2>4. Les prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TVA espagnole de 21 % incluse). Le prix applicable est celui
        affiché au moment de la commande. Des codes promotionnels peuvent être proposés ponctuellement ; ils se saisissent sur la
        page de paiement.
      </p>

      <h2>5. Commande et paiement</h2>
      <ul>
        <li>Sur la fiche de l’expérience, vous cliquez sur « Acheter cette expérience » depuis votre compte.</li>
        <li>Vous acceptez les présentes conditions et demandez l’accès immédiat à l’expérience (article 7).</li>
        <li>
          Vous payez sur la page sécurisée de notre prestataire de paiement, Stripe. Vos données bancaires sont traitées par
          Stripe et ne sont jamais conservées par le site.
        </li>
        <li>Le paiement confirmé, l’expérience s’ouvre dans votre espace personnel.</li>
      </ul>

      <h2>6. Accès et durée</h2>
      <p>
        L’accès à une expérience achetée est ouvert immédiatement après le paiement, <strong>pour une durée d’un an</strong>. Au
        terme de cette année, l’accès peut être prolongé d’un an pour 5,99 € TTC.
      </p>
      <p>
        L’expérience est réservée à l’usage personnel et privé de la personne qui l’a achetée. Il est interdit de copier, de
        partager, de diffuser ou de revendre les audios, le carnet ou les accès.
      </p>
      <p>
        L’accès nécessite une connexion à Internet et un appareil récent (ordinateur, tablette ou téléphone). Nous faisons le
        nécessaire pour que le site reste disponible, sans pouvoir exclure des interruptions ponctuelles, notamment pour
        maintenance.
      </p>

      <h2>7. Absence de droit de rétractation</h2>
      <p>
        Un achat à distance ouvre en principe un délai de 14 jours pour changer d’avis. Ce droit ne s’applique pas aux contenus
        numériques fournis immédiatement, lorsque le client a donné son accord exprès pour cette exécution immédiate et a reconnu
        perdre son droit de rétractation (article 16, point m, de la directive 2011/83/UE ; article 103, point m, de la loi
        espagnole de défense des consommateurs ; article L221-28, 13°, du Code de la consommation français).
      </p>
      <p>
        <strong>Avant chaque paiement, vous cochez une case par laquelle vous demandez l’accès immédiat à l’expérience et
        reconnaissez perdre votre droit de rétractation dès cet accès.</strong> Sans cette case, le paiement n’est pas possible.
        Cet accord est conservé avec votre achat et rappelé dans l’e-mail de confirmation.
      </p>

      <h2>8. Avertissement santé</h2>
      <p>
        Les expériences ne constituent ni un diagnostic, ni un traitement médical ou psychologique, et ne remplacent pas l’avis
        d’un professionnel de santé. Avant d’acheter, prenez connaissance de l’<Link href="/avertissement">avertissement santé</Link>.
      </p>

      <h2>9. Réclamations</h2>
      <p>
        Pour toute question ou réclamation, écrivez-nous : <Contact email={societe.email} /> ou le{" "}
        <Link href="/contact">formulaire de contact</Link>. Nous vous répondons dans les meilleurs délais.
      </p>

      <h2>10. Droit applicable</h2>
      <p>
        Ces conditions sont soumises au droit espagnol. Si vous êtes consommateur et résidez dans un autre pays de l’Union
        européenne, vous gardez la protection des règles impératives de votre pays de résidence. À défaut d’accord amiable, le
        litige peut être porté devant les tribunaux compétents.
      </p>

      <h2>11. Données personnelles</h2>
      <p>
        Les données nécessaires à votre compte et à vos achats sont traitées comme décrit dans la page{" "}
        <Link href="/confidentialite">Confidentialité</Link>.
      </p>
    </PageLegale>
  );
}
