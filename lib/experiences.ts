// Liste provisoire des expériences, en attendant la base de données (étape boutique et achats).
// Chaque compte a accès à l'expérience découverte ; les achats ne sont pas encore enregistrés.

export type Experience = {
  slug: string;
  titre: string;
  categorie: string;
  duree: string;
  resume: string;
  couverture: string;
  prix: string | null; // null : gratuite
};

export const experiences: Experience[] = [
  {
    slug: "decouverte",
    titre: "L’expérience découverte",
    categorie: "Offerte",
    duree: "5 jours",
    resume: "5 jours pour ouvrir le champ de vos possibles.",
    couverture: "/images/couverture-decouverte.jpg",
    prix: null,
  },
  {
    slug: "le-noeud",
    titre: "Le Nœud",
    categorie: "Expérience universelle",
    duree: "21 jours",
    resume: "21 jours pour dénouer, comprendre et se reconnecter à soi.",
    couverture: "/images/couverture-noeud.jpg",
    prix: "49 €",
  },
  {
    slug: "apres-nous",
    titre: "Après nous",
    categorie: "Expérience miroir",
    duree: "21 jours",
    resume: "21 jours pour revenir à soi après une séparation.",
    couverture: "/images/couverture-apres-nous.jpg",
    prix: "49 €",
  },
];

// expériences ouvertes à la cliente connectée (aujourd'hui : la découverte, pour tout compte)
export function experiencesOuvertes() {
  return experiences.filter((e) => e.prix === null);
}

export function experiencesADecouvrir() {
  return experiences.filter((e) => e.prix !== null);
}
