"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const liens = [
  { href: "#experiences", texte: "Les expériences", etiquette: "Boutique" },
  { href: "#decouverte", texte: "Expérience découverte", etiquette: "Gratuite" },
  { href: "#apropos", texte: "À propos" },
  { href: "#", texte: "Mon espace" },
];

function Marque() {
  return (
    <a className="marque" href="#">
      <Image className="embleme" src="/logo/hypnomorphosis-embleme.svg" alt="Logo HypnoMorphosis" width={46} height={46} priority />
      <span translate="no">HYPNOMORPHOSIS</span>
    </a>
  );
}

export default function EnTete() {
  const [defile, setDefile] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const boutonMenu = useRef<HTMLButtonElement>(null);
  const boutonFermer = useRef<HTMLButtonElement>(null);
  const dejaOuvert = useRef(false);

  // ombre légère dès qu'on quitte le haut de page
  useEffect(() => {
    const ombre = () => setDefile(window.scrollY > 8);
    ombre();
    window.addEventListener("scroll", ombre, { passive: true });
    return () => window.removeEventListener("scroll", ombre);
  }, []);

  // menu plein écran : page bloquée derrière, Échap pour fermer, focus rendu au bouton
  useEffect(() => {
    document.body.classList.toggle("menu-ouvert", ouvert);
    if (ouvert) boutonFermer.current?.focus();
    else if (dejaOuvert.current) boutonMenu.current?.focus();
    dejaOuvert.current ||= ouvert;
    if (!ouvert) return;
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", echap);
    return () => window.removeEventListener("keydown", echap);
  }, [ouvert]);

  return (
    <>
      <header className={`site${defile ? " defile" : ""}`}>
        <div className="wrap">
          <Marque />
          <nav>
            {liens.map((l) => <a key={l.texte} href={l.href}>{l.texte}</a>)}
          </nav>
          <button ref={boutonMenu} className="menu-mobile" type="button" aria-expanded={ouvert} aria-controls="menu-plein" onClick={() => setOuvert(true)}>
            <span className="traits" aria-hidden="true" />Menu
          </button>
        </div>
      </header>

      {/* hors de l'en-tête : son flou d'arrière-plan enfermerait un élément fixe */}
      <div className={`menu-plein grain${ouvert ? " ouvert" : ""}`} id="menu-plein" role="dialog" aria-modal="true" aria-label="Menu">
        <Image className="fond" src="/logo/hypnomorphosis-embleme.svg" alt="" width={520} height={520} />
        <div className="barre wrap">
          <Marque />
          <button ref={boutonFermer} className="menu-mobile" type="button" onClick={() => setOuvert(false)}>
            <span aria-hidden="true">✕</span>Fermer
          </button>
        </div>
        <nav>
          {liens.map((l) => (
            <a key={l.texte} href={l.href} onClick={() => setOuvert(false)}>
              {l.texte} {l.etiquette && <small>{l.etiquette}</small>}
            </a>
          ))}
        </nav>
        <p className="pied">Ouvrir le champ de vos possibles</p>
      </div>
    </>
  );
}
