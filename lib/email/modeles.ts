import { prolongation, type Experience } from "@/lib/experiences";
import { dateLongue } from "@/lib/dates";
import { lienSite, type ContenuEmail } from "./mise-en-page";

// Textes des e-mails automatiques (spécification, section 8), en vouvoiement comme le site.
// Première rédaction par Agon Gate dans le ton de Bérénice, à faire valider par elle.

const euros = (centimes: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(centimes / 100);
const bonjour = (prenom: string | null | undefined, sinon: string) => (prenom?.trim() ? `${sinon}, ${prenom.trim()}` : sinon);

const piedCompte = "Vous recevez cet e-mail parce que vous avez créé votre espace HypnoMorphosis.";
const piedAchat = "Vous recevez cet e-mail à la suite de votre achat sur HypnoMorphosis.";

// À la création du compte : bienvenue et accès à l'expérience découverte
export function emailBienvenue(prenom: string | null | undefined): ContenuEmail {
  return {
    sujet: "Bienvenue dans votre espace HypnoMorphosis",
    titre: bonjour(prenom, "Bienvenue"),
    blocs: [
      { type: "p", texte: "Votre espace HypnoMorphosis est prêt, et votre expérience découverte vous y attend : 5 jours pour ouvrir le champ de vos possibles." },
      { type: "liste", elements: [
        "2 expériences audio guidées, pour vous laisser guider autrement",
        "Une ordalie, pour expérimenter plutôt que simplement réfléchir",
        "Un exercice chaque jour pendant 5 jours",
        "Un engagement à signer, pour marquer votre décision d’aller jusqu’au bout",
      ] },
      { type: "p", texte: "Installez-vous dans un endroit calme, de préférence avec un casque, et laissez-vous guider, jour après jour." },
    ],
    bouton: { libelle: "Commencer l’expérience découverte", chemin: "/espace/experiences/decouverte" },
    piedDePage: piedCompte,
  };
}

// À l'enregistrement d'un achat ou d'une prolongation : récapitulatif, durée d'accès et rappel de l'accord sur le droit
// de rétractation (support durable exigé pour la renonciation, annoncé par les CGV)
export function emailConfirmationAchat(a: { prenom: string | null | undefined; experience: Experience; montantCentimes: number | null; fin: Date; renonciationLe: Date | null; prolongation?: boolean }): ContenuEmail {
  const { experience: e } = a;
  return {
    sujet: a.prolongation ? `${e.titre} : votre accès est prolongé` : `${e.titre} : votre expérience est ouverte`,
    titre: bonjour(a.prenom, "Merci"),
    blocs: [
      a.prolongation
        ? { type: "p", texte: `Votre prolongation est confirmée : ${e.titre} reste ouverte dans votre espace pour une année de plus.` }
        : { type: "p", texte: `Votre achat est confirmé : ${e.titre} vous attend dans votre espace.` },
      { type: "encadre", lignes: [
        `${e.titre} · ${e.duree}`,
        ...(a.montantCentimes !== null ? [`Montant payé : ${euros(a.montantCentimes)} TTC`] : []),
        `Accès ouvert jusqu’au ${dateLongue(a.fin)}`,
      ] },
      ...(a.prolongation ? [] : [
        { type: "p", texte: "Prenez le temps de vous installer avant de commencer : imprimez votre carnet, puis avancez à votre rythme, un exercice par jour." } as const,
        { type: "lien", avant: "Vous préférez écrire sur tablette ? ", libelle: "Tout est expliqué ici", chemin: "/aide/tablette", apres: "." } as const,
      ]),
      { type: "p", discret: true, texte: `Pour mémoire : avant le paiement${a.renonciationLe ? `, le ${dateLongue(a.renonciationLe)}` : ""}, vous avez accepté nos conditions générales de vente (${lienSite("/cgv")}), demandé l’accès immédiat à votre expérience et reconnu perdre votre droit de rétractation dès cet accès.` },
    ],
    bouton: { libelle: a.prolongation ? "Retrouver mon expérience" : "Commencer mon expérience", chemin: `/espace/experiences/${e.slug}` },
    piedDePage: piedAchat,
  };
}

// Quinze jours avant la fin d'un accès acheté : rappel, avec la prolongation d'un an
export function emailRappelFin(a: { prenom: string | null | undefined; experience: Experience; fin: Date }): ContenuEmail {
  const { experience: e } = a;
  return {
    sujet: `Votre accès à ${e.titre} se termine le ${dateLongue(a.fin)}`,
    titre: bonjour(a.prenom, "Bonjour"),
    blocs: [
      { type: "p", texte: `Votre accès à ${e.titre} se termine le ${dateLongue(a.fin)}. Après cette date, le carnet et les audios ne seront plus disponibles dans votre espace.` },
      { type: "p", texte: `Si vous souhaitez continuer à les retrouver, vous pouvez prolonger votre accès d’une année pour ${prolongation.prix}. L’année s’ajoute à la date de fin : vous ne perdez aucun jour en prolongeant dès maintenant.` },
      { type: "p", texte: "Et si vous ne prolongez pas, ce n’est pas grave : vous pourrez le faire plus tard, au même prix, et retrouver votre expérience là où vous l’aviez laissée." },
    ],
    bouton: { libelle: `Prolonger d’un an · ${prolongation.prix}`, chemin: `/espace/prolonger/${e.slug}` },
    piedDePage: piedAchat,
  };
}

// Quinze jours après l'achat : un mot de soutien, sans pression
export function emailSoutien(a: { prenom: string | null | undefined; experience: Experience }): ContenuEmail {
  const { experience: e } = a;
  return {
    sujet: "Comment se passe votre expérience ?",
    titre: bonjour(a.prenom, "Un petit mot"),
    blocs: [
      { type: "p", texte: `Voilà quinze jours que vous avez commencé ${e.titre}. Je voulais simplement prendre de vos nouvelles.` },
      { type: "p", texte: "Où que vous en soyez, c’est très bien ainsi. Certains jours, les choses bougent vite ; d’autres, rien ne semble se passer, et pourtant quelque chose fait son chemin. Il n’y a pas de bon rythme : il y a le vôtre." },
      { type: "p", texte: "Si vous avez mis l’expérience de côté, vous pouvez la reprendre là où vous l’aviez laissée, ou réécouter un audio qui vous a fait du bien." },
    ],
    bouton: { libelle: "Retrouver mon expérience", chemin: `/espace/experiences/${e.slug}` },
    piedDePage: piedAchat,
  };
}
