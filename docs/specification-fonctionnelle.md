# HypnoMorphosis · Spécification fonctionnelle

Sources :

- brief de Bérénice, `docs/SITE INTERNET.pdf` (octobre 2026) : les textes du site (accueil, fiches produits, à propos) y sont fournis et seront repris tels quels, après correction orthographique ;
- sa réponse au premier mail d'Agon Gate, `docs/Echange Mail 01.txt` (2026-10-26) ;
- le carnet de l'expérience découverte, `docs/HYPNOMORPHOSIS.pdf`, son logo et sa photo (voir section 10).

Ce document décrit ce que le site doit faire ; les questions encore ouvertes sont regroupées à la fin.

Rédigé le 2026-10-26, mis à jour le même jour puis le 2026-10-27 avec les réponses de Bérénice. Statut : brouillon, à valider avec Bérénice.

## 1. Le projet

HypnoMorphosis est une marque et un univers de transformation personnelle accessible à distance, porté par Bérénice (ancienne infirmière urgentiste, hypnothérapeute). Son activité principale est la vente en ligne d'« expériences » : des parcours guidés de plusieurs jours associant un carnet et des audios d'hypnose.

- Nom : HypnoMorphosis (le PDF écrit parfois « HypnoMophosis », c'est une coquille)
- Sous-titre : « Ouvrir le champ de tes possibles »
- Clientèle : les francophones, quel que soit leur pays de résidence
- Lancement : pas de date imposée. L'expérience découverte et Le Nœud sont prêts, Après nous est en cours d'écriture. Bérénice souhaite ouvrir dès que la partie technique est prête.

### Ce que le site doit être, et ne pas être

- **Pas un site de présentation de cabinet d'hypnose.** C'est la demande la plus forte de Bérénice.
- Les visiteurs découvrent d'abord les expériences, comprennent ce qu'elles peuvent leur apporter et ont envie de se lancer.
- Professionnel, moderne, qualitatif, avec une véritable identité visuelle.
- Ton visuel : vert et blanc beige, matières naturelles, tons et lumière chauds, élégant, accueillant, haut de gamme sans être froid.
- À éviter : toute image ésotérique ou spirituelle.

## 2. Parcours visé

Réseaux sociaux (TikTok, Instagram) ou visiteur → découverte d'HypnoMorphosis → expérience découverte gratuite → boutique → achat → accès automatique au contenu → e-mails annonçant les nouvelles expériences.

L'architecture doit permettre d'ajouter de nouvelles expériences sans refaire le site.

## 3. Pages

| Page | Contenu |
| --- | --- |
| Accueil | Logo, sous-titre, texte d'introduction, mise en avant de l'expérience découverte gratuite (avec la couverture de son carnet, sans les titres des jours), aperçu de la boutique avec les couvertures des carnets, lien vers À propos, bloc réseaux sociaux. Page épurée, avec un peu de mouvement pour attirer vers l'expérience gratuite. Maquette retenue : `docs/maquette-accueil-1-carnet.html`. |
| Expérience découverte | Présentation des 5 jours, ce qu'elle contient, inscription (« Je découvre HypnoMorphosis gratuitement »). Page vers laquelle renvoient les réseaux sociaux. |
| Boutique | Les expériences en vignettes : couverture du carnet, titre, sous-titre, prix. Filtrable par catégorie quand il y en aura assez. |
| Fiche expérience (une par produit) | Présentation commerciale, « Votre expérience en un coup d'œil », « Comment cela fonctionne ? », prix, bouton d'achat. |
| À propos | Texte de Bérénice (fourni dans le PDF), avec sa photo. |
| Espace client | Connexion, liste des expériences achetées ou ouvertes, accès aux contenus. |
| Pages légales | Mentions légales, CGV, politique de confidentialité, informations sur le paiement et la vente en ligne. |

Le menu principal regrouperait : Accueil, Les expériences (boutique), Expérience découverte, À propos, Mon espace.

## 4. Les expériences

### Catégories

Trois catégories, chacune avec un texte de présentation fourni :

- **Universelles** : mécanismes humains partagés par tous
- **Miroir** : situations de vie particulières
- **Grandes expériences** : thèmes demandant plus de temps et d'introspection (aucun produit au lancement)

### Contenu d'une expérience

Une expérience est un ensemble composé :

- d'un carnet, en deux versions : un **PDF à imprimer** et une **version en ligne**, où le client écrit ses réponses aux exercices directement sur le site (voir section 7) ;
- des audios d'hypnose qui l'accompagnent (environ 15 minutes chacun) ;
- d'exercices d'introspection, un ou plusieurs par jour ;
- d'une durée en jours.

Bérénice a répondu à la question « les exercices se font-ils seulement sur le carnet imprimé, ou aussi sur le site ? » en demandant les deux versions.

**Tout est accessible dès le premier jour**, sans déblocage progressif : certains clients impriment leur carnet dès le départ et avancent à leur rythme.

### Produits au lancement

| Expérience | Catégorie | Sous-titre (boutique) | Durée | Contenu | Prix |
| --- | --- | --- | --- | --- | --- |
| Le Nœud | Universelle | 21 jours pour dénouer, comprendre et se reconnecter à soi | 21 jours | carnet de 59 pages, 5 audios, 21 exercices | 49 € |
| Après nous | Miroir | 21 jours pour revenir à soi après une séparation | 21 jours | carnet (nombre de pages à fournir), 5 audios, 21 exercices | 49 € |
| Expérience découverte | (aucune) | 5 jours pour ouvrir le champ de tes possibles | 5 jours | carnet, 2 audios, 1 ordalie, 5 exercices, 1 engagement | Gratuit |

### Ajout d'expériences, packs et promotions

**C'est Agon Gate qui ajoute les nouvelles expériences sur le site et crée les packs et les promotions**, à la demande de Bérénice, qui préfère se concentrer sur la création des contenus. Il n'y a donc pas d'interface d'administration pour elle au lancement.

Le catalogue reste prévu pour évoluer : une expérience est une fiche en base de données (titre, catégorie, textes, durée, prix, visuel, fichiers) et non une page codée à la main, ce qui rend chaque ajout rapide. Les packs et les promotions s'appuieront sur les fonctions de Stripe (lots de produits, codes promo). Bérénice consulte ses ventes et ses remboursements dans son tableau de bord Stripe.

## 5. Achat et accès automatique

1. Le client clique sur « Acheter » depuis une fiche expérience.
2. Avant de payer, il coche la case obligatoire de renonciation au droit de rétractation (voir ci-dessous).
3. Il paie sur la page de paiement sécurisée Stripe (carte bancaire, Apple Pay, Google Pay), sur le compte Stripe que Bérénice possède déjà.
4. Le paiement confirmé, le site crée son compte s'il n'en a pas et lui ouvre l'accès à l'expérience.
5. Il reçoit un e-mail de confirmation avec un petit mot de bienvenue, le lien vers son espace, sa facture et la confirmation de sa renonciation.

Tout se fait sans intervention de Bérénice.

### Renonciation au droit de rétractation

Validé par Bérénice : le client coche une case pour confirmer qu'il a pris connaissance des conditions et qu'il les accepte.

Un achat en ligne ouvre normalement un délai de 14 jours pour changer d'avis et être remboursé. Les contenus numériques fournis immédiatement en sont exclus, à trois conditions cumulatives. La règle vient d'une directive européenne (2011/83/UE, article 16) : elle est la même en France (article L221-28 13° du Code de la consommation) et en Espagne, où est rattachée l'activité. Si l'une des conditions manque, le client peut se faire rembourser, et le délai passe à 12 mois si l'information sur la rétractation n'a pas été donnée.

1. **Accord exprès avant le paiement** : une case à cocher, jamais cochée par défaut, sans laquelle le bouton de paiement reste inactif. Texte proposé : « Je demande l'accès immédiat à mon expérience et je reconnais perdre mon droit de rétractation dès cet accès. »
2. **Confirmation sur un support durable** : l'e-mail de confirmation d'achat reprend cet accord.
3. **Information dans les CGV** : un article dédié à l'absence de droit de rétractation pour les expériences.

Le site enregistre la date et l'heure de l'accord pour chaque achat, comme preuve en cas de contestation. La page de paiement Stripe ne propose qu'une case d'acceptation des conditions générales : la case de renonciation est donc affichée sur le site, avant l'envoi vers Stripe.

Cette exclusion ne couvre pas tout : un contenu inaccessible ou défectueux reste à remplacer ou à rembourser, et un client peut toujours contester un paiement auprès de sa banque. L'expérience découverte, gratuite, n'est pas concernée.

### Factures et TVA

Une facture est émise automatiquement pour chaque achat : c'est plus simple et plus rassurant pour le client.

- Stripe la génère et l'envoie par e-mail après le paiement (option `invoice_creation` de la page de paiement), avec un PDF téléchargeable. Numérotation continue gérée par Stripe.
- Le lien vers la facture est aussi disponible dans l'espace client.
- Coût : Stripe facture ce service en plus des frais de paiement (petit pourcentage par facture, à vérifier sur la grille tarifaire Stripe au moment de l'activation).

**Point à éclaircir avec Cédric** : l'activité est rattachée à une société en Espagne (celle du mari de Bérénice), pas à une micro-entreprise française. Les mentions de facture et la TVA suivent donc les règles espagnoles et européennes :

- mentions de la société sur la facture (raison sociale, adresse, numéro fiscal, numéro de TVA intracommunautaire) ;
- pour la vente de contenus numériques à des particuliers dans l'Union européenne, la TVA est en principe celle du pays du client au-delà d'un seuil de ventes européennes, avec une déclaration unique possible (guichet OSS) ;
- pour les clients hors Union européenne (Suisse, Canada, etc.), les règles dépendent du pays.

Stripe peut calculer la TVA selon le pays du client (Stripe Tax, payant). Le choix dépend de la situation de la société : à décider avec Cédric ou le comptable de la société, avant d'activer les paiements réels.

## 6. Expérience découverte gratuite

### Son but

Une mini-expérience gratuite qui permet de tester l'approche de Bérénice avant d'acheter une expérience complète : entendre sa voix, découvrir sa façon de travailler et voir comment sont construits ses carnets. C'est aussi la porte d'entrée depuis TikTok et Instagram : Bérénice y renvoie les personnes intéressées plutôt que de leur proposer directement un achat.

### Son contenu (carnet fourni)

- 5 jours, chacun avec un nom : Jour 1 « Je vois », Jour 2 « Je comprends », Jour 3 « J'apprivoise », Jour 4 « Je choisis », Jour 5 « J'ancre »
- 2 audios d'hypnose d'environ 15 minutes : le premier pour les jours 1 à 3, le second pour les jours 4 et 5
- une phrase d'impulsion chaque matin
- une ordalie : un exercice à vivre dans la vie réelle pendant les 5 jours (se séparer d'un objet par jour et répondre à 5 questions). Les consignes sont dans le carnet, le site n'a rien de plus à gérer.
- un retour d'expérience chaque soir, autour d'un fil conducteur : le dessin de son « jardin »
- un engagement final, à dater et signer sur le carnet

### Son fonctionnement proposé

Le visiteur s'inscrit avec son e-mail (création de compte), puis accède à l'expérience dans son espace client, comme pour une expérience payante : carnet à télécharger et audios à écouter. Lors de l'inscription, une case distincte, non cochée par défaut, lui propose de recevoir les annonces de nouvelles expériences et de promotions (voir section 8).

## 7. Espace client

- Connexion par e-mail (lien ou code de connexion, sans mot de passe à retenir), éventuellement avec Google
- Liste des expériences achetées ou ouvertes
- Pour chaque expérience : téléchargement du carnet PDF à imprimer, écoute des audios dans le navigateur, carnet en ligne
- Tout le contenu est disponible dès l'achat
- Les fichiers ne sont accessibles qu'aux personnes connectées qui y ont droit
- Lien vers les factures

### Carnet en ligne

Le carnet est repris sur le site, jour par jour : texte du jour, phrase d'impulsion, audio à écouter, consignes, et un champ de réponse sous chaque question.

- Les réponses sont enregistrées automatiquement dans le compte du client, qui peut s'arrêter et reprendre plus tard, sur n'importe quel appareil.
- Le client peut relire ses réponses à tout moment et les télécharger ou les imprimer (avec les questions).
- Les exercices de dessin (le « jardin » de l'expérience découverte, par exemple) restent sur papier : le site donne la consigne et propose un champ de notes. Envoyer une photo de son dessin est une option possible, à confirmer (question 8).
- Personne d'autre que le client ne lit ses réponses, pas même Bérénice. Si elle souhaite y avoir accès, cela demande l'accord explicite du client (question 9).

Conséquences :

- Le contenu de chaque expérience (textes et questions de chaque jour) doit être saisi dans le site, en plus du PDF. Ce travail est fait par Agon Gate à chaque nouvelle expérience, à partir du carnet fourni par Bérénice : il pèse sur le temps passé et donc sur le tarif de l'abonnement.
- Les réponses sont des confidences (émotions, séparation, histoire personnelle). Elles sont protégées en conséquence : accès réservé au client, mention dans la politique de confidentialité, suppression possible par le client, suppression avec le compte.

## 8. E-mails automatiques

Demandés par Bérénice :

| E-mail | Envoi | Destinataires |
| --- | --- | --- |
| Confirmation d'achat, avec un petit mot de bienvenue | Automatique, après chaque paiement | L'acheteur |
| Accès à l'expérience découverte | Automatique, après l'inscription | L'inscrit |
| Annonce d'une nouvelle expérience | Ponctuel, à la sortie | Les personnes qui ont accepté de recevoir ces e-mails |
| Promotions et packs | Ponctuel | Les personnes qui ont accepté de recevoir ces e-mails |

Les e-mails d'annonce et de promotion sont de la prospection : ils demandent l'accord préalable de la personne (case non cochée par défaut), sauf pour les clients existants à qui l'on propose des expériences similaires, et chaque e-mail contient un lien de désinscription. Les e-mails ponctuels sont rédigés avec Bérénice et envoyés par Agon Gate.

## 9. Pages légales et obligations

- Mentions légales : identité de la société espagnole qui porte l'activité, ses coordonnées et son numéro fiscal, hébergeur (Vercel). Informations à transmettre par Bérénice au moment voulu.
- CGV de vente de contenus numériques, avec l'article sur la renonciation au droit de rétractation (voir section 5)
- Politique de confidentialité (RGPD) : données collectées, durée de conservation, droits des personnes, liste d'envoi des e-mails, réponses du carnet en ligne
- Bandeau cookies seulement si des outils de mesure d'audience non exemptés sont ajoutés
- Avertissement recommandé : les expériences ne remplacent pas un avis ou un traitement médical ou psychologique

## 10. Identité visuelle et éléments fournis

### Reçus

| Élément | Fichier | Remarques |
| --- | --- | --- |
| Logo vert olive sur fond blanc | `docs/1787297365435.jpg` (renvoyé le 2026-10-27 sous le nom `docs/Logo officiel.jpg`, fichier identique) | **Version officielle.** Scarabée ailé dans un cercle de boussole, au trait, avec « HYPNOMORPHOSIS / Ouvrir le champ de tes possibles ». Créé avec Gemini : pas de fichier d'origine |
| Logo vectorisé par Agon Gate | `docs/logo/hypnomorphosis-logo.svg`, `docs/logo/hypnomorphosis-embleme.svg` | Tracé automatique du logo officiel (potrace), même dessin, fond transparent. Logo complet et emblème seul, en vert olive `#555a40` |
| Logo vert olive, faux fond transparent | `docs/1787297506412.jpg` | Le damier est dessiné dans l'image (un JPG ne peut pas être transparent) : inutilisable sur un fond coloré |
| Logo blanc, faux fond transparent | `docs/1787305085342.jpg` | Même problème. Dessin plein, différent de la version au trait |
| Logo blanc sur fond vert sauge | `docs/1787832286697.jpg` | Variante où le corps du scarabée est quadrillé |
| Photo de Bérénice | `docs/Photo_Berenice.jpg` | Selfie, environ 800 px de large, diplômes encadrés en arrière-plan |
| Deuxième photo de Bérénice | `docs/Photo Bérénice 02.jpg` | Photo professionnelle 4200 × 2800, en pied, veste olive, mur blanc, diplômes à droite (recadrage possible). Origine et droits à confirmer |
| Carnet de l'expérience découverte | `docs/HYPNOMORPHOSIS.pdf` | Couverture photo en garrigue (rochers, lavande, lumière dorée), pages blanches, titres en capitales gris-vert, logo en bas de page |
| Couverture de l'expérience découverte | `docs/couverture-decouverte.jpg` | Extraite du PDF (800 × 1301). Image générée avec ChatGPT, utilisable sur le site |
| Couvertures de LE NŒUD et APRÈS NOUS | À venir | Demandées en grand format |
| Audios de l'expérience découverte | Hors dépôt | Bérénice les retravaille (balance gauche-droite voulue, effet hypnotique) et les renvoie en MP3 |

### Remarques pour la direction artistique

- Le logo, la couverture du carnet et le brief convergent vers un univers nature et lumineux : verts olive et sauge, beige pierre, blanc cassé, lumière dorée, capitales fines comme dans le logo, trait fin du logo (cercle, boussole) réutilisable comme motif.
- La métaphore du jardin, centrale dans l'expérience découverte, est une piste d'identité pour le site.
- La photo de Bérénice convient à un portrait de taille modeste sur la page À propos. Les diplômes en arrière-plan évoquent le cabinet qu'elle ne veut pas montrer : un recadrage ou une nouvelle photo serait préférable pour une mise en avant plus grande.
- Les couvertures des carnets sont des images générées avec ChatGPT : les conditions d'OpenAI en laissent l'usage à Bérénice. Une image entièrement générée n'est sans doute pas protégée par le droit d'auteur (pas d'exclusivité), sans conséquence pour le site. Bérénice veut les voir sur l'accueil et dans la boutique : elles apportent le « peps » qui manquait.
- Les photos de l'article de Madame Figaro (https://adresses-incontournables.madame.lefigaro.fr/prendre-soin-soi/berenice-hervet/) appartiennent au photographe ou au magazine : pas de reprise sans accord écrit. Une mention « Vu dans Madame Figaro » avec lien est possible, sur la page À propos.
- Le site vouvoie, y compris le slogan : « Ouvrir le champ de vos possibles ». Le tutoiement reste pour TikTok. Le logo garde son texte d'origine.

## 11. Choix techniques proposés

Même socle que Set et Brique, déjà maîtrisé par Agon Gate :

| Besoin | Outil |
| --- | --- |
| Site | Next.js sur Vercel (déjà en place) |
| Comptes clients | Clerk |
| Base de données (expériences et contenu des carnets, achats, accès, inscrits, réponses des clients) | Neon Postgres |
| Paiement, factures, codes promo | Stripe Checkout, sur le compte Stripe de Bérénice |
| E-mails automatiques et annonces | Resend |
| Stockage des carnets PDF et audios | Vercel Blob, accès protégé (coût du stockage et des téléchargements à vérifier avec Madus) |

## 12. Hors périmètre (sauf demande)

- Prise de rendez-vous en cabinet
- Interface d'administration pour Bérénice (Agon Gate gère les ajouts)
- Déblocage des contenus jour par jour
- Abonnements
- Application mobile
- Blog

## 13. Questions pour Bérénice

Réponses déjà reçues le 2026-10-26 : but de l'expérience découverte et ordalie, accès complet dès le premier jour, carnet à imprimer et carnet en ligne, ajout des expériences par Agon Gate, e-mails automatiques, pas de date de lancement, logo et photo, compte Stripe existant, clientèle francophone internationale, renonciation par case à cocher.

Réponses reçues le 2026-10-27 (`docs/Echange Mail 02.txt`) : proposition d'accueil 1 retenue, questions 1, 2 et 4 ci-dessous, formulation « carnet en ligne », lien vers À propos gardé, titres des jours retirés de l'accueil. Pour les choix techniques et stratégiques, Bérénice s'en remet aux conseils d'Agon Gate.

**Identité et contenus**

1. ~~Logo : fichier d'origine et version officielle ?~~ Répondu : version au trait, faite avec Gemini, pas d'autre fichier. Agon Gate l'a vectorisée.
2. ~~Photo de couverture du carnet ?~~ Répondu : générée avec ChatGPT, utilisable. Fichiers en grand format des trois couvertures demandés.
3. Une deuxième photo est arrivée (`docs/Photo Bérénice 02.jpg`) : d'où vient-elle et peut-on l'utiliser ? Les visuels des expériences sont leurs couvertures.
4. ~~Tutoiement ou vouvoiement ?~~ Répondu : vouvoiement sur le site. Slogan « Ouvrir le champ de vos possibles » à lui faire confirmer.
5. Nombre de pages du carnet d'Après nous.
6. Les adresses de vos comptes TikTok, Instagram et YouTube.

**Fonctionnement des expériences**

7. Carnet en ligne : confirmer la compréhension de la section 7 (le client écrit ses réponses sur le site, en plus du PDF à imprimer).
8. Exercices de dessin : le client doit-il pouvoir envoyer une photo de son dessin dans son carnet en ligne ?
9. Souhaitez-vous pouvoir lire les réponses de vos clients (avec leur accord), ou restent-elles strictement privées ?
10. L'accès est-il permanent, ou limité dans le temps ?
11. Les audios : écoute en ligne uniquement, ou aussi téléchargement ?
12. Souhaitez-vous des e-mails pendant l'expérience (rappel de l'exercice du jour, par exemple) ?
13. Le mot de bienvenue de l'e-mail d'achat : avez-vous un texte en tête ?
14. Utilisez-vous déjà un outil de newsletter ou une liste de contacts à reprendre ?

**Administratif (en attente de Cédric)**

15. Société espagnole : raison sociale, adresse, numéro fiscal, numéro de TVA intracommunautaire. La vente de contenus en ligne entre-t-elle dans son activité ?
16. TVA sur les ventes en ligne aux particuliers de différents pays : qui suit la question (comptable de la société) ?
17. Nom de domaine : quel nom souhaitez-vous (hypnomorphosis.com, .fr) ?
18. Qui rédige les CGV et la politique de confidentialité : vous, un juriste, ou une base que nous proposons et que vous faites valider ?
