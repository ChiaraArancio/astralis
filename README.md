# Astralis

Site web complet de cartographie céleste et énergétique : **astrologie**, **numérologie pythagoricienne** et **Human Design**.

Ce projet a été développé à partir des maquettes Stitch fournies (« Aetherial Art Deco »). Il ne s’agit pas d’une maquette : les calculateurs, les formulaires, les pages de résultats, la navigation et les tests sont réellement implémentés.

> **État actuel :** les trois calculateurs sont gratuits et fonctionnels. Les cours, l’espace membre et les analyses approfondies affichent honnêtement « Bientôt disponible ». Aucun paiement n’est ouvert, aucun compte utilisateur n’existe, aucune donnée de naissance n’est enregistrée sur un serveur.

---

## 1. Ce que vous recevez

- Une application **React + TypeScript + Vite**.
- Une direction artistique Aetherial Art Deco fidèle aux maquettes : fond crème, espresso, or pâle, lavande, typographie Plus Jakarta Sans, ornements géométriques.
- Trois parcours complets :
  - **Thème astral** : formulaire, calcul réel, roue natale, planètes, maisons Placidus, aspects, mode « heure inconnue » honnête.
  - **Numérologie** : chemin de vie, expression, élan spirituel, personnalité, maturité, année personnelle, grille d’inclusion, interprétations et traces de calcul.
  - **Human Design** : BodyGraph, type, stratégie, autorité, profil, centres, canaux, 26 activations ; heure exacte obligatoire.
- Des pages de résultats dédiées et accessibles par URL.
- Des pages « Comprendre » pour expliquer les méthodes.
- Des pages « Les Cours » et « Mon compte » en état « Bientôt disponible », sans simulation.
- Des pages légales et une page Éthique & méthodologie.
- Un backend léger pour la newsletter (**Resend**) et une fondation **Stripe** désactivée.
- Une configuration **Vercel** avec en-têtes de sécurité et réécriture SPA.
- Des tests automatisés (numérologie, astrologie, Human Design, fuseaux horaires, validation, formulaires, navigation).
- Ce README pas à pas, un `.env.example`, un `.gitignore` et une archive ZIP.

---

## 2. Prérequis sur votre Mac

Vous aurez besoin de :

1. **Node.js 22 LTS** (ou 24 LTS). Node 23 n’est pas recommandé et n’est pas supporté par certains outils de test.
2. **npm** (installé avec Node.js).
3. Un navigateur récent : Chrome, Firefox ou Safari.
4. **Terminal** (application fournie avec macOS).

### Installer Node.js

Deux méthodes possibles.

#### Méthode simple : le site officiel

1. Ouvrez [https://nodejs.org](https://nodejs.org).
2. Téléchargez la version **LTS** (22 ou 24).
3. Ouvrez le fichier `.pkg` téléchargé et suivez l’installation.
4. Ouvrez Terminal et tapez :

```bash
node -v
npm -v
```

Vous devez voir par exemple `v22.14.0` et `10.x.x`. Si le Terminal affiche `command not found`, fermez-le, rouvrez-le et réessayez.

#### Méthode avancée : nvm (facultatif)

Si vous utilisez déjà `nvm`, le projet contient un fichier `.nvmrc` :

```bash
nvm install 22
nvm use
```

---

## 3. Installer et lancer le site

### Étape 1 — Ouvrir le dossier dans le Terminal

Le projet se trouve dans le dossier `Projet_Astralis` sur votre Bureau. Dans Terminal :

```bash
cd ~/Desktop/Projet_Astralis
```

Vérifiez que vous êtes au bon endroit :

```bash
ls
```

Vous devez voir `package.json`, `src`, `README.md`, etc.

### Étape 2 — Installer les dépendances

```bash
npm install
```

Cette commande télécharge les bibliothèques nécessaires. Elle peut prendre une ou deux minutes.

> Si npm affiche une erreur liée aux dépendances de développement, utilisez :
>
> ```bash
> npm install --legacy-peer-deps
> ```
>
> Cette option est parfois nécessaire avec d’anciennes versions de npm. Elle ne change pas le fonctionnement du site.

### Étape 3 — Lancer le site

```bash
npm run dev
```

Le Terminal affiche une adresse du type :

```text
Local: http://localhost:5173/
```

Ouvrez cette adresse dans votre navigateur. **C’est l’adresse à utiliser pour voir le site.**

Pour arrêter le serveur : cliquez dans le Terminal et appuyez sur `Ctrl + C`.

### Étape 4 — Vérifier que tout fonctionne

- La page d’accueil doit afficher les trois cartes.
- Cliquez sur « Découvrir ma numérologie », remplissez le formulaire et vérifiez que la page de résultats s’affiche.
- Faites de même pour le thème astral et le Human Design.
- Les pages « Les Cours » et « Mon compte » doivent afficher « Bientôt disponible ».

---

## 4. Commandes utiles

Toutes les commandes se lancent depuis le dossier du projet.

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lance le site en local sur `http://localhost:5173` |
| `npm run build` | Vérifie TypeScript et construit la version de production dans `dist/` |
| `npm run preview` | Prévisualise la version de production sur `http://localhost:4173` |
| `npm test` | Lance les tests automatisés |
| `npm run test:watch` | Relance les tests à chaque modification |
| `npm run typecheck` | Vérifie TypeScript sans construire |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run check` | Typecheck + tests + build |

### Version de production en local

```bash
npm run build
npm run preview
```

Ouvrez `http://localhost:4173`.

---

## 5. Variables d’environnement

Le site **fonctionne sans aucune clé API** pour les trois calculateurs.

Les seules variables nécessaires concernent les services facultatifs :

- **Resend** : newsletter.
- **Stripe** : paiements futurs, désactivés.
- **Vercel** : hébergement.

### Créer votre fichier local

```bash
cp .env.example .env.local
```

Ouvrez ensuite `.env.local` dans un éditeur de texte (TextEdit, VS Code, etc.) et remplissez uniquement ce dont vous avez besoin.

> Ne mettez jamais de clé secrète dans un fichier `VITE_...` : tout ce qui commence par `VITE_` est visible dans le navigateur. Les clés Resend et Stripe doivent rester côté serveur, sans préfixe `VITE_`.

### Important pour le développement local

Vite sert uniquement l’interface. Les fonctions du dossier `api/` (newsletter, Stripe) sont des fonctions serverless Vercel. En lançant simplement `npm run dev`, le formulaire de newsletter affichera un message honnête du type « le service d’inscription n’est pas actif sur cette version locale ». C’est normal : aucune inscription n’est simulée.

Pour tester aussi les fonctions API en local, installez Vercel CLI (voir section 9) et lancez :

```bash
vercel dev
```

---

## 6. Configurer Resend (newsletter)

Resend est un service d’envoi d’e-mails transactionnels. Il n’est **pas nécessaire** pour utiliser les calculateurs.

1. Créez un compte sur [https://resend.com](https://resend.com).
2. Ajoutez et vérifiez votre domaine d’envoi (par exemple `votre-domaine.fr`). Pour des tests, Resend propose une adresse d’essai, mais elle ne permet pas d’envoyer à n’importe qui.
3. Créez une **API key** dans le tableau de bord Resend.
4. Créez une **Audience** si vous souhaitez gérer les inscrits dans Resend.
5. Renseignez dans `.env.local` (et plus tard dans Vercel) :

```env
RESEND_API_KEY=re_xxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
RESEND_FROM_EMAIL="Astralis <newsletter@votre-domaine.fr>"
CONTACT_TO_EMAIL=vous@votre-domaine.fr
```

Deux modes sont possibles :

- **Avec `RESEND_AUDIENCE_ID`** : l’adresse est ajoutée à l’audience Resend.
- **Sans audience, avec `CONTACT_TO_EMAIL`** : un e-mail de notification vous est envoyé pour chaque inscription.

Tant que la configuration est absente, l’API répond `503` et le site affiche un message clair. Aucun faux succès n’est affiché.

### Tester l’envoi

Avec Vercel CLI :

```bash
vercel dev
```

Puis ouvrez l’adresse locale indiquée et inscrivez une adresse. Vérifiez dans Resend que le contact ou l’e-mail apparaît.

---

## 7. Stripe (paiements futurs — désactivés)

**Aucun paiement réel n’est activé dans cette version.** Il n’y a ni panier, ni bouton d’achat, ni abonnement, ni faux paiement.

La fondation technique existe dans `api/stripe/create-checkout-session.ts` :

- Par défaut, `ENABLE_PAYMENTS=false` : l’endpoint répond `503`.
- Pour l’activer plus tard, il faudra :
  1. créer un compte Stripe ;
  2. créer un produit et un prix ;
  3. renseigner `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` et `APP_URL` ;
  4. passer `ENABLE_PAYMENTS=true` ;
  5. créer l’interface d’achat et le webhook côté serveur ;
  6. vérifier les obligations légales : TVA, droit de rétractation, CGV, facturation, médiation.

Ne passez pas `ENABLE_PAYMENTS=true` avant d’avoir terminé ces étapes. La clé secrète Stripe ne doit jamais être exposée au navigateur.

---

## 8. Déployer sur Vercel

1. Créez un compte sur [https://vercel.com](https://vercel.com).
2. Installez Vercel CLI :

```bash
npm install -g vercel
```

3. Connectez-vous :

```bash
vercel login
```

4. Depuis le dossier du projet :

```bash
vercel
```

Répondez aux questions (projet personnel, nom du projet, dossier racine `.`). Vercel détecte Vite et le dossier `dist`.

5. Ajoutez les variables d’environnement dans **Project Settings → Environment Variables** (Resend, Stripe si un jour activé, `APP_URL`).
6. Déployez en production :

```bash
vercel --prod
```

Le fichier `vercel.json` contient :

- la réécriture SPA (les routes comme `/numerologie` fonctionnent après rechargement) ;
- des en-têtes de sécurité ;
- une politique de sécurité du contenu compatible avec le géocodage Open-Meteo.

### Domaine

Dans Vercel, ajoutez votre domaine dans **Settings → Domains**, puis suivez les instructions DNS. Mettez à jour `public/sitemap.xml` et les mentions légales avec votre domaine réel.

---

## 9. Architecture du projet

```text
Projet_Astralis/
├── api/                          Fonctions serverless Vercel
│   ├── newsletter.ts             Resend (facultatif)
│   └── stripe/
│       └── create-checkout-session.ts   Stripe (désactivé)
├── public/                       Favicon, robots.txt, sitemap
├── src/
│   ├── components/
│   │   ├── art/                  Illustrations SVG (roue, BodyGraph, matrice)
│   │   ├── charts/               Roue natale et BodyGraph dynamiques
│   │   ├── forms/                Formulaires et autocomplétion de ville
│   │   ├── layout/               Header, footer, mise en page
│   │   ├── results/              Composants communs aux résultats
│   │   └── ui/                   Boutons, dialogues, ornements, FAQ
│   ├── lib/
│   │   ├── astrology/            Moteur astrologique, maisons, aspects, données
│   │   ├── geo/                  Villes locales + Open-Meteo
│   │   ├── humandesign/          BodyGraph, portes, canaux, moteur
│   │   ├── numerology/           Calculs et interprétations
│   │   ├── services/             Newsletter
│   │   ├── storage.ts            sessionStorage (pas de base de données)
│   │   ├── timezone.ts           Conversions civiles ↔ UTC
│   │   └── validation.ts         Validation des formulaires
│   ├── pages/                    Toutes les pages
│   ├── styles/globals.css        Design system et styles globaux
│   └── types/                    Déclarations TypeScript
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

### Principe de séparation

- **Interface** : `src/pages`, `src/components`.
- **Calculs** : `src/lib/astrology`, `src/lib/numerology`, `src/lib/humandesign`.
- **Services externes** : `api/` et `src/lib/services`.
- **Aucune base de données** : les données de naissance restent dans le `sessionStorage` de l’onglet, le temps d’afficher les résultats.

Cette séparation permet d’ajouter plus tard des analyses premium, des comparaisons de profils ou des comptes utilisateurs sans reconstruire l’interface.

---

## 10. Moteurs de calcul, licences et limites

### Astrologie

- **Positions planétaires** : [`astronomy-engine`](https://github.com/cosinekitty/astronomy) 2.x, licence **MIT**. Théories VSOP87 et ELP2000, calculs géocentriques tropicaux.
- **Maisons** : algorithme **Placidus** implémenté localement, adapté de `free-human-design` (MIT), avec bascule automatique en signes entiers aux latitudes polaires.
- **Nœud Nord** : nœud moyen (formule astronomique classique).
- **Précision** : de l’ordre de l’arcminute pour les planètes, suffisante pour une lecture astrologique. **Ce n’est pas Swiss Ephemeris**, et le site ne le prétend pas.

### Numérologie

- Implémentation interne, table pythagoricienne, réduction théosophique et conservation des nombres maîtres 11, 22, 33.
- Convention explicite : le **Y** est compté comme voyelle pour l’Élan spirituel.
- Le Chemin de vie additionne tous les chiffres de la date. Les noms sont normalisés (accents, ligatures, ponctuation).
- Tests de référence dans `src/lib/numerology/core.test.ts`.

### Human Design

- Matrice canonique : 64 portes, 36 canaux, 9 centres, 26 activations (13 corps × conscient/inconscient).
- Les positions sont calculées avec `astronomy-engine` ; la correspondance longitude → porte/ligne reprend l’algorithme du mandala de `free-human-design` (MIT).
- Le moment du **Design** est recherché par dichotomie à 88° de Soleil avant la naissance.
- **L’heure exacte est obligatoire.** Si elle manque, aucun BodyGraph approximatif n’est produit.

### Données et confidentialité

- Calculs exécutés dans le navigateur.
- `sessionStorage` uniquement, effacé à la fermeture de l’onglet ou via « Effacer mes données ».
- La recherche de ville peut interroger **Open-Meteo** avec le seul nom de la commune. Aucune date, heure ou coordonnée de naissance n’est envoyée.
- Pas de cookie publicitaire, pas de mesure d’audience, pas de base de données de naissance.
- Voir `/confidentialite` et `/ethique`.

---

## 11. Traitement de l’heure inconnue

### Astrologie

Si vous cochez « Je ne connais pas mon heure de naissance » :

- le champ heure est désactivé ;
- le calcul teste plusieurs moments de la journée ;
- seuls les signes **stables sur toute la journée** sont affichés ;
- l’Ascendant, le Milieu du Ciel, les maisons et les aspects sont **supprimés** ;
- un message explicite l’indique.

Aucune heure arbitraire n’est inventée.

### Human Design

L’heure exacte est indispensable. Le formulaire propose :

- une explication ;
- la démarche pour obtenir son acte de naissance (gratuit en mairie en France) ou son carnet de santé ;
- un lien vers le calculateur astral en mode « heure inconnue ».

Aucun BodyGraph n’est généré sans heure.

---

## 12. Tests et vérifications effectués

### Tests automatisés

```bash
npm test
```

Résultat attendu : **47 tests réussis** répartis sur 9 fichiers.

Couverture fonctionnelle :

- **Numérologie** : valeurs des lettres, accents, maîtres nombres, chemin de vie, expression, voyelles/consonnes, année personnelle, grille d’inclusion.
- **Astrologie** : positions de référence (Soleil/Lune au 1er janvier 2000), maisons Placidus comparées à une implémentation de référence, bascule polaire, mode heure inconnue, aspects, nœud moyen.
- **Human Design** : profil de référence 1972-08-02 Bangkok, comparaison des portes/canaux/type/autorité/profil avec le moteur de référence sur plusieurs dates, correspondance longitude → porte, refus de l’heure inconnue.
- **Fuseaux horaires** : heure d’été/hiver, heure inexistante, heure ambiguë, jour julien, formatage français.
- **Validation** : noms, dates, heures, lieux, e-mails, trois formulaires.
- **Formulaires** : erreurs visibles, sauvegarde de session et navigation vers les résultats.
- **Navigation** : accueil, pages des trois disciplines, cours, 404, liens.
- **Newsletter** : message honnête si le service n’est pas configuré, refus d’un e-mail invalide.

### Vérifications manuelles / navigateur

- Build de production (`npm run build`) réussi.
- TypeScript (`npm run typecheck`) réussi.
- ESLint (`npm run lint`) réussi.
- Parcours complet testé dans Chrome aux largeurs desktop (1440 px), tablette (834 px) et mobile (390 px).
- Vérification des trois résultats, du mode heure inconnue, du menu mobile et des pages « Bientôt disponible ».
- Aucune erreur JavaScript dans la console lors du parcours de test.

### Ce qui n’a pas été testé

- **Resend** : aucun envoi réel sans compte et domaine vérifié.
- **Stripe** : aucun paiement réel, l’endpoint est volontairement fermé.
- **Vercel** : aucun déploiement réel sans compte Vercel.
- **Tous les navigateurs et toutes les versions de macOS** : les tests ont été effectués avec Chrome sur la machine de développement.

---

## 13. État honnête des fonctionnalités

### Opérationnel

- Accueil responsive.
- Trois formulaires avec validation.
- Calculs réels de numérologie, astrologie et Human Design.
- Pages de résultats dédiées.
- Roue natale, tableaux de planètes, maisons, aspects.
- BodyGraph et lecture des centres/canaux/activations.
- Mode heure inconnue en astrologie, avec limites explicites.
- Boutons « Comprendre mon profil » et « Approfondir mon analyse » sous les résultats.
- Newsletter branchée sur une fonction serverless (nécessite Resend pour envoyer).
- Pages cours/compte en « Bientôt disponible », sans simulation.
- Pages légales et éthiques.
- Configuration Vercel et en-têtes de sécurité.

### À configurer par vous

- **Resend** : compte, domaine, clé API, audience, variables d’environnement.
- **Vercel** : compte, déploiement, domaine, variables.
- **Stripe** : uniquement si vous ouvrez des paiements plus tard ; rien n’est actif aujourd’hui.
- **Mentions légales / CGV** : remplacer les champs `[À compléter]` par vos informations réelles avant publication.
- **Sitemap** : remplacer `https://votre-domaine.fr` par votre domaine.
- **Contenus premium** : les rapports PDF et les cours ne sont pas encore rédigés/produits.
- **Comptes utilisateurs** : non implémentés volontairement (pas de base de données).

### Limites assumées

- Le Human Design est présenté comme un modèle symbolique, pas comme une théorie physique validée.
- L’astrologie et la numérologie sont des outils d’introspection, pas des prédictions.
- Astronomy Engine n’est pas Swiss Ephemeris ; la précision est adaptée à l’interprétation, pas à un usage professionnel de recherche.
- Les maisons Placidus peuvent basculer en signes entiers aux latitudes polaires ; le résultat l’indique.
- Les données de naissance ne sont pas conservées : si vous rechargez la page de résultats dans un nouvel onglet, il faudra refaire le calcul.

---

## 14. Dépannage

### `node: command not found`

Node.js n’est pas installé ou le Terminal n’a pas été rouvert. Installez Node LTS et rouvrez Terminal.

### `Unsupported engine` ou erreur avec Node 23

Utilisez Node 22 LTS :

```bash
nvm install 22
nvm use 22
```

Puis relancez `npm install`.

### Le port 5173 est déjà utilisé

```bash
npm run dev -- --port 5174
```

Ouvrez alors `http://localhost:5174`.

### La recherche de ville ne trouve rien

- Vérifiez votre connexion : la recherche en ligne utilise Open-Meteo.
- Essayez un nom plus simple (« Lyon » plutôt que « Lyon 3e »).
- Utilisez « Ma ville n’apparaît pas — saisir les coordonnées » et renseignez latitude, longitude et fuseau IANA (par exemple `Europe/Paris`).

### La newsletter affiche « service non configuré »

C’est normal en local sans Resend. Configurez `.env.local` et utilisez `vercel dev`, ou déployez sur Vercel avec les variables d’environnement.

### Les résultats ont disparu après rechargement

Les données sont volontairement stockées en `sessionStorage`. Fermer l’onglet les efface. Revenez au formulaire et relancez le calcul.

### `npm install` échoue

Essayez :

```bash
npm install --legacy-peer-deps
```

Si le problème persiste, supprimez `node_modules` et `package-lock.json`, puis relancez. (Conservez une copie du projet avant.)

---

## 15. Archive ZIP

Une archive `Astralis-site.zip` est créée à la racine du projet. Elle contient les sources, les configurations, les tests et le README, **sans** `node_modules`, `dist`, ni fichiers de travail temporaires.

Pour l’utiliser :

1. décompressez l’archive ;
2. ouvrez le dossier dans Terminal ;
3. `npm install` ;
4. `npm run dev`.

---

## 16. Crédits et licences

- **Maquettes et direction artistique** : fournies par la commanditaire (Stitch, Aetherial Art Deco).
- **Astronomy Engine** : MIT, © Don Cross.
- **free-human-design** : MIT, utilisé comme référence de test et source d’inspiration pour la matrice et l’algorithme Placidus ; les données nécessaires ont été adaptées localement.
- **React, Vite, Tailwind CSS, React Router, Lucide** : licences open source respectives.
- **Plus Jakarta Sans** et **Noto Sans Symbols** : SIL Open Font License, via Fontsource.

Les notices détaillées sont dans `THIRD_PARTY_NOTICES.md`. Les textes éditoriaux ont été rédigés pour ce projet. Ils ne constituent pas un conseil médical, psychologique, juridique ou financier.

---

## 17. Contact

Pour toute question technique ou signalement :

**astrales.spiritalite@gmail.com**

Ne joignez jamais de document d’identité ou d’acte de naissance à un e-mail. Pour signaler une erreur de calcul, indiquez seulement la date, l’heure, le lieu et le résultat observé.
