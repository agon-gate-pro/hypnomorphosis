import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import CadreConnexion from "@/components/CadreConnexion";

export const metadata: Metadata = { title: "Connexion · HypnoMorphosis", robots: { index: false } };

export default function Connexion() {
  return (
    <CadreConnexion>
      <SignIn />
    </CadreConnexion>
  );
}
