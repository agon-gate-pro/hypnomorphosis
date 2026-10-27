// Icônes au trait, déclarées une fois dans la page puis réutilisées avec <Icone nom="..." />

export type NomIcone = "casque" | "chemin" | "plume" | "sceau" | "carnet" | "ecran" | "instagram" | "tiktok" | "youtube";

export function SpriteIcones() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-casque" viewBox="0 0 26 26"><path d="M4 16v-3a9 9 0 0 1 18 0v3" /><rect x="3" y="15.5" width="4.5" height="7" rx="1.5" /><rect x="18.5" y="15.5" width="4.5" height="7" rx="1.5" /></symbol>
      <symbol id="i-chemin" viewBox="0 0 26 26"><circle cx="5" cy="21" r="1.6" /><path d="M7 19.5c4-1 3-6 7-7s5-4 6-6" /><path d="M17 5.5h4v4" /></symbol>
      <symbol id="i-plume" viewBox="0 0 26 26"><path d="M20 4c-7 1-11 6-13 14" /><path d="M20 4c0 6-4 10-11 11" /><path d="M4 22h18" /></symbol>
      <symbol id="i-sceau" viewBox="0 0 26 26"><path d="M5 4h11l5 5v13H5z" /><path d="M8 11h8M8 15h5" /><circle cx="17" cy="19" r="3" /></symbol>
      <symbol id="i-carnet" viewBox="0 0 26 26"><path d="M6 3h11l4 4v16H6z" /><path d="M10 10h7M10 14h7M10 18h4" /></symbol>
      <symbol id="i-ecran" viewBox="0 0 26 26"><rect x="3" y="5" width="20" height="13" rx="1.5" /><path d="M9 22h8M13 18v4M7 10h12M7 14h7" /></symbol>
      <symbol id="i-instagram" viewBox="0 0 26 26"><rect x="4" y="4" width="18" height="18" rx="5" /><circle cx="13" cy="13" r="4" /><circle cx="18.5" cy="7.5" r=".6" /></symbol>
      <symbol id="i-tiktok" viewBox="0 0 26 26"><path d="M14 4v12.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.5 3 2.5 5 5.5 5" /></symbol>
      <symbol id="i-youtube" viewBox="0 0 26 26"><rect x="3" y="6" width="20" height="14" rx="4" /><path d="M11 10v6l5-3z" /></symbol>
    </svg>
  );
}

export function Icone({ nom }: { nom: NomIcone }) {
  return (
    <svg className="icone" aria-hidden="true">
      <use href={`#i-${nom}`} />
    </svg>
  );
}
