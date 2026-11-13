"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import type { EtatAchat } from "@/app/experiences/[slug]/actions";

// Bouton d'achat d'une fiche. La case (CGV et renonciation au droit de rétractation, texte de la spécification) n'est
// jamais cochée d'avance, et le bouton reste inactif tant qu'elle ne l'est pas ; l'action serveur la revérifie.
// Présent deux fois sur la fiche (haut et bas de page) : useId garde des identifiants distincts.
export default function FormulaireAchat({ action, prix }: { action: (etat: EtatAchat, donnees: FormData) => Promise<EtatAchat>; prix: string }) {
  const [etat, envoyer, enCours] = useActionState(action, {});
  const [accord, setAccord] = useState(false);
  const id = useId();

  return (
    <form className="fiche-achat" action={envoyer}>
      <span className="prix">{prix}</span>
      <button className="btn btn-plein" type="submit" disabled={!accord || enCours}>{enCours ? "Un instant…" : "Acheter cette expérience"}</button>
      <label className="renonciation" htmlFor={`${id}-renonciation`}>
        <input id={`${id}-renonciation`} type="checkbox" name="renonciation" value="oui" checked={accord} onChange={(e) => setAccord(e.target.checked)} />
        <span>
          J’accepte les <Link href="/cgv" target="_blank">conditions générales de vente</Link>. Je demande l’accès immédiat à mon
          expérience et je reconnais perdre mon droit de rétractation dès cet accès.
        </span>
      </label>
      {etat.erreur && <p className="achat-erreur" role="alert">{etat.erreur}</p>}
    </form>
  );
}
