// Ouvre ou retire des expériences payantes sur un compte, en attendant les achats en base (lib/acces.ts).
// Lit CLERK_SECRET_KEY dans .env.local sans l'afficher : agit donc sur l'instance Clerk de ce fichier (développement).
//   node outils/acces-experience.cjs <email>                  affiche l'accès actuel
//   node outils/acces-experience.cjs <email> le-noeud         ouvre Le Nœud (liste séparée par des virgules)
//   node outils/acces-experience.cjs <email> vide             retire tout
const fs = require("fs");

const ligne = fs.readFileSync(".env.local", "utf8").split(/\r?\n/).find((l) => l.startsWith("CLERK_SECRET_KEY="));
if (!ligne) throw new Error("CLERK_SECRET_KEY absent de .env.local");
const cle = ligne.slice(ligne.indexOf("=") + 1).replace(/^"|"$/g, "");
const api = (chemin, options = {}) =>
  fetch(`https://api.clerk.com/v1${chemin}`, { ...options, headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" } }).then((r) => r.json());

(async () => {
  const [email, liste] = process.argv.slice(2);
  if (!email) return console.log("usage : node outils/acces-experience.cjs <email> [slug,slug|vide]");
  const comptes = await api(`/users?email_address=${encodeURIComponent(email)}`);
  if (!Array.isArray(comptes) || comptes.length === 0) return console.log("aucun compte pour", email, "dans cette instance");
  const compte = comptes[0];
  console.log("compte :", compte.id, compte.first_name, "| accès actuel :", JSON.stringify(compte.private_metadata.acces ?? []));
  if (liste === undefined) return;
  // les métadonnées sont fusionnées : le choix des annonces (privateMetadata.annonces) est conservé
  const acces = liste === "vide" ? [] : liste.split(",");
  const maj = await api(`/users/${compte.id}/metadata`, { method: "PATCH", body: JSON.stringify({ private_metadata: { acces } }) });
  console.log("accès enregistré :", JSON.stringify(maj.private_metadata?.acces));
})();
