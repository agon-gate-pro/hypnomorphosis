"use client";

import { useActionState } from "react";
import { useUser } from "@clerk/nextjs";
import { envoyerMessage, type EtatContact } from "@/app/contact/actions";
import { sujetsContact } from "@/lib/site";

const etatInitial: EtatContact = { statut: "attente" };

export default function FormulaireContact() {
  const [etat, envoyer, enCours] = useActionState(envoyerMessage, etatInitial);
  // connectée : prénom et e-mail déjà remplis ; la clé recrée le champ quand Clerk a chargé le compte
  const { user } = useUser();
  const compte = user?.id ?? "visiteur";

  if (etat.statut === "envoye") {
    return (
      <div className="contact-merci" role="status">
        <h2>Merci, votre message est bien parti.</h2>
        <p>Je vous réponds dès que possible à l’adresse que vous m’avez indiquée.</p>
      </div>
    );
  }

  return (
    <form className="contact-formulaire" action={envoyer}>
      <div className="deux-colonnes">
        <label>
          Prénom
          <input key={`prenom-${compte}`} name="prenom" required maxLength={80} autoComplete="given-name" defaultValue={etat.valeurs?.prenom ?? user?.firstName ?? ""} />
        </label>
        <label>
          E-mail
          <input key={`email-${compte}`} name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={etat.valeurs?.email ?? user?.primaryEmailAddress?.emailAddress ?? ""} />
        </label>
      </div>
      <label>
        Sujet
        <select name="sujet" defaultValue={etat.valeurs?.sujet ?? sujetsContact[0]}>
          {sujetsContact.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>
      <label>
        Votre message
        <textarea name="message" required minLength={10} maxLength={5000} rows={7} defaultValue={etat.valeurs?.message} />
      </label>
      {/* piège à robots : invisible et hors du parcours clavier, seul un robot le remplit */}
      <label className="piege" aria-hidden="true">
        Site web
        <input name="site_web" tabIndex={-1} autoComplete="off" />
      </label>
      {etat.statut === "erreur" && <p className="contact-erreur" role="alert">{etat.message}</p>}
      <button className="btn btn-plein" type="submit" disabled={enCours}>{enCours ? "Envoi en cours…" : "Envoyer mon message"}</button>
      <p className="contact-note">Vos coordonnées servent uniquement à vous répondre.</p>
    </form>
  );
}
