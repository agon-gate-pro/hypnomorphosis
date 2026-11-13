"use client";

import { useActionState, useId } from "react";
import type { EtatAchat } from "@/app/experiences/[slug]/actions";

// Bouton d'achat d'une fiche, avec la renonciation au droit de rétractation à cocher avant le paiement.
// Présent deux fois sur la fiche (haut et bas de page) : useId garde des identifiants distincts.
export default function FormulaireAchat({ action, prix }: { action: (etat: EtatAchat, donnees: FormData) => Promise<EtatAchat>; prix: string }) {
  const [etat, envoyer, enCours] = useActionState(action, {});
  const id = useId();

  return (
    <form className="fiche-achat" action={envoyer}>
      <span className="prix">{prix}</span>
      <button className="btn btn-plein" type="submit" disabled={enCours}>{enCours ? "Un instant…" : "Acheter cette expérience"}</button>
      <label className="renonciation" htmlFor={`${id}-renonciation`}>
        <input id={`${id}-renonciation`} type="checkbox" name="renonciation" value="oui" />
        <span>J’accède à mon expérience dès le paiement et je renonce expressément à mon droit de rétractation.</span>
      </label>
      {etat.erreur && <p className="achat-erreur" role="alert">{etat.erreur}</p>}
    </form>
  );
}
