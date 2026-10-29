"use client";

import { useRef, useState } from "react";

// durée en minutes:secondes, « --:-- » tant que le fichier n'a pas donné sa durée
function temps(secondes: number) {
  if (!Number.isFinite(secondes)) return "--:--";
  const s = Math.floor(secondes);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// Lecteur maison aux couleurs du carnet. La source passe par la route des fichiers privés (lien signé neuf à chaque
// chargement) ; pas de bouton de téléchargement tant que Bérénice n'a pas tranché.
export default function LecteurAudio({ numero, titre, src }: { numero: number; titre: string; src: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [enLecture, setEnLecture] = useState(false);
  const [position, setPosition] = useState(0);
  const [duree, setDuree] = useState(NaN);
  const [erreur, setErreur] = useState(false);

  function basculer() {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      // un seul audio à la fois sur la page
      document.querySelectorAll("audio").forEach((autre) => autre !== a && autre.pause());
      a.play().catch(() => setErreur(true));
    } else {
      a.pause();
    }
  }

  return (
    <div className={`lecteur${enLecture ? " en-lecture" : ""}`}>
      <audio
        ref={audio}
        src={src}
        preload="metadata"
        onPlay={() => { setEnLecture(true); setErreur(false); }}
        onPause={() => setEnLecture(false)}
        onEnded={() => setEnLecture(false)}
        onLoadedMetadata={(e) => setDuree(e.currentTarget.duration)}
        onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime)}
        onError={() => setErreur(true)}
      />
      <span className="numero" aria-hidden="true">{numero}</span>
      <div className="corps">
        <div className="titre-ligne">
          <h3>{titre}</h3>
          <span className="duree">{temps(duree)}</span>
        </div>
        <div className="commandes">
          <button type="button" className="lire" onClick={basculer} aria-label={enLecture ? `Mettre en pause ${titre}` : `Écouter ${titre}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {enLecture ? <path d="M8 5h3v14H8zM13 5h3v14h-3z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>
          <input
            type="range"
            className="barre"
            min={0}
            max={Number.isFinite(duree) ? duree : 0}
            step={1}
            value={position}
            onChange={(e) => { if (audio.current) audio.current.currentTime = Number(e.target.value); }}
            aria-label={`Position dans ${titre}`}
            aria-valuetext={`${temps(position)} sur ${temps(duree)}`}
            style={{ "--avance": `${Number.isFinite(duree) && duree > 0 ? (position / duree) * 100 : 0}%` } as React.CSSProperties}
          />
          <span className="temps">{temps(position)}</span>
        </div>
        {erreur && <p className="erreur">L’audio n’a pas pu être chargé. Rechargez la page pour réessayer.</p>}
      </div>
    </div>
  );
}
