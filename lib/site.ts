import type { NomIcone } from "@/components/Icones";

// Liens partagés par plusieurs pages du site

// article consacré à Bérénice : mention « Vu dans Madame Figaro », sans reprise des photos du magazine
export const lienFigaro = "https://adresses-incontournables.madame.lefigaro.fr/prendre-soin-soi/berenice-hervet/";

// comptes de Bérénice : un réseau sans adresse n'est pas affiché, pour ne laisser aucun lien vide
const tousLesReseaux: { nom: string; icone: NomIcone; url: string }[] = [
  { nom: "TikTok", icone: "tiktok", url: "" },
  { nom: "Instagram", icone: "instagram", url: "" },
  { nom: "YouTube", icone: "youtube", url: "" },
];

export const reseaux = tousLesReseaux.filter((r) => r.url);
