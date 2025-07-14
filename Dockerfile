# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

# --- Build Stage ---
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (npm ci is deterministic)
COPY --link package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the application source
COPY --link . .

# Build the Angular app (production build)
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# --- Production Stage ---
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built app and production dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install 'serve' globally for static file serving as root


# Switch back to the non-root user
USER root
RUN npm install -g serve
USER appuser


# Expose the default Angular dev server port
EXPOSE 4200

# Serve the Angular app using a simple static server (e.g., serve)
# If you want to use Express or another server, adjust this accordingly.
# Install 'serve' globally for static file serving


CMD ["serve", "-s", "dist", "-l", "4200"]
