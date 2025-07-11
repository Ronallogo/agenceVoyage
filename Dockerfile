# Étape 1 : Build
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:ssr

# Étape 2 : Exécution SSR
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist/agence-voyage .
RUN npm install --production
EXPOSE 80
CMD ["node", "server/main.js"]
