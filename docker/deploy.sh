#!/bin/bash
# docker/deploy.sh

set -e

ENV="${1:-dev}"
ACTION="${2:-up}"

if [[ ! -f ".env.${ENV}" ]]; then
    echo "❌ Fichier .env.${ENV} manquant"
    exit 1
fi

echo "🚀 Déploiement $ENV..."

case "$ACTION" in
    "up")
        docker-compose --env-file .env.${ENV} -f docker-compose.yml -f docker-compose.${ENV}.yml up -d --build
        echo "✅ Services démarrés"
        docker-compose --env-file .env.${ENV} -f docker-compose.yml -f docker-compose.${ENV}.yml ps
        ;;
    "down")
        docker-compose --env-file .env.${ENV} -f docker-compose.yml -f docker-compose.${ENV}.yml down
        echo "✅ Services arrêtés"
        ;;
    "logs")
        docker-compose --env-file .env.${ENV} -f docker-compose.yml -f docker-compose.${ENV}.yml logs -f
        ;;
    *)
        echo "Usage: $0 <env> <up|down|logs>"
        exit 1
        ;;
esac