<div align="center">

# Kaamelott Citation API

### _API REST pour les citations de la serie Kaamelott_

---

### Technologies

<img src="https://img.shields.io/badge/-NestJS%2011-E0234E?style=flat-square&logo=nestjs&logoColor=white"> <img src="https://img.shields.io/badge/-TypeORM%200.3-FE0803?style=flat-square&logo=typeorm&logoColor=white"> <img src="https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm&logoColor=white">

<img src="https://img.shields.io/badge/-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/-Node.js%2018+-339933?style=flat-square&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/-Husky-42B983?style=flat-square&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black">

<img src="https://img.shields.io/badge/-TypeScript%205.7-007ACC?style=flat-square&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white"> <img src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white">

### Status

![Version](https://img.shields.io/github/package-json/v/BenB-Code/Kaamelott_Citation_API?style=flat-square&logo=github)
![CI Status](https://img.shields.io/github/actions/workflow/status/BenB-Code/Kaamelott_Citation_API/ci.yml?style=flat-square&logo=github-actions&label=CI)

</div>

---

## Apercu

API RESTful pour gerer les citations de la serie Kaamelott d'Alexandre Astier.

### Fonctionnalites

- Gestion CRUD complete des citations
- Relations complexes entre entites (personnages, acteurs, auteurs, episodes, films)
- Recherche full-text sur 10 champs simultanement
- Pagination securisee (limite 1-500)
- Authentification par API Key (admin/user)
- Rate limiting 3 niveaux (public, user, admin)
- Associations dynamiques ManyToMany

---

## Architecture

```
Controller (HTTP) --> Service (Business Logic) --> Repository (Data Access) --> Entity (TypeORM)
```

### Modele de donnees

- **Citation** : texte, relations vers character, episode/movie, actors, authors
- **Character** : personnage avec acteurs associes
- **Actor/Author** : personnes (prenom, nom, photo)
- **Episode** : appartient a une saison
- **Season** : appartient a un show
- **Movie** : appartient a un show
- **Show** : serie ou film (type MediaType)

### Relations

- Citation --> Character (ManyToOne, obligatoire)
- Citation --> Episode/Movie (ManyToOne, optionnel)
- Citation <--> Actor/Author (ManyToMany)
- Character <--> Actor (ManyToMany)
- Episode --> Season --> Show (hierarchie)

---

## Installation

### Prerequis

- Node.js >= 18
- npm
- PostgreSQL (ou Docker)

### Etapes

1. Cloner le repository

```bash
git clone git@github.com:BenB-Code/Kaamelott_Citation_API.git
cd Kaamelott_Citation_API
```

2. Installer les dependances

```bash
npm install
```

3. Configurer l'environnement

```bash
# Copier et adapter le fichier d'exemple
cp .env.exemple docker/environment/.env.[local|dev|prod]
```

4. Lancer avec Docker (recommande)

```bash
npm run docker:build:[dev|prod]
```

5. Ou lancer manuellement

```bash
npm run migration:run
npm run start:local
```

### Variables d'environnement

| Variable         | Description                           | Defaut    |
| ---------------- | ------------------------------------- | --------- |
| `DB_HOST`        | Hote PostgreSQL                       | localhost |
| `DB_PORT`        | Port PostgreSQL                       | 5432      |
| `DB_NAME`        | Nom de la base                        | -         |
| `DB_USER`        | Utilisateur                           | -         |
| `DB_PASSWORD`    | Mot de passe                          | -         |
| `API_PORT`       | Port de l'API                         | 3000      |
| `ENV`            | Environnement (dev, local, prod)      | dev       |
| `ADMIN_API_KEYS` | Cles API admin (separees par virgule) | -         |
| `USER_API_KEYS`  | Cles API user (separees par virgule)  | -         |

---

## API Endpoints

### Citations (ressource principale)

| Methode  | Endpoint        | Description                      | Auth  |
| -------- | --------------- | -------------------------------- | ----- |
| `GET`    | `/citation`     | Liste avec filtres et pagination | User  |
| `GET`    | `/citation/:id` | Detail d'une citation            | Admin |
| `POST`   | `/citation`     | Creer une citation               | Admin |
| `PATCH`  | `/citation/:id` | Modifier une citation            | Admin |
| `DELETE` | `/citation/:id` | Supprimer une citation           | Admin |

### Associations Citations

| Methode  | Endpoint                                | Description         |
| -------- | --------------------------------------- | ------------------- |
| `POST`   | `/citation/:citationId/actor/:fieldId`  | Associer un acteur  |
| `DELETE` | `/citation/:citationId/actor/:fieldId`  | Dissocier un acteur |
| `POST`   | `/citation/:citationId/author/:fieldId` | Associer un auteur  |
| `DELETE` | `/citation/:citationId/author/:fieldId` | Dissocier un auteur |

### Autres ressources

Meme pattern CRUD pour :

- `/actor` - Acteurs
- `/author` - Auteurs
- `/character` - Personnages (+ associations acteurs)
- `/episode` - Episodes
- `/season` - Saisons
- `/movie` - Films
- `/show` - Series/Films
- `/health` - Health check (public)

### Parametres de filtrage (GET /citation)

| Parametre     | Type     | Description                                                                      |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `search`      | string   | Recherche full-text (min 3 caracteres)                                           |
| `characterId` | number   | Filtrer par personnage                                                           |
| `episodeId`   | number   | Filtrer par episode                                                              |
| `movieId`     | number   | Filtrer par film                                                                 |
| `text`        | string   | Filtrer par texte exact                                                          |
| `sortBy`      | string   | Champ de tri (createdAt, updatedAt, characterId, episodeId, movieId, citationId) |
| `sortOrder`   | ASC/DESC | Ordre de tri (defaut: DESC)                                                      |
| `limit`       | number   | Nombre de resultats (1-500, defaut: 100)                                         |
| `offset`      | number   | Decalage pour pagination                                                         |

### Exemples

```bash
# Recherche full-text
GET /citation?search=faux&limit=10

# Filtrer par personnage
GET /citation?characterId=1&sortBy=createdAt&sortOrder=DESC

# Creer une citation
POST /citation
{
  "text": "C'est pas faux !",
  "characterId": 1,
  "episodeId": 1,
  "actorsId": [1],
  "authorsId": [1]
}
```

---

## Scripts

### Developpement

| Commande                    | Description                     |
| --------------------------- | ------------------------------- |
| `npm run start:local`       | Demarrer en local (port 3001)   |
| `npm run start:dev`         | Demarrer avec watch (port 3000) |
| `npm run start:local:debug` | Mode debug                      |

### Tests

| Commande             | Description           |
| -------------------- | --------------------- |
| `npm run test`       | Tests unitaires       |
| `npm run test:watch` | Tests en watch mode   |
| `npm run test:cov`   | Tests avec couverture |
| `npm run test:e2e`   | Tests end-to-end      |

### Base de donnees

| Commande                     | Description                   |
| ---------------------------- | ----------------------------- |
| `npm run migration:run`      | Executer les migrations       |
| `npm run migration:generate` | Generer une migration         |
| `npm run migration:revert`   | Annuler la derniere migration |
| `npm run schema:drop`        | Supprimer le schema           |

### Docker

| Commande                    | Description              |
| --------------------------- | ------------------------ |
| `npm run docker:build:dev`  | Build environnement dev  |
| `npm run docker:build:prod` | Build environnement prod |

### Qualite de code

| Commande               | Description                 |
| ---------------------- | --------------------------- |
| `npm run lint`         | Lancer ESLint               |
| `npm run lint:fix`     | Corriger les erreurs ESLint |
| `npm run format`       | Formater avec Prettier      |
| `npm run format:check` | Verifier le formatage       |

---

## Tests

- Couverture minimum enforced : 80% (branches, functions, lines, statements)
- Tests unitaires : controllers, services, repositories, params, guards
- Tests E2E : tous les endpoints avec Supertest
- Pre-commit hooks : lint + format automatiques

---

## Securite

### Authentification

- API Key requise sur toutes les routes (sauf `/health`)
- Header : `x-api-key`
- Deux niveaux : Admin (acces total) et User (acces restreint)
- Decorateur `@Roles(USER_KEY)` pour ouvrir aux users

### Rate Limiting

| Niveau | Limite  | TTL |
| ------ | ------- | --- |
| Public | 5 req   | 60s |
| User   | 10 req  | 60s |
| Admin  | 100 req | 60s |

---

## Structure du projet

```
src/
├── actors/              # Module Acteurs
├── authors/             # Module Auteurs
├── characters/          # Module Personnages
├── citations/           # Module Citations (principal)
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── entities/
│   ├── dto/
│   ├── params/
│   └── types/
├── episodes/            # Module Episodes
├── movies/              # Module Films
├── seasons/             # Module Saisons
├── shows/               # Module Series
├── health/              # Health checks
├── migrations/          # Migrations TypeORM
├── common/              # Code partage
│   ├── constants/
│   ├── decorators/
│   ├── exceptions/
│   ├── guards/
│   ├── logger/
│   ├── pagination/
│   ├── params/
│   └── config/
├── config/              # Configuration
├── app.module.ts
└── main.ts
```

---

## Documentation API

La documentation OpenAPI est disponible dans le fichier `swagger.yaml` a la racine du projet.

- [Document Swagger](swagger.yaml)

Pour visualiser, importer le fichier dans [Swagger Editor](https://editor.swagger.io/)

---

## CI/CD

Pipeline GitHub Actions sur push/PR :

| Job       | Description                         | Branches          |
| --------- | ----------------------------------- | ----------------- |
| **Lint**  | ESLint + Prettier check             | develop, master   |
| **Test**  | Tests unitaires + E2E avec coverage | develop, master   |
| **Build** | Build + upload artifact             | master uniquement |

---

## Licence

[Custom Non-Commercial License](LICENSE.txt)

---

## Contribution

### Issues

Utiliser les templates GitHub :

- [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) - Signaler un bug
- [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) - Proposer une fonctionnalite

### Pull Requests

1. Fork le repository
2. Creer une branche depuis `develop` (`git checkout -b feature/nouvelle-feature`)
3. Commit (`git commit -m 'Add nouvelle feature'`)
4. Push (`git push origin feature/nouvelle-feature`)
5. Ouvrir une Pull Request vers `develop`

### Workflow

- `master` : branche de production (protegee)
- `develop` : branche de developpement
- Les PRs declenchent automatiquement le pipeline CI (lint, tests)
