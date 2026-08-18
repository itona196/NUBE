# NUBE

Site du festival NUBE et de son pôle création, développé avec Next.js et Node.js.

## Prérequis

- Node.js 22 LTS
- npm 10 ou plus récent

## Lancer le site

```bash
npm install
npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

Avant le déploiement, copie `.env.example` vers `.env.local` et remplace
`https://votre-domaine.ch` par l’adresse publique réelle du site. Cette valeur
est utilisée pour les liens canoniques, le sitemap et les aperçus de partage.

## Commandes

- `npm run dev` : lance le site en développement
- `npm run build` : crée la version de production
- `npm start` : lance la version de production
- `npm run lint` : vérifie le code
- `npm run infomaniak:verify` : vérifie puis construit le site avant son envoi

`npm start` écoute sur toutes les interfaces réseau et utilise automatiquement
la variable `PORT` fournie par l’hébergeur.

## Déployer sur Infomaniak Node.js

Dans le Manager Infomaniak, crée un site avec **Technologies avancées →
Node.js**, puis utilise les réglages suivants :

- Version de Node.js : `22` (LTS)
- Dossier d’exécution : `./`
- Commande de construction : `npm ci --include=dev && npm run build`
- Commande de lancement : `npm start`
- Port : conserver le port attribué par le Manager

Ajoute ensuite cette variable d’environnement dans le Manager :

```text
NEXT_PUBLIC_SITE_URL=https://votre-domaine.ch
```

Remplace l’adresse par le domaine définitif, sans slash final. Le script de
démarrage lit automatiquement le port dynamique transmis par Infomaniak dans
`PORT`; aucun numéro de port ne doit être ajouté au code.

Pour publier le code, importe le dépôt Git depuis le Manager ou transfère le
projet par SSH/SFTP. Ne transfère pas `node_modules`, `.next`, `.env.local`, les
rapports Playwright ni les fichiers de test générés. Après chaque mise à jour,
relance la commande de construction puis redémarre l’application depuis le
tableau de bord Infomaniak.

Une fois le domaine relié au site, active son certificat Let’s Encrypt depuis
le Manager et vérifie que la redirection HTTPS est active.

## Pages

- `/` : accueil et aperçu de NUBE
- `/festival` : concept du festival et prochaine édition
- `/artistes` : programmation artistique
- `/infos` : informations pratiques et FAQ
- `/creation` : NUBE Studio
- `/archives` : archives du festival

Le projet n'utilise actuellement aucune base de données.
