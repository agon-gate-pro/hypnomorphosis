import type { Metadata } from "next";
import type { NomIcone } from "@/components/Icones";

// Liens et réglages partagés par plusieurs pages du site

// adresse de référence (liens canoniques, sitemap, données structurées) : passer à https://hypnomorphosis.com le jour du lancement
export const urlSite = "https://hypnomorphosis.vercel.app";

export const descriptionSite =
  "Expériences d’hypnose à vivre chez soi : carnets, audios guidés et exercices pour ouvrir le champ de vos possibles. Commencez par l’expérience découverte gratuite.";

// titre, description, adresse canonique et aperçu de partage propres à une page ;
// openGraph est redonné en entier, image comprise : celui d'une page remplace celui du layout, et l'image générée
// par app/opengraph-image.tsx n'est alors plus reprise d'elle-même dans les sous-dossiers
export function metaPage({ titre, description, chemin }: { titre: string; description: string; chemin: string }): Metadata {
  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      title: titre,
      description,
      url: chemin,
      siteName: "HypnoMorphosis",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "HypnoMorphosis · Ouvrir le champ de vos possibles" }],
    },
  };
}

// article consacré à Bérénice : mention « Vu dans Madame Figaro », sans reprise des photos du magazine
export const lienFigaro = "https://adresses-incontournables.madame.lefigaro.fr/prendre-soin-soi/berenice-hervet/";

// vidéo de présentation de Bérénice, au format paysage (16:9), à la place du logo dans le premier bloc de l'accueil.
// null : le cadre affiche le logo et « Vidéo de présentation à venir ». Vidéo courte et légère (quelques Mo), avec si possible une
// image fixe (`affiche`) montrée pendant le chargement. `exemple` affiche l'étiquette « Vidéo d'exemple ».
// En attendant la sienne : une vidéo libre de droits (CC0, exemple de MDN) pour montrer le rendu à Bérénice.
export const videoAccueil: { src: string; affiche?: string; exemple?: boolean } | null = { src: "/videos/exemple-paysage.mp4", exemple: true };

// sujets du formulaire de contact
export const sujetsContact = ["Une expérience", "Mon compte", "Autre"];

// comptes de Bérénice : un réseau sans adresse n'est pas affiché, pour ne laisser aucun lien vide
const tousLesReseaux: { nom: string; icone: NomIcone; url: string }[] = [
  { nom: "TikTok", icone: "tiktok", url: "https://www.tiktok.com/@hypnomorphosis" },
  { nom: "Instagram", icone: "instagram", url: "https://www.instagram.com/hypnomorphosis.berenice/" },
  { nom: "YouTube", icone: "youtube", url: "https://www.youtube.com/@hypnomorphosis.berenice" },
];

export const reseaux = tousLesReseaux.filter((r) => r.url);

// la marque et Bérénice, repris par les données structurées de plusieurs pages
export const organisation = {
  "@type": "Organization",
  "@id": `${urlSite}/#organisation`,
  name: "HypnoMorphosis",
  url: urlSite,
  logo: `${urlSite}/logo/hypnomorphosis-embleme.svg`,
  slogan: "Ouvrir le champ de vos possibles",
  description: descriptionSite,
  // comptes de la marque, pour que moteurs de recherche et IA les rattachent à HypnoMorphosis et à Bérénice
  sameAs: reseaux.map((r) => r.url),
};

export const berenice = {
  "@type": "Person",
  "@id": `${urlSite}/derriere-hypnomorphosis#berenice`,
  name: "Bérénice Hervet",
  givenName: "Bérénice",
  familyName: "Hervet",
  jobTitle: "Hypnothérapeute",
  description: "Ancienne infirmière urgentiste, aujourd’hui hypnothérapeute, créatrice d’HypnoMorphosis.",
  image: `${urlSite}/images/berenice.jpg`,
  url: `${urlSite}/derriere-hypnomorphosis`,
  worksFor: { "@id": `${urlSite}/#organisation` },
  subjectOf: { "@type": "Article", url: lienFigaro, publisher: { "@type": "Organization", name: "Madame Figaro" } },
};
