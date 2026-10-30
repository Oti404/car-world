# ---------- Stage 1: build the Angular frontend ----------
FROM node:20-bookworm-slim AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY angular.json tsconfig*.json ./
COPY src ./src
RUN npx ng build --configuration production

# ---------- Stage 2: runtime (PostgreSQL + Express API + static frontend) ----------
FROM node:20-bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends postgresql openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV PG_BIN=/usr/lib/postgresql/15/bin \
    PGDATA=/data/postgres \
    UPLOAD_DIR=/data/uploads \
    PUBLIC_DIR=/app/public \
    PORT=3000 \
    DATABASE_URL=postgresql://mhp:mhp@localhost:5432/mhp \
    DIRECT_URL=postgresql://mhp:mhp@localhost:5432/mhp \
    NODE_ENV=production

WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/prisma ./prisma
RUN npx prisma generate
COPY server/index.js server/seed.js server/seed-cars.js server/seed-news.js ./
COPY server/routes ./routes
COPY --from=frontend /app/dist/angular-app/browser /app/public
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh

VOLUME /data
EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
