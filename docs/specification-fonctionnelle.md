# HypnoMorphosis · Spécification fonctionnelle

Source : brief de Bérénice, `docs/SITE INTERNET.pdf` (octobre 2026). Les textes du site (accueil, fiches produits, à propos) sont dans le PDF et seront repris tels quels, après correction orthographique. Ce document décrit ce que le site doit faire ; les questions encore ouvertes sont regroupées à la fin.

Rédigé le 2026-10-26. Statut : brouillon, à valider avec Bérénice.

## 1. Le projet

HypnoMorphosis est une marque et un univers autour de l'hypnose et de la transformation personnelle, porté par Bérénice (ancienne infirmière urgentiste, hypnothérapeute). Le site présente un univers, pas un cabinet. Son activité principale est la vente en ligne d'« expériences » : des parcours de plusieurs jours avec un carnet PDF, des exercices et des audios d'hypnose.

- Nom : HypnoMorphosis (le PDF écrit parfois « HypnoMophosis », c'est une coquille)
- Sous-titre : « Ouvrir le champ de tes possibles »
- Ton visuel : vert et blanc beige, matières naturelles, tons et lumière chauds, élégant, accueillant, haut de gamme sans être froid
- À éviter : toute image ésotérique ou spirituelle

## 2. Parcours visé

Visiteur → découverte d'HypnoMorphosis → expérience gratuite → boutique → achat → réception automatique du contenu → nouvelles expériences.

L'architecture doit permettre d'ajouter de nouvelles expériences sans refaire le site.

## 3. Pages

| Page | Contenu |
| --- | --- |
| Accueil | Logo, sous-titre, texte d'introduction, mise en avant de l'expérience découverte gratuite, bloc réseaux sociaux (ou dans le pied de page si l'accueil est trop chargé). Page épurée. |
| Expérience découverte | Présentation des 5 jours, ce qu'elle contient, bouton « Je découvre HypnoMorphosis gratuitement ». |
| Boutique | Les expériences en vignettes : photo, titre, sous-titre, prix. Filtrable par catégorie quand il y en aura assez. |
| Fiche expérience (une par produit) | Présentation commerciale, « Votre expérience en un coup d'œil », « Comment cela fonctionne ? », prix, bouton d'achat. |
| À propos | Texte de Bérénice (fourni dans le PDF). |
| Espace client | Connexion, liste des expériences achetées, accès aux contenus. |
| Pages légales | Mentions légales, CGV, politique de confidentialité, informations sur le paiement et la vente en ligne. |

Le menu principal regrouperait : Accueil, Les expériences (boutique), Expérience découverte, À propos, Mon espace.

## 4. Les expériences

### Catégories

Trois catégories, chacune avec un texte de présentation fourni :

- **Universelles** : mécanismes humains partagés par tous
- **Miroir** : situations de vie particulières
- **Grandes expériences** : thèmes demandant plus de temps et d'introspection (aucun produit au lancement)

### Contenu d'une expérience

- un carnet PDF à imprimer
- des audios d'hypnose guidés
- des exercices d'introspection, un par jour
- une durée en jours

### Produits au lancement

| Expérience | Catégorie | Sous-titre (boutique) | Durée | Contenu | Prix |
| --- | --- | --- | --- | --- | --- |
| Le Nœud | Universelle | 21 jours pour dénouer, comprendre et se reconnecter à soi | 21 jours | carnet de 59 pages, 5 audios, 21 exercices | 49 € |
| Après nous | Miroir | 21 jours pour revenir à soi après une séparation | 21 jours | carnet (nombre de pages à fournir), 5 audios, 21 exercices | 49 € |
| Expérience découverte | (aucune) | 5 jours pour ouvrir le champ de tes possibles | 5 jours | 2 audios, 1 ordalie, 5 exercices, 1 engagement à signer | Gratuit |

### Évolutions prévues

Le catalogue doit pouvoir accueillir plus tard : de nouvelles expériences, des packs, des offres groupées et des promotions. Concrètement, une expérience est une fiche en base de données (titre, catégorie, textes, durée, prix, visuel, fichiers) et non une page codée à la main. Les packs et les promotions s'appuieront sur les fonctions de Stripe (lots de produits, codes promo).

## 5. Achat et accès automatique

1. Le client clique sur « Acheter » depuis une fiche expérience.
2. Il paie sur la page de paiement sécurisée Stripe (carte bancaire, Apple Pay, Google Pay).
3. Avant de payer, il coche la case obligatoire de renonciation au droit de rétractation (contenu numérique fourni immédiatement, article L221-28 du Code de la consommation).
4. Le paiement confirmé, le site crée son compte s'il n'en a pas et lui ouvre l'accès à l'expérience.
5. Il reçoit un e-mail de confirmation avec le lien vers son espace et sa facture.

Tout se fait sans intervention de Bérénice.

## 6. Expérience découverte gratuite

Le visiteur s'inscrit avec son e-mail (création de compte), puis accède à l'expérience dans son espace client, comme pour une expérience payante. C'est aussi la porte d'entrée pour constituer une liste de contacts, si Bérénice le souhaite et avec le consentement des personnes.

## 7. Espace client

- Connexion par e-mail (lien ou code de connexion, sans mot de passe à retenir), éventuellement avec Google
- Liste des expériences achetées ou ouvertes
- Pour chaque expérience : téléchargement du carnet PDF, écoute des audios dans le navigateur, exercices du jour
- Les fichiers ne sont accessibles qu'aux personnes connectées qui y ont droit

## 8. Gestion par Bérénice

Point à trancher (voir questions) : soit Bérénice dispose d'une interface d'administration pour ajouter ses expériences, téléverser ses fichiers, voir ses ventes et ses clients ; soit Agon Gate ajoute les expériences à sa demande. Les ventes et les remboursements restent consultables dans le tableau de bord Stripe dans les deux cas.

## 9. Pages légales et obligations

- Mentions légales : identité de Bérénice, statut, SIRET, hébergeur (Vercel)
- CGV de vente de contenus numériques, avec la renonciation au droit de rétractation
- Politique de confidentialité (RGPD) : données collectées, durée de conservation, droits des personnes
- Bandeau cookies seulement si des outils de mesure d'audience non exemptés sont ajoutés
- Avertissement recommandé : les expériences ne remplacent pas un avis ou un traitement médical ou psychologique

## 10. Réseaux sociaux

Liens vers TikTok, Instagram et YouTube, sur l'accueil avec le texte fourni, ou dans le pied de page. Adresses des comptes à fournir.

## 11. Choix techniques proposés

Même socle que Set et Brique, déjà maîtrisé par Agon Gate :

| Besoin | Outil |
| --- | --- |
| Site | Next.js sur Vercel (déjà en place) |
| Comptes clients | Clerk |
| Base de données (expériences, achats, accès) | Neon Postgres |
| Paiement, factures, codes promo | Stripe Checkout |
| E-mails automatiques | Resend |
| Stockage des carnets PDF et audios | Vercel Blob, accès protégé |

## 12. Hors périmètre (sauf demande)

- Prise de rendez-vous en cabinet
- Abonnements
- Application mobile
- Blog

## 13. Questions pour Bérénice

**Contenus et identité**
1. Le logo existe-t-il ? Sous quels formats ?
2. Les photos évoquées (« cf photos ») : pouvez-vous nous les envoyer, avec celles de chaque expérience ?
3. Le sous-titre tutoie (« tes possibles ») alors que le reste du site vouvoie : est-ce voulu ?
4. Nombre de pages du carnet d'Après nous.
5. Les adresses de vos comptes TikTok, Instagram et YouTube.

**Fonctionnement des expériences**

6. Les contenus doivent-ils s'ouvrir jour après jour (jour 2 accessible le lendemain), ou tout est-il disponible dès l'achat ?
7. L'accès est-il permanent, ou limité dans le temps ?
8. L'« engagement à signer » : une case à cocher et un nom saisi dans l'espace suffisent-ils, ou souhaitez-vous un document signé ?
9. Les exercices : le client les fait-il seulement sur le carnet imprimé, ou doit-il pouvoir écrire ses réponses sur le site ?
10. Les audios : écoute en ligne uniquement, ou aussi téléchargement ?

**Expérience gratuite et contacts**

11. Pour l'expérience découverte, souhaitez-vous constituer une liste d'abonnés (newsletter) ? Avec quel outil, si vous en utilisez déjà un ?
12. Souhaitez-vous des e-mails automatiques pendant l'expérience (rappel de l'exercice du jour, par exemple) ?

**Vente et gestion**

13. E-mail de bienvenue après l'achat : oui, et avez-vous un texte en tête ?
14. Préférez-vous ajouter vous-même vos expériences (interface d'administration), ou nous les confier ?
15. Statut juridique, SIRET, TVA (franchise en base ou non) : nécessaires pour les factures et les mentions légales.
16. Avez-vous déjà un compte Stripe ?
17. Nom de domaine : en avez-vous déjà un (hypnomorphosis.fr, .com) ?
18. Qui rédige les CGV et la politique de confidentialité : vous, un juriste, ou une base que nous proposons et que vous faites valider ?
