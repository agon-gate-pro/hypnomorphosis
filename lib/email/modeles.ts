import { prolongation, type Experience } from "@/lib/experiences";
import { dateLongue } from "@/lib/dates";
import { reseaux } from "@/lib/site";
import { lienSite, type ContenuEmail } from "./mise-en-page";

// Textes des e-mails automatiques (spécification, section 8), en vouvoiement comme le site.
// Bienvenue : rédaction d'Agon Gate. Confirmation, encouragement, rappel de fin et prolongation : textes de Bérénice
// (docs/Echange Mail 13.txt, 2026-11-15), typographie corrigée.

const euros = (centimes: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(centimes / 100);
const bonjour = (prenom: string | null | undefined, sinon: string) => (prenom?.trim() ? `${sinon}, ${prenom.trim()}` : sinon);
const capitales = (e: Experience) => e.titre.toLocaleUpperCase("fr-FR");
// nom de l'expérience dans les e-mails : en capitales et entre guillemets (« LE NŒUD »), à la demande de Bérénice
const nom = (e: Experience) => `« ${capitales(e)} »`;

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
// de rétractation (support durable exigé pour la renonciation, annoncé par les CGV). Pas de mention de facture :
// Bérénice les envoie au cas par cas, sur demande.
export function emailConfirmationAchat(a: { prenom: string | null | undefined; experience: Experience; montantCentimes: number | null; fin: Date; renonciationLe: Date | null; prolongation?: boolean }): ContenuEmail {
  const { experience: e } = a;
  return {
    sujet: a.prolongation ? `${nom(e)} : votre accès est prolongé` : `${nom(e)} : votre expérience est ouverte`,
    titre: bonjour(a.prenom, "Merci"),
    blocs: [
      a.prolongation
        ? { type: "p", texte: `Votre prolongation est confirmée : ${nom(e)} est disponible dans votre espace pour une année supplémentaire.` }
        : { type: "p", texte: `Votre achat est confirmé : ${nom(e)} vous attend dans votre espace.` },
      { type: "encadre", lignes: [
        `${capitales(e)} · ${e.duree}`,
        ...(a.montantCentimes !== null ? [`Montant payé : ${euros(a.montantCentimes)} TTC`] : []),
        `Accès ouvert jusqu’au ${dateLongue(a.fin)}`,
      ] },
      ...(a.prolongation ? [] : [
        { type: "p", texte: "Pour commencer, imprimez votre carnet ou téléchargez-le sur tablette." } as const,
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
    sujet: `Votre accès à ${nom(e)} se termine le ${dateLongue(a.fin)}`,
    titre: bonjour(a.prenom, "Bonjour"),
    blocs: [
      { type: "p", texte: `Votre accès à ${nom(e)} se termine le ${dateLongue(a.fin)}. Après cette date, le carnet et les audios de cette expérience ne seront plus disponibles dans votre espace.` },
      { type: "p", texte: `Souhaitez-vous prolonger votre accès un an de plus pour ${prolongation.prix} ?` },
    ],
    bouton: { libelle: `Prolonger d’un an · ${prolongation.prix}`, chemin: `/espace/prolonger/${e.slug}` },
    piedDePage: piedAchat,
  };
}

// Quinze jours après l'achat : mot d'encouragement de Bérénice, identique pour toutes les expériences (sans leur nom)
export function emailSoutien(a: { prenom: string | null | undefined; experience: Experience }): ContenuEmail {
  // lien vers un de ses réseaux (lib/site.ts), ou le nom seul s'il n'y est plus
  const reseau = (n: string) => {
    const r = reseaux.find((x) => x.nom === n);
    return r ? { libelle: r.nom, url: r.url } : n;
  };
  return {
    sujet: "Un petit mot d’encouragement",
    titre: bonjour(a.prenom, "Bonjour"),
    blocs: [
      { type: "p", texte: "Cela fait maintenant une quinzaine de jours que vous avez commencé votre expérience HypnoMorphosis. Je souhaitais simplement prendre un petit moment pour vous adresser un mot d’encouragement." },
      { type: "p", texte: "J’aimerais surtout vous rappeler une chose : le plus important n’est pas de tout faire parfaitement, mais de faire un peu, chaque jour." },
      { type: "p", texte: "Il y aura peut-être des jours où vous avancerez comme vous le souhaitez, et d’autres où vous aurez l’impression de ne pas avoir fait grand-chose, de manquer de temps ou de ne pas avoir trouvé les bonnes réponses." },
      { type: "p", texte: "Mais ne sous-estimez jamais la valeur d’un petit pas. Prendre quelques minutes pour écouter un audio, réfléchir à une question, écrire quelques lignes ou simplement prendre conscience de quelque chose, c’est déjà avancer." },
      { type: "p", texte: "Et surtout, ne vous mettez aucune pression. Il n’y a pas de délai à respecter pour terminer votre carnet. Vous pouvez prendre le temps dont vous avez besoin, revenir sur une question, laisser certaines réflexions mûrir et reprendre votre parcours lorsque vous vous sentez prêt(e)." },
      { type: "p", texte: "Il n’existe d’ailleurs pas de bonne ou de mauvaise réponse. Ce que vous écrivez aujourd’hui correspond à ce que vous ressentez et comprenez à cet instant. Si vous revenez sur cette même question dans quelques semaines ou quelques mois, votre regard aura peut-être changé. Et c’est aussi cela, évoluer." },
      { type: "riche", morceaux: [
        "Si vous ressentez le besoin d’un peu plus de soutien ou simplement l’envie de prolonger votre démarche, vous pouvez également me retrouver sur ",
        reseau("YouTube"), ", ", reseau("TikTok"), " et ", reseau("Instagram"),
        ". J’y partage régulièrement des réflexions et des contenus qui peuvent vous accompagner autrement.",
      ] },
      { type: "p", texte: "En attendant, rappelez-vous que chaque petit pas vous rapproche déjà de vous-même et de la vie que vous souhaitez construire." },
      { type: "p", texte: "Je vous souhaite une belle continuation dans cette expérience." },
    ],
    bouton: { libelle: "Retrouver mon expérience", chemin: `/espace/experiences/${a.experience.slug}` },
    piedDePage: piedAchat,
    signature: ["À bientôt,", "Bérénice", "HypnoMorphosis"],
  };
}
