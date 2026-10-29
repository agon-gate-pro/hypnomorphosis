// Données structurées schema.org (JSON-LD) : ce que Google et les IA lisent pour identifier la marque,
// Bérénice et les expériences sans avoir à deviner. Le contenu doit rester fidèle à ce qui est affiché sur la page.
export default function DonneesStructurees({ donnees }: { donnees: object }) {
  // « < » échappé : un texte ne peut pas refermer la balise script
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\u003c") }} />;
}
