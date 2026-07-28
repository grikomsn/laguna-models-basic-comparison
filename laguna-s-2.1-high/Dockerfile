FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pm2

FROM base AS deps
COPY package.json package-lock.json* ./
COPY backend/package.json backend/
COPY db/package.json db/
RUN npm install

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ backend/
COPY db/ db/
COPY tsconfig.json ./
RUN npx turbo run build

FROM base AS runtime
ENV NODE_ENV=production

# Create data directory for SQLite
RUN mkdir -p /app/data /app/logs

# Copy built output and dependencies
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/db/dist ./db/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/node_modules/.bin/turbo ./node_modules/.bin/turbo

# Copy source for tsx runtime (alternative: use built output)
COPY backend/src ./backend/src
COPY db/src ./db/src
COPY backend/package.json backend/
COPY db/package.json db/
COPY tsconfig.json ./
COPY ecosystem.config.js ./

# Install tsx for direct TypeScript execution
RUN npm install tsx

EXPOSE 3000

# Run DB migration first, then start backend via PM2
CMD ["sh", "-c", "npx tsx db/src/migrate.ts && pm2-runtime ecosystem.config.js --env production"]
