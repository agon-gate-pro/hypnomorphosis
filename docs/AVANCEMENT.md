# HypnoMorphosis · Avancement

## Journal

- 2026-10-25 : création du dépôt GitHub et du projet Vercel. Squelette Next.js avec une page vide.
- 2026-10-26 : outils Claude Code partagés dans le dépôt (MCP Playwright et Context7, plugin frontend-design, skills Clerk, Neon, Stripe et web-design-guidelines). Branche `outils-claude`.
- 2026-10-26 : test des outils depuis le dossier du projet. MCP Playwright (captures mobile et PC d'agon-gate.com) et Context7 chargés, 7 skills présents. Plugin `frontend-design` absent de la session : installation manuelle via `/plugin` documentée. Dossier de sortie `.playwright-mcp/` ajouté au `.gitignore`.
- 2026-10-26 : nouvelle vérification complète avant la spécification. Playwright (capture de hypnomorphosis.vercel.app, fichiers bien ignorés par Git), Context7 (documentation Next.js 16.2.9), plugin `frontend-design` chargé, 7 skills du dépôt détectés et complets. Seule erreur relevée sur le site : `favicon.ico` absent (404), à traiter avec la charte graphique.
- 2026-10-26 : branche `outils-claude` fusionnée dans `main`. Branche `specification` : brief de Bérénice ajouté (`docs/SITE INTERNET.pdf`) et spécification fonctionnelle rédigée (`docs/specification-fonctionnelle.md`), avec 18 questions pour Bérénice.
- 2026-10-26 : mail envoyé à Bérénice par Alexis : compréhension du projet à valider, lien vers set-et-brique.com en exemple, renonciation au droit de rétractation, fourchette de tarif (abonnement mensuel, nom de domaine à part), 11 questions (expérience découverte, déblocage jour par jour, exercices en ligne, administration, e-mails automatiques, date de lancement, logo et photos, Stripe, statut, TVA, ventes hors de France). En attente de sa réponse ou d'un appel. Les prochains échanges partent de contact@agon-gate.com.
- 2026-10-26 : plugin maison `agon-gate` (marketplace privée `agon-gate-pro/agon-gate-outils`) ajouté aux réglages du projet, pour qu'il soit proposé sur chaque poste. Installé et chargé sur le poste d'Alexis. Branche `plugin-agon-gate`.
- 2026-10-26 : réponse de Bérénice reçue (`docs/Echange Mail 01.txt`), avec le carnet de l'expérience découverte (`docs/HYPNOMORPHOSIS.pdf`), 4 versions de son logo et sa photo. Spécification mise à jour : accès complet dès le premier jour, carnet en PDF à imprimer et carnet en ligne où le client écrit ses réponses aux exercices (réponse à la question sur les exercices du premier mail), ajouts d'expériences, packs et promotions faits par Agon Gate (pas d'interface d'administration), e-mails automatiques et annonces avec consentement, compte Stripe existant, clientèle francophone internationale, activité rattachée à une société espagnole (TVA et mentions légales à voir avec Cédric). Nouvelle section sur l'identité visuelle et les éléments fournis ; 18 questions restantes.
- 2026-10-26 : trois pistes de direction artistique préparées (`docs/direction-artistique.html`, à ouvrir dans un navigateur) : « Lumière de garrigue » (photos nature dorées), « Le carnet » (papier, encre olive, phrases d'impulsion), « Le jardin intérieur » (aplats olive profond, doré). Choix à faire avec Alexis, puis maquette de l'accueil.
- 2026-10-26 : Alexis retient un mélange des pistes 1 et 2 (la piste 2 seule risquait de paraître vide, et les belles photos sont difficiles à trouver). Maquette de la page d'accueil (`docs/maquette-accueil.html`) : structure « carnet », logo en grand dans l'ouverture (bloc doré abandonné à la demande d'Alexis ; fond blanc du JPG rendu transparent par un filtre SVG en attendant le fichier SVG d'origine), expériences en couvertures de carnet, jours de l'expérience découverte, aperçu du carnet en ligne, portrait de Bérénice, pied de page olive foncé. Vérifiée sur PC et mobile. Avis d'Alexis en attente.
- 2026-10-26 : maquette d'accueil réalignée sur le brief de Bérénice pour pouvoir la lui montrer : ses textes mot pour mot (introduction, bloc expérience découverte avec ses 4 points, bloc réseaux sociaux, « Retrouvez HypnoMorphosis » en pied de page), « Ouvrir le champ de tes possibles », ordre du brief (logo, slogan, découverte), sections inventées retirées (phrase d'impulsion, « Comment ça se vit »). Ajouts d'Agon Gate signalés par une étiquette « Proposition » : aperçu des expériences, carnet en ligne, lien vers À propos avec sa phrase « L'hypnose, ça sert à rien et pourtant ça change tout ».

## État par module

| Module | État |
| --- | --- |
| Socle technique (Next.js, Tailwind, Vercel) | Fait |
| Spécification fonctionnelle | Mise à jour avec les réponses de Bérénice, à valider avec elle |
| Direction artistique | Mélange pistes 1 et 2 retenu, maquette d'accueil alignée sur le brief (`docs/maquette-accueil.html`), prête à montrer à Bérénice |
| Page d'accueil | Vide, à concevoir |
| Outils Claude Code | Testés et fusionnés dans `main` : MCP et skills OK, plugins `frontend-design` et `agon-gate` installés sur le poste d'Alexis (à installer une fois par poste) |

## Questions ouvertes

- Questions pour Bérénice : voir la section 13 de `docs/specification-fonctionnelle.md` (logo en SVG et version officielle, droits de la photo de couverture, tutoiement ou vouvoiement, carnet en ligne et exercices de dessin, accès de Bérénice aux réponses, accès permanent, téléchargement des audios, société espagnole et TVA, domaine, CGV).
- Fichiers du logo : les versions « transparentes » sont des JPG avec un damier dessiné, inutilisables sur fond coloré. Fichier d'origine demandé.
- Audios de l'expérience découverte : liens à recevoir de Bérénice. À stocker hors Git.
- Devis : à établir une fois la spécification validée.
