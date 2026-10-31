import type { Metadata } from "next";
import EnTete from "@/components/EnTete";
import FormulaireContact from "@/components/FormulaireContact";
import PiedDePage from "@/components/PiedDePage";
import { metaPage } from "@/lib/site";

export const metadata: Metadata = metaPage({
  titre: "Contact · HypnoMorphosis",
  description: "Une question sur une expérience HypnoMorphosis ou sur votre compte ? Écrivez à Bérénice grâce au formulaire de contact.",
  chemin: "/contact",
});

export default function Contact() {
  return (
    <>
      <EnTete />
      <main>
        <section className="contact-tete grain">
          <div className="wrap">
            <span className="caps">Contact</span>
            <h1>Une question&nbsp;?</h1>
            <p>Écrivez-moi, je vous réponds personnellement.</p>
          </div>
        </section>
        <section className="wrap contact-corps">
          <FormulaireContact />
        </section>
      </main>
      <PiedDePage />
    </>
  );
}
