"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo de présentation de Bérénice dans le premier bloc de l'accueil : muette et en boucle, comme sur les réseaux,
 * avec un bouton pour le son. Lancée seulement après l'affichage, et pas du tout pour qui a demandé moins d'animations.
 */
export default function VideoAccueil({ src, affiche, exemple }: { src: string; affiche?: string; exemple?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [son, setSon] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.current?.play().catch(() => {});
  }, []);

  function basculerSon() {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setSon(!v.muted);
    // sans lecture automatique, activer le son lance aussi la vidéo
    if (v.paused) v.play().catch(() => {});
  }

  return (
    <>
      {exemple && <span className="video-exemple">Vidéo d’exemple</span>}
      <video ref={video} src={src} poster={affiche} muted loop playsInline preload="metadata" aria-label="Vidéo de présentation de Bérénice Hervet" />
      <button type="button" className="video-son" onClick={basculerSon} aria-pressed={son}>
        {son ? "Couper le son" : "Activer le son"}
      </button>
    </>
  );
}
