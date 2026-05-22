FROM oven/bun:1 AS base
WORKDIR /app

# Copy only package files first for better caching
COPY package.json bun.lock* ./

# Install dependencies (devDependencies also needed for prisma)
RUN bun install --frozen-lockfile

# Build Prisma Client
FROM base AS builder
COPY . .
RUN bun run db:generate

# Production stage - minimal image
FROM oven/bun:1-slim AS production
WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy node_modules from builder (optimized)
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/package.json ./package.json

# Create non-root user for security
RUN addgroup --system bunuser && \
    adduser --system --gid bunuser bunuser && \
    chown -R bunuser:bunuser /app
USER bunuser

# Expose port (adjust if your app uses a different one)
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Development stage (optional, for local development in container)
FROM base as dev
COPY . .
ENTRYPOINT ["bun", "run", "dev"]

CMD ["node", "src/index.js"]
