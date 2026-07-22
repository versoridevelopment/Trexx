# --- Base ---
FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

# --- Build Stage ---
FROM base AS build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @repo/types build
RUN pnpm --filter @repo/api exec prisma generate
RUN pnpm --filter @repo/api build
RUN pnpm --filter @repo/api deploy /app/deployed --legacy

# --- Runtime Stage ---
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/deployed ./

EXPOSE 3001
CMD ["node", "dist/main"]
