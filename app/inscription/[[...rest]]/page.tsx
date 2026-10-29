import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import CadreConnexion from "@/components/CadreConnexion";

export const metadata: Metadata = { title: "Créer mon espace · HypnoMorphosis", robots: { index: false } };

export default function Inscription() {
  return (
    <CadreConnexion>
      <SignUp />
    </CadreConnexion>
  );
}
