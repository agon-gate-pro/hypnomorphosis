import type { NomIcone } from "@/components/Icones";

// Liste provisoire des expériences, en attendant la base de données (étape boutique et achats).
// Chaque compte a accès à l'expérience découverte ; les expériences payantes s'ouvrent par la liste d'accès du compte
// (lib/acces.ts), posée à la main tant que les achats ne sont pas enregistrés.

// Texte d'une fiche : paragraphes, avec les passages en gras entre ** (repris du brief de Bérénice)
export type Fiche = {
  reconnaitre: string[];
  explorer: string[];
  retrouverTitre: string;
  retrouver: string[];
  pages: number | null; // pages du cahier à imprimer, si Bérénice les a données
};

// fichiers rangés dans le store Vercel Blob privé, sous le dossier du slug (ex. decouverte/audio-1.mp3)
export type Contenus = {
  carnet: string;
  audios: { titre: string; fichier: string }[];
  // points propres à l'expérience, ajoutés au guide « Pendant ces … jours » (ex. l'ordalie de la découverte)
  points?: { icone: NomIcone; gras: string; texte: string }[];
};

export type Experience = {
  slug: string;
  titre: string;
  duree: string;
  jours: number;
  resume: string;
  couverture: string;
  prix: string | null; // null : gratuite
  fiche?: Fiche;
  contenus?: Contenus;
};

export const experiences: Experience[] = [
  {
    slug: "decouverte",
    titre: "L’expérience découverte",
    duree: "5 jours",
    jours: 5,
    resume: "5 jours pour ouvrir le champ de vos possibles.",
    couverture: "/images/couverture-decouverte.jpg",
    prix: null,
    contenus: {
      carnet: "carnet-decouverte.pdf",
      audios: [
        { titre: "Expérience audio 1", fichier: "audio-1.mp3" },
        { titre: "Expérience audio 2", fichier: "audio-2.mp3" },
      ],
      points: [
        { icone: "chemin", gras: "Une ordalie", texte: "pour expérimenter plutôt que simplement réfléchir" },
        { icone: "sceau", gras: "Un engagement à signer", texte: "pour marquer votre décision d’aller jusqu’au bout" },
      ],
    },
  },
  {
    slug: "le-noeud",
    titre: "Le Nœud",
    duree: "21 jours",
    jours: 21,
    resume: "21 jours pour dénouer, comprendre et se reconnecter à soi.",
    couverture: "/images/couverture-noeud.jpg",
    prix: "49 €",
    // reçus de Bérénice le 2026-11-09 ; titres des audios à recevoir
    contenus: {
      carnet: "carnet-le-noeud.pdf",
      audios: [1, 2, 3, 4, 5].map((n) => ({ titre: `Expérience audio ${n}`, fichier: `audio-${n}.mp3` })),
    },
    fiche: {
      reconnaitre: [
        "**Quelque chose semble se nouer en vous.** Vous savez parfois ce que vous devriez faire, ce que vous aimeriez faire… et pourtant, quelque chose vous retient. Vous recommencez les mêmes schémas, repoussez certaines décisions ou vous retrouvez dans des situations que vous pensiez avoir dépassées.",
      ],
      explorer: [
        "Cette expérience vous invite à regarder **ce qui se joue derrière ce qui vous retient**. À travers différents exercices et l’hypnose, vous allez apprendre à observer ce nœud autrement, à comprendre ce qu’il vient peut-être raconter et à ouvrir de nouvelles possibilités là où tout semblait déjà écrit.",
      ],
      retrouverTitre: "Ce que vous pouvez retrouver",
      retrouver: [
        "Plus de **clarté**, de **liberté** et la sensation que quelque chose peut enfin bouger. Pas en devenant quelqu’un d’autre, mais en découvrant que ce qui semblait bloqué ne l’est peut-être pas autant que vous le pensiez.",
      ],
      pages: 63, // compté sur le carnet reçu le 2026-11-09 (59 dans le brief)
    },
  },
  {
    slug: "apres-nous",
    titre: "Après nous",
    duree: "21 jours",
    jours: 21,
    resume: "21 jours pour revenir à soi après une séparation.",
    couverture: "/images/couverture-apres-nous.jpg",
    prix: "49 €",
    fiche: {
      reconnaitre: [
        "La séparation est actée, pourtant quelque chose continue. De la colère, de l’injustice, du ressentiment, parfois de la haine, ou simplement cette sensation de ne pas réussir à tourner la page.",
        "Vous avez quitté une histoire, mais une partie de vous y est peut-être encore attachée. Car on peut être séparé dans les faits, sans l’être encore vraiment à l’intérieur.",
      ],
      explorer: [
        "Vous avez appris à être en couple, vous avez appris à être une famille, et puis un jour tout cela change.",
        "Qui êtes-vous, vous, quand ce qui vous définissait n’existe plus de la même façon ?",
        "Cette expérience vous invite à regarder autrement ce que cette rupture vient bouleverser en vous.",
        "Car parfois derrière une douleur, une colère ou le sentiment d’avoir tout perdu, se trouve aussi quelque chose qui demandera à être découvert.",
      ],
      retrouverTitre: "Ce que vous pourrez retrouver",
      retrouver: [
        "Un apaisement, mais aussi quelque chose de plus profond, une nouvelle façon de vous regarder, de vous choisir et d’avancer.",
        "Et si cette histoire, aussi douloureuse soit-elle, pouvait devenir un point de bascule, pour comprendre ce que cette étape vient révéler de vous et ouvrir une suite qui vous ressemble davantage.",
      ],
      pages: null,
    },
  },
];

export function experience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}

// expériences ouvertes à la cliente connectée : la découverte pour tout compte, et les expériences de sa liste d'accès
export function experiencesOuvertes(acces: string[]) {
  return experiences.filter((e) => e.prix === null || acces.includes(e.slug));
}

// expérience ouverte à la cliente connectée, ou undefined (seule porte vers les fichiers privés)
export function experienceOuverte(slug: string, acces: string[]) {
  return experiencesOuvertes(acces).find((e) => e.slug === slug);
}

export function experiencesADecouvrir() {
  return experiences.filter((e) => e.prix !== null);
}
