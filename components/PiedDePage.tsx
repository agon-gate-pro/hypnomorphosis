import Link from "next/link";
import { Icone } from "@/components/Icones";
import { reseaux } from "@/lib/site";

// liens en « /#ancre » : le pied de page sert aussi aux pages de compte, hors de l'accueil
export default function PiedDePage() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="haut">
          <div><div className="nom" translate="no">HYPNOMORPHOSIS</div><div className="devise">Ouvrir le champ de vos possibles</div></div>
          <div>
            <h2>Le site</h2>
            <ul>
              <li><Link href="/#decouverte">Expérience découverte</Link></li>
              <li><Link href="/#experiences">Les expériences</Link></li>
              <li><Link href="/derriere-hypnomorphosis">Derrière HypnoMorphosis</Link></li>
              <li><Link href="/espace">Mon espace</Link></li>
            </ul>
          </div>
          {reseaux.length > 0 && (
            <div>
              <h2>Retrouvez HypnoMorphosis</h2>
              <div className="icones">
                {reseaux.map((r) => (
                  <a key={r.nom} href={r.url} target="_blank" rel="noopener" aria-label={r.nom}><Icone nom={r.icone} /></a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="bas">Mentions légales · CGV · Politique de confidentialité · Paiement et vente en ligne</div>
      </div>
    </footer>
  );
}
