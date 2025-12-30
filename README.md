# 🏰 API Citations Kaamelott

WIP - Une API RESTful robuste développée avec NestJS pour gérer les citations de la série culte Kaamelott d'Alexandre Astier.

## 📋 Table des matières

- [Aperçu du projet](#-aperçu-du-projet)
- [Architecture](#-architecture)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Structure du projet](#-structure-du-projet)
- [Scripts disponibles](#-scripts-disponibles)
- [Tests](#-tests)
- [Docker](#-docker)
- [TODO](#-todo)

## 🎯 Aperçu du projet

Cette API permet de gérer un système complet de citations de Kaamelott avec :

- **Gestion des citations** : création, lecture, mise à jour, suppression
- **Relations complexes** : personnages, acteurs, auteurs, épisodes, saisons, films
- **Recherche avancée** : filtrage par texte, personnage, épisode, etc.
- **Pagination** : navigation efficace dans les résultats
- **Associations dynamiques** : liaison/déliaison entre citations et acteurs/auteurs

## 🏗️ Architecture

L'API suit une architecture modulaire basée sur les principes de NestJS :

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │    │    Services     │    │  Repositories   │
│                 │────▶│                 │────▶│                 │
│ Gestion routes  │    │ Logique métier  │    │ Accès données   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      DTOs       │    │    Entities     │    │    Database     │
│                 │    │                 │    │                 │
│ Validation      │    │ Modèles données │    │   PostgreSQL    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Stack technique

- **Framework** : NestJS 11.x
- **Langage** : TypeScript 5.x
- **Base de données** : PostgreSQL avec TypeORM
- **Validation** : class-validator, class-transformer, Joi
- **Tests** : Jest
- **Documentation** : TypeScript JSDoc
- **Containerisation** : Docker & Docker Compose
- **Linting** : ESLint + Prettier

## 🚀 Installation

### Prérequis

- Node.js ≥ 18
- npm ou yarn
- PostgreSQL (ou Docker)

### Étapes

1. **Cloner le repository**

```bash
git clone <repository-url>
cd Kaamelott_Citation_API
```

2. **Installer les dépendances**

```bash
npm install
```

4. **Lancer la base de données**

```bash
# Via Docker
# La bdd va se populer automatiquement avec le container de l'api nestjs
npm run docker:build:dev

# Ou configurer PostgreSQL manuellement
```

5. **Exécuter les migrations** uniquement si modification manuelles

```bash
npm run migration:run
```

6. **Démarrer l'application**

```bash
# Port local: 3001 | Port Docker dev: 3000
npm run start:local
```

### Variables principales

```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=kaamelott_api

# Application
APP_PORT=3000
NODE_ENV=development
```

## 📡 API Endpoints

### Citations

| Méthode  | Endpoint        | Description                      | Paramètres                                                                     |
|----------|-----------------|----------------------------------|--------------------------------------------------------------------------------|
| `GET`    | `/citation`     | Liste toutes les citations       | `search`, `characterId`, `episodeId`, `sortBy`, `sortOrder`, `limit`, `offset` |
| `GET`    | `/citation/:id` | Récupère une citation spécifique | `id` (number)                                                                  |
| `POST`   | `/citation`     | Crée une nouvelle citation       | Body: `CitationDto`                                                            |
| `PATCH`  | `/citation/:id` | Modifie une citation             | `id` (number), Body: `UpdateCitationDto`                                       |
| `DELETE` | `/citation/:id` | Supprime une citation            | `id` (number)                                                                  |

### Associations Citations

| Méthode  | Endpoint                                | Description                       |
|----------|-----------------------------------------|-----------------------------------|
| `POST`   | `/citation/:citationId/actor/:fieldId`  | Associe un acteur à une citation  |
| `DELETE` | `/citation/:citationId/actor/:fieldId`  | Dissocie un acteur d'une citation |
| `POST`   | `/citation/:citationId/author/:fieldId` | Associe un auteur à une citation  |
| `DELETE` | `/citation/:citationId/author/:fieldId` | Dissocie un auteur d'une citation |

### Autres entités

L'API expose également des endpoints pour :

- **Personnages** : `/character`
- **Acteurs** : `/actor`
- **Auteurs** : `/author`
- **Épisodes** : `/episode`
- **Saisons** : `/season`
- **Films** : `/movie`
- **Séries** : `/show`
- **Santé** : `/health`

### Exemples de requêtes

```bash
# Récupérer toutes les citations avec pagination
GET /citation?limit=10&offset=0

# Rechercher des citations contenant "faux"
GET /citation?search=faux&limit=5

# Filtrer par personnage (Arthur = ID 1)
GET /citation?characterId=1

# Trier par date de création descendante
GET /citation?sortBy=createdAt&sortOrder=DESC

# Créer une nouvelle citation
POST /citation
{
  "text": "C'est pas faux !",
  "characterId": 1,
  "episodeId": 1,
  "actorsId": [1, 2],
  "authorsId": [1]
}
```

## 📁 Structure du projet

```
src/
├── actors/                 # Module Acteurs
├── authors/               # Module Auteurs
├── characters/            # Module Personnages  
├── citations/             # Module Citations
│   ├── controllers/      # Contrôleurs REST
│   ├── dto/              # Data Transfer Objects
│   ├── entities/         # Entités TypeORM
│   ├── params/           # Paramètres de filtrage
│   ├── repositories/     # Repositories données
│   ├── services/         # Services métier
│   └── types/            # Types TypeScript
├── common/                # Modules partagés
│   ├── constants/         # Constantes
│   ├── exceptions/        # Gestion erreurs
│   ├── logger/           # Service de logs
│   ├── pagination/       # Système pagination
│   └── params/           # Paramètres communs
├── config/               # Configuration app
├── episodes/             # Module Épisodes
├── health/               # Health checks
├── migrations/           # Migrations DB
├── movies/               # Module Films
├── seasons/              # Module Saisons
├── shows/                # Module Séries
├── app.module.ts         # Module principal
└── main.ts              # Point d'entrée
```

## 🔧 Scripts disponibles

### Développement

```bash
npm run start:dev          # Démarrage en mode watch
npm run start:local        # Démarrage avec env local
npm run start:local:debug  # Debug mode local
```

### Production

```bash
npm run build              # Build de l'application
npm run start:prod         # Démarrage production
```

### Tests

```bash
npm run test               # Tests unitaires
npm run test:watch         # Tests en mode watch
npm run test:cov           # Couverture de tests
npm run test:e2e           # Tests end-to-end
```

### Base de données

```bash
npm run migration:generate  # Générer migration
npm run migration:run      # Exécuter migrations
npm run migration:revert   # Annuler dernière migration
npm run schema:drop        # Supprimer schéma
```

### Docker

```bash
npm run docker:build:dev      # Build environnement dev
npm run docker:build:staging  # Build environnement staging  
npm run docker:build:prod     # Build environnement prod
```

### Code Quality

```bash
npm run lint               # Linter ESLint
npm run format             # Formatage Prettier
```

## 🧪 Tests

Le projet utilise Jest avec une couverture complète :

- **Tests unitaires** : Services, repositories, contrôleurs
- **Tests d'intégration** : Modules complets
- **Tests E2E** : Flux utilisateur complets
- **Mocks** : Base de données, services externes

```bash
# Lancer tous les tests
npm run test

# Tests avec couverture
npm run test:cov

# Tests spécifiques
npm run test -- citations
```

## 🐳 Docker

### Environnements disponibles

1. **Développement**

```bash
npm run docker:build:dev
```

2. **Staging**

```bash
npm run docker:build:staging
```

3. **Production**

```bash
npm run docker:build:prod
```

### Services Docker

- **API** : Application NestJS
- **PostgreSQL** : Base de données

## 📋 TODO

### 🔧 Améliorations techniques

- [ ] **Tests E2E** : Ajouter des E2E pour couvrir toute les routes
- [ ] **Swagger OpenAPI** : Ajouter la documentation interactive API
- [ ] **Dissociation cascade** : Implémenter la suppression automatique des associations sur `DELETE` pour
  `character_actor`, `citation_author`, `citation_actor`
- [ ] **Authentification API Key** : Ajouter restriction par clé API sur toutes les routes (exception sur `GET`)
- [ ] **Rate Limiting** : Implémenter un limiteur de requêtes pour prévenir le spam
- [ ] **Refactoring & Code Quality** :
  - [ ] Amélioration de la couverture de tests
  - [ ] Optimisation des requêtes SQL
  - [ ] Amélioration de la gestion d'erreurs
  - [ ] Documentation JSDoc complète

### 🚀 Fonctionnalités futures

- [ ] Recherche full-text avancée
- [ ] CI/CD Pipeline

---

## 📄 Licence

[Ce projet est sous Custom Non-Commercial License.](LICENSE.txt)

## 👥 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changes (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

*Développé avec ❤️ pour les fans de Kaamelott*
