// Offre ou retire l'accès à des expériences payantes, dans la table `acces` de la base (lib/db/schema.ts).
// Lit CLERK_SECRET_KEY et DATABASE_URL_UNPOOLED dans .env.local sans les afficher : agit donc sur l'instance Clerk
// et la base de ce fichier.
//   node outils/acces-experience.cjs <email>                          affiche les accès du compte
//   node outils/acces-experience.cjs <email> le-noeud,apres-nous      offre ces expériences, sans limite
//   node outils/acces-experience.cjs <email> le-noeud 2027-11-13      offre jusqu'à cette date (passée : accès expiré)
//   node outils/acces-experience.cjs <email> vide                     clôt tous les accès en cours (historique gardé)
const fs = require("fs");
const { Client } = require("pg");

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => /^[A-Z_]+=/.test(l))
    .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1).replace(/^"|"$/g, "")]),
);
for (const nom of ["CLERK_SECRET_KEY", "DATABASE_URL_UNPOOLED"]) if (!env[nom]) throw new Error(`${nom} absent de .env.local`);

async function compteClerk(email) {
  const reponse = await fetch(`https://api.clerk.com/v1/users?email_address=${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${env.CLERK_SECRET_KEY}` },
  });
  const comptes = await reponse.json();
  return Array.isArray(comptes) ? comptes[0] : undefined;
}

(async () => {
  const [email, liste, finTexte] = process.argv.slice(2);
  if (!email) return console.log("usage : node outils/acces-experience.cjs <email> [slug,slug|vide] [AAAA-MM-JJ]");
  const compte = await compteClerk(email);
  if (!compte) return console.log("aucun compte pour", email, "dans cette instance Clerk");

  const base = new Client({ connectionString: env.DATABASE_URL_UNPOOLED.replace(/sslmode=(require|prefer|verify-ca)\b/, "sslmode=verify-full") });
  await base.connect();
  try {
    if (liste === "vide") {
      const r = await base.query("update acces set fin = now() where clerk_user_id = $1 and (fin is null or fin > now())", [compte.id]);
      console.log(r.rowCount, "accès clos");
    } else if (liste) {
      const fin = finTexte ? new Date(`${finTexte}T23:59:59Z`) : null;
      for (const experience of liste.split(",")) {
        await base.query("insert into acces (clerk_user_id, experience, origine, fin) values ($1, $2, 'offert', $3)", [compte.id, experience, fin]);
      }
    }
    const { rows } = await base.query(
      "select experience, origine, debut, fin, (fin is null or fin > now()) as en_cours from acces where clerk_user_id = $1 order by cree_le",
      [compte.id],
    );
    console.log("compte :", compte.id, compte.first_name);
    for (const r of rows) {
      console.log(` ${r.en_cours ? "ouvert" : "clos  "}  ${r.experience}  (${r.origine}, du ${r.debut.toISOString().slice(0, 10)}, ${r.fin ? `au ${r.fin.toISOString().slice(0, 10)}` : "sans limite"})`);
    }
    if (rows.length === 0) console.log(" aucun accès");
  } finally {
    await base.end();
  }
})();
