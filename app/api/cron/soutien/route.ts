import { envoyerSoutiens } from "@/lib/email/automatiques";

// Tâche planifiée Vercel (vercel.json, chaque matin) : mots de soutien quinze jours après l'achat.
// Vercel signe l'appel avec CRON_SECRET ; sans ce secret, la route refuse tout.
export async function GET(requete: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || requete.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ erreur: "Non autorisé" }, { status: 401 });
  }
  const envoyes = await envoyerSoutiens();
  return Response.json({ envoyes });
}
