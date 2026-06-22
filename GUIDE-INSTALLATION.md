# Site ACCA d'Herbeys — Guide de mise en ligne (Bloc 1)

Ce dossier contient le **squelette du site** : toutes les pages publiques, le bandeau
d'accueil modifiable, et la connexion à trois niveaux (adhérent / bureau / admin).
À ce stade, les contenus sont encore dans le code et les codes d'accès sont provisoires.
Le branchement à Firebase (édition en ligne, documents, sauvegarde) viendra au **Bloc 2**.

Codes provisoires : `ADHERENT26` · `BUREAU26` · `ADMIN26`

---

## Ce dont tu as besoin
- Le compte Google de l'association (acca-herbeys@chasse38.org)
- Un compte GitHub et un compte Vercel, créés avec cette adresse (déjà fait)
- Ton Mac, un navigateur. **Aucune installation requise.**

---

## Étape 1 — Créer le dépôt sur GitHub

1. Va sur https://github.com et connecte-toi avec le compte de l'association.
2. En haut à droite, clique sur **+** puis **New repository**.
3. Nom du dépôt : `acca-herbeys`. Laisse-le en **Public** (ou Private, au choix).
   Ne coche rien d'autre. Clique **Create repository**.

## Étape 2 — Envoyer les fichiers

Le plus simple sur Mac, sans rien installer :

1. Sur la page du dépôt vide, clique sur le lien **uploading an existing file**
   (ou bouton **Add file ▸ Upload files**).
2. Ouvre ce dossier sur ton Mac dans le Finder.
3. **Sélectionne tout le contenu du dossier** (Cmd+A) — fichiers ET sous-dossiers
   (`public`, `src`, `index.html`, `package.json`, etc.) — puis glisse-les dans la
   zone de dépôt de GitHub.
   - ⚠️ N'envoie PAS le dossier `node_modules` (il n'est pas dans le ZIP, c'est normal).
4. En bas, clique **Commit changes**.

## Étape 3 — Déployer sur Vercel

1. Va sur https://vercel.com et connecte-toi (compte de l'association).
2. Clique **Add New… ▸ Project**.
3. Vercel affiche tes dépôts GitHub. À côté de `acca-herbeys`, clique **Import**.
   - Si le dépôt n'apparaît pas, clique **Adjust GitHub App Permissions** et autorise Vercel
     à accéder au dépôt.
4. Vercel détecte automatiquement **Vite**. Ne change rien. Clique **Deploy**.
5. Patiente ~1 minute. Quand c'est fini, tu obtiens une adresse du type
   `https://acca-herbeys.vercel.app`. Clique dessus : le site est en ligne ! 🎉

## Étape 4 — Vérifier

- Le site s'affiche, le logo est en haut, les pages fonctionnent (menu).
- Le bandeau d'hommage à Marc Mure apparaît en page d'accueil.
- Clique **Connexion**, saisis `ADMIN26` : tu accèdes à l'espace admin, où tu peux
  déjà tester l'édition du bandeau et la publication d'une actualité (non sauvegardée
  pour l'instant — ce sera le rôle de Firebase au Bloc 2).
- Ouvre le site sur ton téléphone : il s'adapte à l'écran.

---

## Mises à jour futures

Quand on aura le Bloc 2, tu remplaceras simplement les fichiers modifiés dans GitHub
(Add file ▸ Upload files, ou en éditant directement) : **Vercel redéploie tout seul**
à chaque changement. Tu n'auras jamais à refaire les étapes 1 et 3.

## Notes
- Le fichier `node_modules` n'est pas fourni : Vercel le reconstruit automatiquement.
- Pour changer l'adresse du site ou brancher un nom de domaine : Vercel ▸ projet ▸
  Settings ▸ Domains.
- Les codes d'accès deviendront modifiables en ligne (espace admin) au Bloc 2.
