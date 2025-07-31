# Dockerfile
# Multi-stage build pour NestJS

# Base
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl

# Dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force && npm audit fix

# Build
FROM dependencies AS build
COPY . .
RUN npm run build

# Development
FROM base AS development
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000 9229
CMD ["npm", "run", "start:dev"]

# Staging 
FROM base AS staging
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN mkdir -p /app/images
EXPOSE 3000
CMD ["npm", "run", "start:prod"]

# Production
FROM base AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN mkdir -p /app/images
EXPOSE 3000
CMD ["npm", "run", "start:prod"]


