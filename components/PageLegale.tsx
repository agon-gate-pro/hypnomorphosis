import type { ReactNode } from "react";
import EnTete from "@/components/EnTete";
import PiedDePage from "@/components/PiedDePage";

// Gabarit des pages légales : en-tête beige, texte en colonne de lecture
export default function PageLegale({ titre, miseAJour, children }: { titre: string; miseAJour: string; children: ReactNode }) {
  return (
    <>
      <EnTete />
      <main>
        <section className="legal-tete grain">
          <div className="wrap">
            <span className="caps">Informations légales</span>
            <h1>{titre}</h1>
            <p>Dernière mise à jour : {miseAJour}</p>
          </div>
        </section>
        <article className="wrap legal">{children}</article>
      </main>
      <PiedDePage />
    </>
  );
}

// Information pas encore fournie (Registro Mercantil, adresse de contact…), signalée tant qu'elle manque
export function AComplet({ quoi }: { quoi: string }) {
  return <span className="a-completer">à compléter : {quoi}</span>;
}

// Adresse de contact de la société, ou son emplacement à compléter
export function Contact({ email }: { email: string | null }) {
  return email ? <a href={`mailto:${email}`}>{email}</a> : <AComplet quoi="adresse e-mail de contact" />;
}
