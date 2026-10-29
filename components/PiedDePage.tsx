import Link from "next/link";
import { Icone } from "@/components/Icones";

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
              <li><Link href="/#experiences">Les expériences</Link></li>
              <li><Link href="/#decouverte">Expérience découverte</Link></li>
              <li><Link href="/#apropos">Derrière HypnoMorphosis</Link></li>
              <li><Link href="/espace">Mon espace</Link></li>
            </ul>
          </div>
          <div>
            <h2>Retrouvez HypnoMorphosis</h2>
            <div className="icones">
              <a href="#" aria-label="TikTok"><Icone nom="tiktok" /></a>
              <a href="#" aria-label="Instagram"><Icone nom="instagram" /></a>
              <a href="#" aria-label="YouTube"><Icone nom="youtube" /></a>
            </div>
          </div>
        </div>
        <div className="bas">Mentions légales · CGV · Politique de confidentialité · Paiement et vente en ligne</div>
      </div>
    </footer>
  );
}
