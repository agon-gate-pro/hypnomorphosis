import { categories, experiencesADecouvrir } from "@/lib/experiences";
import { descriptionSite, urlSite } from "@/lib/site";

// Résumé du site pour les IA (format llms.txt : https://llmstxt.org), généré à partir des mêmes données que les pages.
export const dynamic = "force-static";

export function GET() {
  const fiches = experiencesADecouvrir()
    .map((e) => `- [${e.titre}](${urlSite}/experiences/${e.slug}) : ${e.categorie.toLowerCase()}, ${e.duree}, ${e.prix}. ${e.resume}`)
    .join("\n");
  const texte = `# HypnoMorphosis

> ${descriptionSite}

HypnoMorphosis est une marque d’expériences d’hypnose à vivre chez soi, créée par Bérénice, ancienne infirmière urgentiste devenue hypnothérapeute. Chaque expérience associe un carnet PDF à imprimer ou à remplir sur tablette, des audios d’hypnose guidés enregistrés par Bérénice et un exercice d’introspection par jour. Tout est accessible dès l’achat, chacun avance à son rythme. Le site est en français.

## Expériences

- [Expérience découverte](${urlSite}/#decouverte) : gratuite, 5 jours, 2 audios guidés, une ordalie, un exercice par jour et un engagement à signer, accessible après inscription.
${fiches}

## Catégories

${Object.entries(categories).map(([nom, texte]) => `- ${nom} : ${texte}`).join("\n")}

## À propos

- [Derrière HypnoMorphosis](${urlSite}/derriere-hypnomorphosis) : le parcours de Bérénice, des urgences à l’hypnose, et son studio d’enregistrement.
`;
  return new Response(texte, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
