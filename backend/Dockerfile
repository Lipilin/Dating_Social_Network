#Основа для всех контейнеров
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --no-audit --no-fund --prefer-offline
COPY . .
RUN npx prisma generate

# Develop-сборка
FROM base AS develop
CMD ["npm", "run", "dev"]

#Build для production-сборки
FROM base AS build
RUN npm run build

#Production-сборка
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json .
RUN npm config set registry https://registry.npmmirror.com
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
CMD ["node", "dist/server.js"]