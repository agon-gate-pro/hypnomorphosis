"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { sujetsContact } from "@/lib/site";

export type EtatContact = {
  statut: "attente" | "envoye" | "erreur";
  message?: string;
  valeurs?: { prenom: string; email: string; sujet: string; message: string };
};

// Limite d'envois par adresse IP, en mémoire : propre à chaque instance du serveur, elle freine les envois en rafale
// sans base de données ni service de plus. Une vraie limite commune arrivera avec la base si le spam le demande.
const parHeure = 5;
const envois = new Map<string, number[]>();

function tropDEnvois(ip: string) {
  const uneHeureAvant = Date.now() - 60 * 60 * 1000;
  const recents = (envois.get(ip) ?? []).filter((t) => t > uneHeureAvant);
  envois.set(ip, [...recents, Date.now()]);
  return recents.length >= parHeure;
}

const champ = (donnees: FormData, nom: string) => String(donnees.get(nom) ?? "").trim();

// Le message part uniquement par e-mail et n'est pas conservé sur le site. « Répondre » écrit directement à la personne.
export async function envoyerMessage(_etat: EtatContact, donnees: FormData): Promise<EtatContact> {
  // champ invisible rempli : un robot. On lui répond comme si tout s'était bien passé, sans rien envoyer.
  if (champ(donnees, "site_web")) return { statut: "envoye" };

  const valeurs = { prenom: champ(donnees, "prenom"), email: champ(donnees, "email"), sujet: champ(donnees, "sujet"), message: champ(donnees, "message") };
  const refus = (message: string): EtatContact => ({ statut: "erreur", message, valeurs });

  if (!valeurs.prenom || valeurs.prenom.length > 80) return refus("Indiquez votre prénom.");
  if (valeurs.email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.email)) return refus("Vérifiez votre adresse e-mail.");
  if (!sujetsContact.includes(valeurs.sujet)) return refus("Choisissez un sujet.");
  if (valeurs.message.length < 10) return refus("Votre message est un peu court.");
  if (valeurs.message.length > 5000) return refus("Votre message est trop long (5 000 caractères au maximum).");

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnue";
  if (tropDEnvois(ip)) return refus("Trop de messages envoyés. Réessayez un peu plus tard.");

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_DESTINATAIRE;
  const expediteur = process.env.EMAIL_FROM || "HypnoMorphosis <onboarding@resend.dev>";
  if (!cle || !destinataire) {
    console.error("Formulaire de contact : RESEND_API_KEY ou CONTACT_DESTINATAIRE manquant");
    return refus("Le message n’a pas pu être envoyé. Réessayez un peu plus tard.");
  }

  const { error } = await new Resend(cle).emails.send({
    from: expediteur,
    to: destinataire,
    replyTo: valeurs.email,
    subject: `Contact HypnoMorphosis · ${valeurs.sujet}`,
    text: `Message reçu depuis le formulaire de contact.\n\nPrénom : ${valeurs.prenom}\nE-mail : ${valeurs.email}\nSujet : ${valeurs.sujet}\n\n${valeurs.message}\n`,
  });
  if (error) {
    console.error("Formulaire de contact : envoi refusé par Resend", error.name);
    return refus("Le message n’a pas pu être envoyé. Réessayez un peu plus tard.");
  }
  return { statut: "envoye" };
}
