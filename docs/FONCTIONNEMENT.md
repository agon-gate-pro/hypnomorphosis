# HypnoMorphosis · Fonctionnement technique

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- pnpm
- Hébergement : Vercel (projet `hypnomorphosis`, équipe Agon-gate), déploiement automatique depuis GitHub (`agon-gate-pro/hypnomorphosis`, branche `main`)

## Structure

- `app/` : pages et layout (App Router)
- `public/` : fichiers statiques
- `docs/` : documentation du projet (`SITE INTERNET.pdf` : brief du client ; `specification-fonctionnelle.md` : ce que le site doit faire ; `Echange Mail 01.txt` et `Echange Mail 02.txt` : réponses de Bérénice ; `HYPNOMORPHOSIS.pdf` : carnet de l'expérience découverte ; logos en JPG, logo vectorisé dans `logo/`, `couverture-decouverte.jpg`, photos de Bérénice, détaillés dans la section 10 de la spécification ; `maquette-accueil-1-carnet.html` : maquette d'accueil retenue)

## Décisions

- 2026-10-25 : création du projet sur le modèle de Set et Brique (même stack, même organisation GitHub, même équipe Vercel). Page d'accueil vide pour le moment.
- 2026-10-26 : stack proposée pour la boutique, à confirmer après validation de la spécification : Clerk (comptes), Neon Postgres (expériences, achats, accès), Stripe Checkout (paiement, codes promo), Resend (e-mails), Vercel Blob en accès protégé (carnets PDF et audios). Les expériences sont des fiches en base, pas des pages codées, pour pouvoir en ajouter sans toucher au code.
- 2026-10-26 : après la réponse de Bérénice. Pas d'interface d'administration : Agon Gate ajoute les expériences, packs et promotions. Tout le contenu d'une expérience est accessible dès l'achat (pas de déblocage jour par jour).  Carnet en ligne : le contenu de chaque carnet (textes et questions par jour) est saisi en base, et les réponses des clients y sont enregistrées, visibles par eux seuls. Paiements sur le compte Stripe existant de Bérénice. Les audios et les carnets des expériences payantes ne sont pas versionnés dans Git : ils iront dans le stockage protégé.
- 2026-10-27 : maquette d'accueil 1 « Le carnet » retenue par Bérénice. Site au vouvoiement (slogan « Ouvrir le champ de vos possibles »). Logo : pas de fichier vectoriel d'origine (créé avec Gemini), donc vectorisé par Agon Gate par tracé automatique (potrace, image agrandie trois fois avant le tracé pour des courbes douces) : `docs/logo/hypnomorphosis-logo.svg` (complet) et `docs/logo/hypnomorphosis-embleme.svg` (emblème seul, cadré et masqué pour exclure le texte). Ces SVG remplacent le JPG filtré dans la maquette et serviront au site. Les couvertures des carnets (images générées avec ChatGPT) servent de visuels à l'expérience découverte et aux expériences de la boutique. Mouvement discret : cercles de boussole qui tournent dans l'ouverture, couverture de l'expérience découverte qui flotte avec un reflet ; coupés si l'appareil demande moins d'animations (`prefers-reduced-motion`).
- 2026-10-27 : finitions de la maquette, à reprendre dans le site. En-tête en verre dépoli (`backdrop-filter`) avec ombre après le haut de page ; `scroll-margin-top` sur les sections pour que les ancres s'arrêtent sous l'en-tête fixe. Menu plein écran sur téléphone, placé hors de l'en-tête (un parent avec `backdrop-filter` enfermerait un élément `position: fixed`), fermé par le bouton, un lien ou Échap. Apparition des blocs au défilement par `IntersectionObserver`, en cascade dans une même rangée ; la classe `js` est posée dans le `<head>` pour que la page reste lisible sans script et sans clignotement. Mention « Vu dans Madame Figaro » (lien, pas de photo reprise). Typographie française dans les textes.

## Outils Claude Code

Partagés par le dépôt : chacun les récupère en ouvrant le projet dans Claude Code (une approbation est demandée la première fois).

| Fichier | Contenu |
| --- | --- |
| `.mcp.json` | Serveurs MCP : Playwright (navigateur piloté, captures et tests de parcours, sur Microsoft Edge) et Context7 (documentation à jour des bibliothèques) |
| `.claude/settings.json` | Plugins `frontend-design` (marketplace officielle Anthropic) et `agon-gate` (outils maison, marketplace privée `agon-gate-pro/agon-gate-outils`) |
| `.claude/skills/` et `skills-lock.json` | Skills Clerk (setup, Next.js, webhooks, API), Neon Postgres, Stripe, web-design-guidelines (Vercel) |

- Les skills sont installés en copies réelles (`npx skills add <source> -s <skill> -a claude-code --copy -y`) : les liens symboliques créés par défaut ne fonctionnent pas sous Windows (constaté sur Set et Brique, où `.claude/skills` contient des fichiers de 38 octets à la place des skills).
- Playwright est lancé via `cmd /c npx`, nécessaire sous Windows. Sur macOS ou Linux, remplacer par `"command": "npx"` et retirer `/c` dans `.claude/settings.local.json` ou un `.mcp.json` local. Le navigateur est Edge (`--browser msedge`), car Chrome n'est pas installé sur le poste d'Alexis.
- Playwright enregistre captures, journaux de console et instantanés de page dans `.playwright-mcp/` à la racine du projet (seul dossier autorisé en écriture, avec la racine). Ce dossier est ignoré par Git.
- Context7 fonctionne sans clé, avec un quota limité. Une clé gratuite (context7.com/dashboard) peut être ajoutée plus tard.
- Le plugin `frontend-design` n'est pas installé automatiquement par `.claude/settings.json` : chacun l'installe une fois sur son poste, soit avec `/plugin` dans une session (accepter la marketplace `claude-plugins-official`, installer `frontend-design`), soit en ligne de commande depuis le dossier du projet : `claude plugin install frontend-design@claude-plugins-official --scope project`. Redémarrer ensuite la session : le skill `frontend-design` apparaît dans la liste des skills.
- Le plugin `agon-gate` apporte les skills `agon-gate:nouveau-projet` (démarrer ou remettre aux normes un projet client) et `agon-gate:livraison` (checklist de mise en ligne). Il est proposé à l'ouverture du projet. Le dépôt de la marketplace étant privé, il faut un accès GitHub à l'organisation `agon-gate-pro`. Installation manuelle si besoin : `claude plugin marketplace add agon-gate-pro/agon-gate-outils` puis `claude plugin install agon-gate@agon-gate-outils`, et redémarrer la session.
