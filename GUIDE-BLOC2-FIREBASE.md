# Bloc 2 — Firebase (sauvegarde et édition en ligne)

Le code est maintenant branché à ta base Firebase `site-acca-herbeys`. Une fois déployé,
le contenu (bandeau, actualités, tir d'été, codes) sera **chargé depuis la base** et
**sauvegardé** quand le bureau ou l'admin le modifie. Fini les modifications qui
disparaissent au rafraîchissement.

## Ce qui a changé dans le projet
- Nouveau fichier `src/firebase.js` (ta configuration).
- Nouveau fichier `src/donnees.js` (lecture / écriture).
- `src/App.jsx` mis à jour (chargement au démarrage + sauvegarde).
- `firebase` ajouté aux dépendances (Vercel l'installe tout seul).

## Étape A — Mettre les fichiers à jour sur GitHub
Remplace / ajoute ces fichiers dans ton dépôt (via Add file ▸ Upload files, ou le crayon) :
- `src/firebase.js` (nouveau)
- `src/donnees.js` (nouveau)
- `src/App.jsx` (remplace l'ancien)
- `package.json` (remplace : il contient maintenant la ligne "firebase")

Vercel redéploie automatiquement. ⚠️ Au premier chargement, le site va **créer
automatiquement** le contenu de départ dans Firestore (bandeau d'hommage, etc.).

## Étape B — Régler les règles de sécurité Firestore (IMPORTANT)
En mode production, Firestore bloque tout par défaut. Il faut autoriser la lecture
publique et l'écriture du document de contenu.

1. Console Firebase ▸ Firestore Database ▸ onglet **Règles** (Rules).
2. Remplace tout par ceci, puis clique **Publier** :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Le contenu du site : lisible par tous, modifiable par tous.
    // (La protection se fait par les codes d'accès dans l'application.)
    match /site/{document} {
      allow read: true;
      allow write: true;
    }
    // Tout le reste est interdit.
    match /{document=**} {
      allow read, write: false;
    }
  }
}
```

### ⚠️ Note de sécurité honnête
Ces règles autorisent l'écriture à quiconque (la protection réelle est le code d'accès
de l'application). Pour un site d'ACCA — actualités, dates, bandeau — c'est un risque
faible et acceptable, mais pas une sécurité « forte » : quelqu'un de très motivé et
technicien pourrait théoriquement écrire dans la base sans passer par l'application.
Pour la majorité des associations c'est suffisant. Si on veut un jour une vraie
sécurité, on ajoutera l'authentification Firebase (étape ultérieure, plus complexe).
**Ne mets jamais d'information vraiment sensible dans cette base** (ex. données
personnelles détaillées des adhérents).

## Étape C — Vérifier
1. Va sur ton site, connecte-toi en admin.
2. Modifie le bandeau (titre ou texte) ▸ « Enregistrer le bandeau » ▸ « Enregistré ✓ ».
3. **Rafraîchis la page** : la modification est toujours là ✅ (avant, elle disparaissait).
4. Teste aussi : publier une actu, changer un code (puis se reconnecter avec le nouveau).
5. Dans la console Firebase ▸ Firestore Database ▸ Données, tu verras le document
   `site/contenu` avec tout dedans.

## Prochaines étapes (blocs suivants)
- **Documents** : activer Firebase Storage (plan Blaze + carte) pour les PDF (PV, statuts, RIC).
- **Photos locales** : remplacer les images Wix par celles téléchargées.
- **Messages reçus** : enregistrer les demandes du formulaire de contact dans la base.
