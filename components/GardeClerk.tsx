"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// délai avant de recharger, ou de proposer un rechargement
const DELAI_MS = 4000;
// la page a déjà été rechargée une fois toute seule : on ne boucle pas
const CLE_RECHARGEE = "clerk-recharge";

/**
 * Filet de sécurité autour d'un composant Clerk (SignIn, SignUp, UserProfile), repris de Set et Brique.
 * Ces composants sont dessinés dans le navigateur par le script de Clerk : s'il tarde ou échoue, la zone
 * reste vide sans explication (constaté sur Set et Brique juste après la création d'un compte). Si rien
 * de Clerk (.cl-rootBox) n'est apparu au bout de 4 secondes, la page est rechargée une fois ; si ça ne
 * suffit pas, un bouton propose de recharger à la main. Le message disparaît dès que Clerk s'affiche.
 */
export default function GardeClerk({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [bloque, setBloque] = useState(false);

  useEffect(() => {
    const monte = () => Boolean(ref.current?.querySelector(".cl-rootBox"));
    const minuteur = window.setTimeout(() => {
      if (monte()) return;
      let dejaRechargee = true;
      try {
        dejaRechargee = sessionStorage.getItem(CLE_RECHARGEE) === "1";
        if (!dejaRechargee) sessionStorage.setItem(CLE_RECHARGEE, "1");
      } catch {
        // stockage indisponible (navigation privée stricte) : on se contente du message
      }
      if (dejaRechargee) setBloque(true);
      else window.location.reload();
    }, DELAI_MS);
    const observateur = new MutationObserver(() => {
      if (!monte()) return;
      setBloque(false);
      try {
        sessionStorage.removeItem(CLE_RECHARGEE);
      } catch {
        // idem
      }
    });
    if (ref.current) observateur.observe(ref.current, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(minuteur);
      observateur.disconnect();
    };
  }, []);

  return (
    <>
      {bloque && (
        <div role="status" className="garde-clerk">
          <p><b>Le chargement prend plus de temps que prévu.</b> Rechargez la page pour afficher la suite.</p>
          <button type="button" className="btn btn-trait" onClick={() => window.location.reload()}>Recharger la page</button>
        </div>
      )}
      <div ref={ref} className="contents">{children}</div>
    </>
  );
}
