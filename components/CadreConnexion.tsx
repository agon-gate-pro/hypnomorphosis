import type { ReactNode } from "react";
import Image from "next/image";
import EnTete from "@/components/EnTete";
import GardeClerk from "@/components/GardeClerk";

/**
 * Écran partagé par la connexion et l'inscription : à gauche la couverture de l'expérience découverte
 * (masquée sur téléphone), à droite le formulaire Clerk sur le papier. Le titre de la page est celui
 * du formulaire Clerk, réglé dans les textes de app/layout.tsx.
 */
export default function CadreConnexion({ children }: { children: ReactNode }) {
  return (
    <>
      <EnTete />
      <main className="acces-page grain">
        <div className="acces-cadre">
          <aside className="acces-visuel" aria-hidden="true">
            <Image src="/images/couverture-decouverte.jpg" alt="" fill sizes="(max-width: 900px) 0px, 480px" priority />
            <div className="boussole" />
            <div className="acces-mots">
              <span className="caps">Mon espace HypnoMorphosis</span>
              <p>Vos carnets, vos audios et votre carnet en ligne, réunis au même endroit.</p>
            </div>
          </aside>
          <div className="acces-formulaire">
            <Image className="acces-embleme" src="/logo/hypnomorphosis-embleme.svg" alt="" width={56} height={56} />
            <GardeClerk>{children}</GardeClerk>
          </div>
        </div>
      </main>
    </>
  );
}
