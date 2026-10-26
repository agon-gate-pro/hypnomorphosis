# HypnoMorphosis · Fonctionnement technique

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- pnpm
- Hébergement : Vercel (projet `hypnomorphosis`, équipe Agon-gate), déploiement automatique depuis GitHub (`agon-gate-pro/hypnomorphosis`, branche `main`)

## Structure

- `app/` : pages et layout (App Router)
- `public/` : fichiers statiques
- `docs/` : documentation du projet

## Décisions

- 2026-10-25 : création du projet sur le modèle de Set et Brique (même stack, même organisation GitHub, même équipe Vercel). Page d'accueil vide pour le moment.

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
