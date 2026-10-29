import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import EnTete from "@/components/EnTete";
import GardeClerk from "@/components/GardeClerk";
import PanneauCompte from "./PanneauCompte";

export const metadata: Metadata = { title: "Mon compte · HypnoMorphosis", robots: { index: false } };

// Gestion du compte : l'écran de Clerk (prénom, e-mail, compte Google lié, appareils connectés, suppression).
export default async function Compte() {
  await auth.protect();
  return (
    <>
      <EnTete />
      <main className="compte grain">
        <div className="wrap">
          <Link className="retour" href="/espace">← Retour à mon espace</Link>
          <h1>Mon compte</h1>
          <GardeClerk>
            <PanneauCompte />
          </GardeClerk>
        </div>
      </main>
    </>
  );
}
