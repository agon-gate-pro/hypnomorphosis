import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Carte affichée quand un lien vers le site est partagé (TikTok, Instagram, WhatsApp…)
export const alt = "HypnoMorphosis · Ouvrir le champ de vos possibles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const enDataUrl = (contenu: Buffer, type: string) => `data:${type};base64,${contenu.toString("base64")}`;

export default async function Image() {
  // chemins écrits en entier : le build sait ainsi quels fichiers embarquer
  const [marcellus, embleme, couverture] = await Promise.all([
    readFile(join(process.cwd(), "assets", "Marcellus-Regular.ttf")),
    readFile(join(process.cwd(), "public", "logo", "hypnomorphosis-embleme.svg")),
    readFile(join(process.cwd(), "public", "images", "couverture-decouverte.jpg")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbf9f4", fontFamily: "Marcellus" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#555a40" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={enDataUrl(embleme, "image/svg+xml")} width={300} height={300} alt="" />
          <div style={{ marginTop: 34, fontSize: 52, letterSpacing: 12 }}>HYPNOMORPHOSIS</div>
          <div style={{ marginTop: 14, fontSize: 26, letterSpacing: 5, color: "#8b9173" }}>OUVRIR LE CHAMP DE VOS POSSIBLES</div>
        </div>
        {/* la couverture extraite du PDF a une marge blanche en bas : on la fait déborder du cadre pour la couper */}
        <div style={{ display: "flex", width: 388, height: 630, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={enDataUrl(couverture, "image/jpeg")} width={400} height={650} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Marcellus", data: marcellus, style: "normal", weight: 400 }] },
  );
}
