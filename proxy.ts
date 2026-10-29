import { clerkMiddleware } from "@clerk/nextjs/server";

// Pose seulement le contexte d'authentification que lisent auth() et currentUser().
// Aucune route n'est protégée ici : chaque page privée se garde elle-même avec
// auth.protect() (même choix que Set et Brique, la protection par motif d'URL
// étant dépréciée par Clerk).
// signInUrl côté serveur : sans lui, auth.protect() renvoie vers la page hébergée par Clerk
// et non vers /connexion (le réglage du ClerkProvider ne vaut que dans le navigateur)
export default clerkMiddleware({ signInUrl: "/connexion", signUpUrl: "/inscription" });

export const config = {
  matcher: [
    // tout sauf les fichiers statiques et les internals Next.js
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp3|pdf))(?:.*)|api|trpc)(.*)",
  ],
};
