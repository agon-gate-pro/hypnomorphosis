import { urlSite } from "@/lib/site";

// Mise en page commune des e-mails, aux couleurs du site : nom en tête, titre, blocs de texte, bouton, signature de
// Bérénice et pied de page. Chaque e-mail part en HTML (tableaux et styles en ligne, lus par toutes les messageries)
// et en texte brut.

export type BlocEmail =
  | { type: "p"; texte: string; discret?: boolean }
  | { type: "encadre"; lignes: string[] }
  | { type: "liste"; elements: string[] }
  // lien au fil du texte : avant, lien, après
  | { type: "lien"; avant: string; libelle: string; chemin: string; apres?: string }
  // paragraphe avec plusieurs liens : morceaux de texte et liens (chemin du site ou adresse complète)
  | { type: "riche"; morceaux: (string | { libelle: string; url: string })[] };

export type ContenuEmail = {
  sujet: string;
  titre: string;
  blocs: BlocEmail[];
  bouton?: { libelle: string; chemin: string };
  piedDePage: string;
  // fin de l'e-mail, à la place de « Belle expérience, Bérénice, HypnoMorphosis »
  signature?: string[];
};

const couleurs = { papier: "#fbf9f4", pierre: "#f1ece1", olive: "#555a40", oliveNuit: "#2f3425", dore: "#c9a46a", encre: "#33352a", gris: "#6d6c5d", filet: "#e3dfd2" };
const serif = "font-family:Georgia,'Times New Roman',serif;";
const texte = "font-family:Arial,Helvetica,sans-serif;";

const signatureParDefaut = ["Belle expérience,", "Bérénice", "HypnoMorphosis"];

// lien absolu vers le site (boutons et liens) ; une adresse complète est gardée telle quelle
export function lienSite(chemin: string) {
  return new URL(chemin, urlSite).toString();
}

// espaces insécables de la typographie française (avant : ; ? ! », après «) : aucun signe ne passe seul à la ligne
function fine(t: string) {
  return t.replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ");
}

function echapper(t: string) {
  return fine(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function rendreEmail(c: ContenuEmail): { html: string; text: string } {
  const signature = c.signature ?? signatureParDefaut;
  const p = (contenu: string, discret = false) =>
    `<p style="${texte}margin:0 0 16px;font-size:${discret ? 13 : 16}px;line-height:1.6;color:${discret ? couleurs.gris : couleurs.encre};">${contenu}</p>`;
  const lien = (libelle: string, chemin: string) => `<a href="${lienSite(chemin)}" style="color:${couleurs.olive};text-decoration:underline;">${echapper(libelle)}</a>`;

  const blocsHtml = c.blocs.map((b) => {
    switch (b.type) {
      case "p":
        return p(echapper(b.texte), b.discret);
      case "encadre":
        return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr><td style="background:${couleurs.pierre};border-left:3px solid ${couleurs.dore};padding:16px 18px;">${b.lignes.map((l, i) => `<div style="${i === 0 ? serif + "font-size:19px;" : texte + "font-size:15px;"}line-height:1.6;color:${couleurs.encre};">${echapper(l)}</div>`).join("")}</td></tr></table>`;
      case "liste":
        return `<ul style="${texte}margin:0 0 16px;padding-left:20px;font-size:16px;line-height:1.6;color:${couleurs.encre};">${b.elements.map((e) => `<li style="margin:0 0 6px;">${echapper(e)}</li>`).join("")}</ul>`;
      case "lien":
        return p(`${echapper(b.avant)}${lien(b.libelle, b.chemin)}${echapper(b.apres ?? "")}`);
      case "riche":
        return p(b.morceaux.map((m) => (typeof m === "string" ? echapper(m) : lien(m.libelle, m.url))).join(""));
    }
  }).join("");

  const bouton = c.bouton
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;"><tr><td style="background:${couleurs.olive};"><a href="${lienSite(c.bouton.chemin)}" style="${texte}display:inline-block;padding:14px 24px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${couleurs.papier};text-decoration:none;">${echapper(c.bouton.libelle)}</a></td></tr></table>`
    : "";

  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${echapper(c.sujet)}</title></head>
<body style="margin:0;padding:0;background:${couleurs.pierre};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${couleurs.pierre};"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${couleurs.papier};">
<tr><td style="background:${couleurs.oliveNuit};padding:22px 32px;"><span style="${serif}font-size:15px;letter-spacing:4px;color:${couleurs.dore};">HYPNOMORPHOSIS</span></td></tr>
<tr><td style="padding:34px 32px 8px;">
<h1 style="${serif}font-weight:normal;margin:0 0 20px;font-size:30px;line-height:1.2;color:${couleurs.encre};">${echapper(c.titre)}</h1>
${blocsHtml}${bouton}
<p style="${serif}font-style:italic;margin:0 0 28px;font-size:17px;line-height:1.5;color:${couleurs.olive};">${signature.map(echapper).join("<br>")}</p>
</td></tr>
<tr><td style="border-top:1px solid ${couleurs.filet};padding:18px 32px 26px;">${p(echapper(c.piedDePage), true).replace("margin:0 0 16px", "margin:0")}</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    "HYPNOMORPHOSIS",
    "",
    c.titre,
    "",
    ...c.blocs.flatMap((b) => {
      switch (b.type) {
        case "p":
          return [b.texte, ""];
        case "encadre":
          return [...b.lignes, ""];
        case "liste":
          return [...b.elements.map((e) => `- ${e}`), ""];
        case "lien":
          return [`${b.avant}${b.libelle} (${lienSite(b.chemin)})${b.apres ?? ""}`, ""];
        case "riche":
          return [b.morceaux.map((m) => (typeof m === "string" ? m : `${m.libelle} (${lienSite(m.url)})`)).join(""), ""];
      }
    }),
    ...(c.bouton ? [`${c.bouton.libelle} : ${lienSite(c.bouton.chemin)}`, ""] : []),
    ...signature,
    "",
    "--",
    c.piedDePage,
  ].join("\n");

  return { html, text };
}
