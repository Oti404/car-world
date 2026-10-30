# Backend: Express + Prisma API
FROM node:22.23.4-bookworm-slim
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    PORT=3000 \
    UPLOAD_DIR=/app/uploads \
    NODE_OPTIONS=--max-old-space-size=192

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force
COPY prisma ./prisma
RUN npx prisma generate
COPY index.js seed.js seed-cars.js seed-news.js ./
COPY routes ./routes
RUN mkdir -p /app/uploads && chown -R node:node /app

USER node
EXPOSE 3000
# Sync schema, seed an empty database (idempotent), then start the API
CMD ["sh", "-c", "npx prisma db push --skip-generate && node seed.js && exec node index.js"]
