# Dockerfile
# Multi-stage build pour NestJS

# Base
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl

# Dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build dependencies (pour le build uniquement)
FROM base AS build-dependencies
COPY package*.json ./
RUN npm ci

# Build
FROM build-dependencies AS build
COPY . .
RUN npm run build

# Development
FROM base AS development
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000 9229
CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]

# Production
FROM base AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
COPY --from=build /app/typeorm.config.js ./
COPY --from=build /app/dist/migrations ./dist/migrations

# Script de démarrage robuste pour production
RUN echo '#!/bin/sh\n\
  set -e\n\
  echo "🔄 Waiting for database..."\n\
  for i in 1 2 3 4 5; do\n\
  if nc -z ${DB_HOST:-postgres} ${DB_PORT:-5432}; then\n\
  echo "✅ Database is ready"\n\
  break\n\
  fi\n\
  echo "⏳ Waiting for database... ($i/5)"\n\
  sleep 5\n\
  done\n\
  echo "🚀 Running migrations..."\n\
  npm run migration:run:prod || { echo "❌ Migration failed"; exit 1; }\n\
  echo "✅ Migrations completed"\n\
  echo "🎯 Starting application..."\n\
  exec npm run start:prod' > /app/start.sh && chmod +x /app/start.sh

RUN mkdir -p /app/images && \
  apk add --no-cache netcat-openbsd

EXPOSE 3000
CMD ["/app/start.sh"]