import { auth } from "@clerk/nextjs/server";
import { lienSigne } from "@/lib/contenus";
import { experienceOuverte } from "@/lib/experiences";

// Porte des fichiers privés : vérifie la connexion et l'accès à l'expérience, puis renvoie vers un lien signé neuf.
// Le lecteur audio et le bouton du carnet pointent ici : le lien signé n'apparaît jamais dans la page et ne périme pas
// si la page reste ouverte ; le navigateur suit la redirection et lit l'audio par morceaux (avance rapide).
export async function GET(_requete: Request, { params }: RouteContext<"/espace/experiences/[slug]/fichiers/[fichier]">) {
  const { userId } = await auth();
  if (!userId) return new Response("Connexion requise", { status: 401 });

  const { slug, fichier } = await params;
  const contenus = experienceOuverte(slug)?.contenus;
  // seuls les fichiers déclarés dans lib/experiences.ts sont servis : aucun autre chemin du store n'est atteignable
  const connu = contenus && (contenus.carnet === fichier || contenus.audios.some((a) => a.fichier === fichier));
  if (!connu) return new Response("Introuvable", { status: 404 });

  return new Response(null, {
    status: 302,
    headers: { Location: await lienSigne(`${slug}/${fichier}`), "Cache-Control": "private, no-store" },
  });
}
