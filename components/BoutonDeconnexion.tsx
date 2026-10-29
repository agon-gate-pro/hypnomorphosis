"use client";

import { SignOutButton } from "@clerk/nextjs";

// SignOutButton attend un seul enfant cliquable ; la redirection après déconnexion (accueil) est réglée dans app/layout.tsx
export default function BoutonDeconnexion({ className }: { className?: string }) {
  return (
    <SignOutButton>
      <button type="button" className={className}>Se déconnecter</button>
    </SignOutButton>
  );
}
