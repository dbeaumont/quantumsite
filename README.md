# QuantumSite - Explorez la Physique Quantique

Une plateforme web interactive et moderne pour apprendre la physique quantique.

## Fonctionnalites

- **6 chapitres complets** couvrant les concepts fondamentaux de la mecanique quantique
- **Quiz interactifs** apres chaque chapitre avec feedback immediat
- **Suivi de progression** avec statistiques et recompenses
- **Design moderne** avec theme quantique et animations

## Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **Zustand** - Gestion d'etat
- **Docker** - Conteneurisation

## Demarrage rapide

### Developpement local

```bash
# Installer les dependances
npm install

# Lancer le serveur de developpement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Avec Docker

```bash
# Mode production
docker-compose up -d quantumsite

# Mode developpement (avec hot reload)
docker-compose --profile dev up quantumsite-dev
```

### Build production

```bash
# Build local
npm run build
npm start

# Build Docker
docker build -t quantumsite .
docker run -p 3000:3000 quantumsite
```

## Structure du projet

```
quantumsite/
├── app/                    # Pages et composants Next.js
│   ├── components/         # Composants reutilisables
│   ├── chapters/           # Pages des chapitres
│   │   └── [id]/           # Page detail chapitre
│   ├── quiz/               # Pages des quiz
│   │   └── [id]/           # Page quiz
│   ├── login/              # Page de connexion
│   ├── register/           # Page d'inscription
│   ├── progress/           # Page de progression
│   ├── globals.css         # Styles globaux
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil
├── lib/                    # Utilitaires et donnees
│   ├── data.ts             # Donnees des chapitres et quiz
│   ├── store.ts            # Store Zustand
│   └── types.ts            # Types TypeScript
├── public/                 # Fichiers statiques
├── Dockerfile              # Image Docker production
├── Dockerfile.dev          # Image Docker developpement
├── docker-compose.yml      # Configuration Docker Compose
└── package.json            # Dependances npm
```

## Chapitres disponibles

1. **Introduction a la Mecanique Quantique** - Les bases et principes fondamentaux
2. **La Dualite Onde-Particule** - Nature duelle de la matiere
3. **Le Principe d'Incertitude** - Limites de la connaissance quantique
4. **La Superposition Quantique** - Etats multiples simultanement
5. **L'Intrication Quantique** - Action a distance
6. **L'Equation de Schrodinger** - Equation fondamentale

## Demo

Le site fonctionne en mode demo : entrez n'importe quel email et mot de passe pour vous connecter. Les donnees sont stockees localement dans le navigateur.

## Licence

MIT
