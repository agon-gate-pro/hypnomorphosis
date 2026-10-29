"use client";

import { UserProfile } from "@clerk/nextjs";

// Le cadre de Clerk a une hauteur fixe avec défilement interne : on le laisse prendre la hauteur
// de son contenu et toute la largeur disponible (même réglage que Set et Brique).
export default function PanneauCompte() {
  return (
    <UserProfile
      path="/espace/compte"
      routing="path"
      appearance={{
        elements: {
          rootBox: { width: "100%" },
          cardBox: { width: "100%", maxWidth: "none", height: "auto", maxHeight: "none", boxShadow: "0 22px 40px -32px rgba(40,40,25,.5)", border: "1px solid #e3dfd2" },
          scrollBox: { height: "auto", maxHeight: "none" },
          pageScrollBox: { height: "auto", maxHeight: "none" },
        },
      }}
    />
  );
}
