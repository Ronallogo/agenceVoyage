# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.1

###############################
# Builder stage
###############################
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app

# Install dependencies (only prod for final, all for build)
COPY --link package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the application source
COPY --link . .

# Build the Angular app (browser and server bundles)
RUN npm run build:ssr

# Remove dev dependencies and install only production dependencies
RUN --mount=type=cache,target=/root/.npm \
    rm -rf node_modules && npm ci --omit=dev

###############################
# Production stage
###############################
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built app and production dependencies from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.ts ./

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

USER appuser

EXPOSE 4000

CMD ["node", "dist/agence-voyage/server/server.mjs"]
