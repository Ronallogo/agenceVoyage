# Utilise l’image Nginx
FROM nginx:stable-alpine

# Supprime la config par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers Angular dans le dossier HTML public
COPY dist/ /usr/share/nginx/html

# Expose le port utilisé par Nginx
EXPOSE 80

# Démarre le serveur
CMD ["nginx", "-g", "daemon off;"]
