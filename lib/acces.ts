import { currentUser } from "@clerk/nextjs/server";

// Expériences payantes ouvertes au compte connecté : liste de slugs dans ses métadonnées privées Clerk
// (`privateMetadata.acces`, ex. ["le-noeud"]), posée à la main par Agon Gate en attendant les achats en base.
// Le chantier des achats remplacera cette lecture par celle des achats enregistrés, sans changer les appels.
export async function accesDuCompte(): Promise<string[]> {
  const compte = await currentUser();
  const acces = compte?.privateMetadata.acces;
  return Array.isArray(acces) ? acces.filter((slug): slug is string => typeof slug === "string") : [];
}
