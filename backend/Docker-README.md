# Docker Setup for Prisma Backend

## Quick Start

### Build and Run Containers

```bash
# Copy .env.example and configure your environment
cp .env.example .env

# Start PostgreSQL and backend services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Development Mode

```bash
# Run with hot-reloading
docker-compose up -d

# Attach to backend container
docker-compose exec backend bun run dev
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| POSTGRES_USER | Database username | postgres |
| POSTGRES_PASSWORD | Database password | postgres |
| POSTGRES_DB | Database name | templatel7 |
| APP_PORT | Backend port | 3000 |
| DATABASE_URL | Prisma database URL (auto-generated) | - |

### Using with Your .env File

Copy `.env.example` to `.env` and configure your credentials:

```bash
cp .env.example .env
# Edit .env with your actual passwords/API keys
docker-compose up -d --build
```

## Prisma Commands in Docker

```bash
# Generate Prisma Client after initial migration
docker-compose exec backend bun run db:generate

# Run migrations (development only)
docker-compose exec backend bun run db:migrate
```

## Database Access

### Connect to PostgreSQL

```bash
docker-compose exec db psql -U postgres -d templatel7
```

## Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove data volumes (WARNING: deletes all database data)
docker-compose down -v

# Remove everything including build cache
docker-compose down -v --rmi local
```
