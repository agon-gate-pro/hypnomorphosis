"use client";

import { useState, useTransition } from "react";
import { choisirAnnonces } from "@/app/espace/actions";

// Case non cochée par défaut (accord préalable obligatoire pour la prospection), enregistrée dès qu'on la coche ou la décoche.
export default function CaseAnnonces({ accepte }: { accepte: boolean }) {
  const [coche, setCoche] = useState(accepte);
  const [message, setMessage] = useState<{ texte: string; erreur?: boolean } | null>(null);
  const [enCours, demarrer] = useTransition();

  function changer(valeur: boolean) {
    setCoche(valeur);
    setMessage(null);
    demarrer(async () => {
      const { ok } = await choisirAnnonces(valeur);
      if (ok) {
        setMessage({ texte: valeur ? "C’est noté, vous recevrez nos annonces." : "C’est noté, vous ne recevrez plus nos annonces." });
      } else {
        setCoche(!valeur);
        setMessage({ texte: "Votre choix n’a pas pu être enregistré. Réessayez un peu plus tard.", erreur: true });
      }
    });
  }

  return (
    <div className="annonces">
      <label>
        <input type="checkbox" checked={coche} disabled={enCours} onChange={(e) => changer(e.target.checked)} />
        <span>Je souhaite recevoir par e-mail l’annonce des nouvelles expériences et les offres HypnoMorphosis. Je peux me désinscrire à tout moment.</span>
      </label>
      <p className={message?.erreur ? "annonces-message erreur" : "annonces-message"} role="status">{message?.texte}</p>
    </div>
  );
}
