# HypnoMorphosis · Avancement

## Journal

- 2026-10-25 : création du dépôt GitHub et du projet Vercel. Squelette Next.js avec une page vide.
- 2026-10-26 : outils Claude Code partagés dans le dépôt (MCP Playwright et Context7, plugin frontend-design, skills Clerk, Neon, Stripe et web-design-guidelines). Branche `outils-claude`.
- 2026-10-26 : test des outils depuis le dossier du projet. MCP Playwright (captures mobile et PC d'agon-gate.com) et Context7 chargés, 7 skills présents. Plugin `frontend-design` absent de la session : installation manuelle via `/plugin` documentée. Dossier de sortie `.playwright-mcp/` ajouté au `.gitignore`.
- 2026-10-26 : nouvelle vérification complète avant la spécification. Playwright (capture de hypnomorphosis.vercel.app, fichiers bien ignorés par Git), Context7 (documentation Next.js 16.2.9), plugin `frontend-design` chargé, 7 skills du dépôt détectés et complets. Seule erreur relevée sur le site : `favicon.ico` absent (404), à traiter avec la charte graphique.
- 2026-10-26 : branche `outils-claude` fusionnée dans `main`. Branche `specification` : brief de Bérénice ajouté (`docs/SITE INTERNET.pdf`) et spécification fonctionnelle rédigée (`docs/specification-fonctionnelle.md`), avec 18 questions pour Bérénice.
- 2026-10-26 : mail envoyé à Bérénice par Alexis : compréhension du projet à valider, lien vers set-et-brique.com en exemple, renonciation au droit de rétractation, fourchette de tarif (abonnement mensuel, nom de domaine à part), 11 questions (expérience découverte, déblocage jour par jour, exercices en ligne, administration, e-mails automatiques, date de lancement, logo et photos, Stripe, statut, TVA, ventes hors de France). En attente de sa réponse ou d'un appel. Les prochains échanges partent de contact@agon-gate.com.
- 2026-10-26 : plugin maison `agon-gate` (marketplace privée `agon-gate-pro/agon-gate-outils`) ajouté aux réglages du projet, pour qu'il soit proposé sur chaque poste. Installé et chargé sur le poste d'Alexis. Branche `plugin-agon-gate`.

## État par module

| Module | État |
| --- | --- |
| Socle technique (Next.js, Tailwind, Vercel) | Fait |
| Spécification fonctionnelle | Brouillon rédigé, à valider avec Bérénice |
| Page d'accueil | Vide, à concevoir |
| Outils Claude Code | Testés et fusionnés dans `main` : MCP et skills OK, plugins `frontend-design` et `agon-gate` installés sur le poste d'Alexis (à installer une fois par poste) |

## Questions ouvertes

- Questions pour Bérénice : voir la section 13 de `docs/specification-fonctionnelle.md` (logo, photos, déblocage jour par jour, engagement à signer, administration, statut juridique, domaine, CGV).
- Devis : à établir une fois la spécification validée.
