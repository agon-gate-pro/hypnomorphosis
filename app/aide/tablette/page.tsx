import type { Metadata } from "next";
import Link from "next/link";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";
import { metaPage } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Remplir votre carnet sur tablette · HypnoMorphosis",
  description: "Comment enregistrer votre carnet HypnoMorphosis en PDF et écrire dedans sur iPad, sur tablette Android ou sur ordinateur, sans l’imprimer.",
  chemin: "/aide/tablette",
});

// Aide demandée par Bérénice (2026-11-13) : le carnet est un PDF, sans saisie sur le site. Trois appareils, quatre
// étapes chacun ; le point clé est d'écrire dans la copie enregistrée, car le carnet rouvert depuis le site est vierge.
const appareils: { nom: string; etapes: [string, string][] }[] = [
  {
    nom: "Sur iPad",
    etapes: [
      ["Ouvrez votre carnet", "Dans Mon espace, ouvrez votre expérience et touchez « Ouvrir mon carnet (PDF) »."],
      ["Enregistrez-le", "Touchez le bouton de partage (le carré avec une flèche vers le haut), puis « Enregistrer dans Fichiers », et choisissez « Sur mon iPad »."],
      ["Écrivez dedans", "Ouvrez l’app Fichiers, touchez votre carnet, puis le crayon en haut de l’écran : écrivez avec le doigt ou un Apple Pencil."],
      ["Terminez", "Touchez « OK » : vos annotations sont enregistrées dans le carnet, vous les retrouverez la prochaine fois."],
    ],
  },
  {
    nom: "Sur tablette Android",
    etapes: [
      ["Installez une app gratuite", "Dans le Play Store, installez Xodo (lecteur PDF gratuit). Sur une tablette Samsung, Samsung Notes convient aussi."],
      ["Téléchargez votre carnet", "Dans Mon espace, ouvrez votre expérience et touchez « Ouvrir mon carnet (PDF) » : le carnet arrive dans vos Téléchargements."],
      ["Écrivez dedans", "Ouvrez votre carnet avec Xodo, puis touchez le crayon : stylo pour écrire, outil texte pour taper, surligneur."],
      ["Terminez", "Xodo enregistre vos annotations dans le carnet au fur et à mesure."],
    ],
  },
  {
    nom: "Sur ordinateur",
    etapes: [
      ["Ouvrez votre carnet", "Dans Mon espace, ouvrez votre expérience et cliquez sur « Ouvrir mon carnet (PDF) » : il s’ouvre dans votre navigateur."],
      ["Enregistrez-le", "Cliquez sur l’icône de téléchargement ou d’enregistrement en haut du carnet, et rangez-le dans vos documents."],
      ["Écrivez dedans", "Sous Windows, ouvrez le carnet enregistré avec Microsoft Edge et utilisez « Dessiner » ou « Ajouter du texte ». Sur Mac, ouvrez-le avec Aperçu et cliquez sur le crayon (Annoter)."],
      ["Terminez", "Dans Edge, enregistrez avec Ctrl + S. Aperçu, lui, enregistre tout seul."],
    ],
  },
];

export default function AideTablette() {
  return (
    <>
      <EnTete />
      <main>
        <section className="aide-tete grain">
          <div className="wrap">
            <span className="caps">Aide</span>
            <h1>Remplir votre carnet sur tablette</h1>
            <p>Pas besoin d’imprimer : votre carnet est un PDF, dans lequel vous pouvez écrire directement.</p>
          </div>
        </section>

        <section className="wrap aide-corps">
          <div className="aide-appareils">
            {appareils.map((a) => (
              <div key={a.nom} className="aide-appareil">
                <h2>{a.nom}</h2>
                <ol className="etapes">
                  {a.etapes.map(([titre, texte]) => (
                    <li key={titre}><b>{titre}</b><span>{texte}</span></li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="aide-bon-a-savoir">
            <h2>Bon à savoir</h2>
            <ul>
              <li><b>Écrivez toujours dans le carnet enregistré.</b> Chaque fois que vous l’ouvrez depuis votre espace, vous obtenez un carnet vierge.</li>
              <li><b>Un stylet change tout</b> : écrire et dessiner devient bien plus agréable qu’au doigt.</li>
              <li><b>Vous préférez le papier ?</b> Le même carnet s’imprime très bien, page par page.</li>
            </ul>
            <p>Une difficulté ? <Link href="/contact">Écrivez-moi</Link>, je vous aide.</p>
          </div>
        </section>
      </main>
      <PiedDePage />
    </>
  );
}
