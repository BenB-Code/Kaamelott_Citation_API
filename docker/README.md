# Configuration Docker Multi-Environnements

## Structure

```
docker/
├── postgres/
│   ├── postgresql.dev.conf      # Config développement
│   ├── postgresql.staging.conf  # Config pré-production
│   ├── postgresql.prod.conf     # Config production
│   └── healthcheck.sh           # Script santé PostgreSQL
├── compose
│   ├── docker-compose.yml            # Configuration base
│   ├──  docker-compose.dev.yml       # Override développement
│   ├──  docker-compose.staging.yml   # Override staging
│   └── docker-compose.prod.yml       # Override production
├── environment
│   ├── .env.dev                     # Variables développement
│   ├── .env.staging                 # Variables staging
│   └── .env.prod                    # Variables production
└── deploy.sh                    # Script de déploiement

```

## Utilisation

### Avec script direct
```bash
cd docker
./deploy.sh dev up      # Démarrage développement
./deploy.sh prod up     # Démarrage production
./deploy.sh dev logs    # Voir les logs
./deploy.sh dev down    # Arrêt des services
```

## Environnements

| Environnement | PostgreSQL Config | Caractéristiques |
|---------------|-------------------|------------------|
| **dev** | postgresql.dev.conf | Logs verbeux, fsync=off, ports exposés |
| **staging** | postgresql.staging.conf | Configuration intermédiaire, SSL |
| **prod** | postgresql.prod.conf | Optimisé performance, sécurisé |

## Configuration PostgreSQL par environnement

| Paramètre | Dev | Staging | Prod |
|-----------|-----|---------|------|
| max_connections | 20 | 30 | 50 |
| shared_buffers | 512MB | 256MB | 256MB |
| fsync | off | on | on |
| log_statement | all | error | error |
| ssl | off | on | on |

## Ports exposés

| Service | Dev | Staging | Prod |
|---------|-----|---------|------|
| PostgreSQL | 5432 | - | - |
| NestJS | 3000 | 3000 | 3000 |
| Debug Node | 9229 | - | - |

## Sécurité

⚠️ **IMPORTANT** : 
- Changez les mots de passe dans `.env.prod`
- Les fichiers `.env.*` ne sont pas committé
- La config dev désactive fsync pour la rapidité (dangereux en prod)

## Volumes persistants

- `postgres_data` : Données PostgreSQL
- `app_images` : Images uploadées dans l'application