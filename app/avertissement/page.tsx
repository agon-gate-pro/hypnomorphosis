import type { Metadata } from "next";
import Link from "next/link";
import PageLegale from "@/components/PageLegale";
import { metaPage } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Avertissement santé · HypnoMorphosis",
  description: "Les expériences HypnoMorphosis ne remplacent pas un avis ou un traitement médical ou psychologique.",
  chemin: "/avertissement",
});

// Avertissement prévu par la spécification (section 9). Les situations à éviter sont à faire valider par Bérénice.
export default function Avertissement() {
  return (
    <PageLegale titre="Avertissement santé" miseAJour="13 novembre 2026">
      <h2>Ce que sont les expériences HypnoMorphosis</h2>
      <p>
        Les expériences HypnoMorphosis sont des parcours d’hypnose et d’introspection à vivre chez soi : un carnet d’exercices et
        des audios guidés. Elles invitent à explorer votre façon de vivre certaines situations.
      </p>
      <p>
        <strong>Elles ne constituent ni un diagnostic, ni un traitement médical ou psychologique, et ne remplacent pas l’avis
        d’un médecin ou d’un professionnel de santé.</strong> N’interrompez jamais un traitement en cours sans l’avis de votre
        médecin.
      </p>

      <h2>Avant de commencer</h2>
      <p>Demandez l’avis de votre médecin avant de vivre une expérience si vous êtes concerné(e) par l’une de ces situations :</p>
      <ul>
        <li>épilepsie ;</li>
        <li>troubles psychiatriques (psychose, schizophrénie, trouble bipolaire) ;</li>
        <li>dépression sévère ou suivi psychologique en cours ;</li>
        <li>grossesse, si vous avez un doute.</li>
      </ul>

      <h2>Pendant l’écoute</h2>
      <ul>
        <li>Installez-vous dans un endroit calme, de préférence avec un casque.</li>
        <li><strong>N’écoutez jamais les audios en conduisant</strong> ou pendant une activité qui demande votre attention.</li>
        <li>Si vous ressentez un malaise, arrêtez l’écoute et reprenez-la plus tard, ou pas du tout.</li>
      </ul>

      <h2>Si vous traversez un moment difficile</h2>
      <p>Si vous êtes en détresse ou avez des idées suicidaires, n’attendez pas : parlez-en tout de suite à quelqu’un.</p>
      <ul>
        <li>Urgences, dans toute l’Europe : <strong>112</strong></li>
        <li>En France, numéro national de prévention du suicide : <strong>3114</strong> (gratuit, 24 h/24)</li>
        <li>En Espagne, ligne d’aide face au suicide : <strong>024</strong> (gratuit, 24 h/24)</li>
      </ul>
      <p>
        En achetant une expérience, vous reconnaissez avoir pris connaissance de cet avertissement (voir les{" "}
        <Link href="/cgv">conditions générales de vente</Link>).
      </p>
    </PageLegale>
  );
}
