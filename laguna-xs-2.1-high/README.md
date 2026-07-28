# Node.js Express SQLite PM2 Example

A TypeScript-based Node.js Express application with SQLite database and PM2 deployment, packaged with Docker.

## Features

- ✅ TypeScript with tsx (alternative to ts-node)
- ✅ Express.js REST API
- ✅ SQLite database with better-sqlite3
- ✅ PM2 process management
- ✅ Docker & Docker Compose
- ✅ Multi-entrypoint setup (backend/, db/, prod/)
- ✅ Helmet & CORS middleware
- ✅ Health check endpoints

## Project Structure

```
├── src/
│   ├── index.ts           # App factory and exports
│   ├── server.ts          # Server entry point
│   ├── services/
│   │   └── database.ts    # Database service
│   ├── routes/
│   │   ├── health.ts      # Health check routes
│   │   └── api.ts         # API routes
│   └── utils/
│       └── logger.ts      # Winston logger
├── entrypoints/
│   ├── backend.sh         # Backend entrypoint
│   ├── db.sh              # Database entrypoint
│   └── prod.sh            # Production entrypoint
├── data/                  # SQLite database files
├── logs/                  # PM2 logs
├── Dockerfile             # Production build
├── Dockerfile.backend     # Development build
├── docker-compose.yml
├── ecosystem.config.js
├── PM2.config.js
├── Makefile
└── tsconfig.json
```

## Quick Start

### Prerequisites

- Node.js 22+
- npm
- Docker & Docker Compose

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
# Or with Makefile:
make dev
```

### Build

```bash
npm run build
# Or with Makefile:
make build
```

### Production

```bash
npm run start:prod
# Or with Makefile:
make start
```

### PM2 (Process Management)

```bash
# Start with PM2
pm2 start ecosystem.config.js
pm2 start PM2.config.js

# Monitor
pm2 monit
pm2 logs

# Stop
pm2 stop all
pm2 delete all
```

### Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Development: Use backend service
# The 'backend' service runs with tsx and mounts source code

# Production: Use backend-prod service
# The 'backend-prod' service uses the built dist/ folder
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Root info |
| `/health` | GET | Health check |
| `/health/database` | GET | Database connectivity check |
| `/api` | GET | API info |
| `/api/users` | GET | Users list |
| `/api/users/:id` | GET | User by ID |
| `/api/posts` | GET | Posts list |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_PATH` | SQLite database path | `./data/database.sqlite` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `LOG_LEVEL` | Log level | `info` |

## Entrypoints

- **backend.sh** - Development entrypoint with tsx and PM2 runtime
- **db.sh** - Database initialization (used in Docker)
- **prod.sh** - Production entrypoint with compiled TypeScript

## Makefile Commands

```bash
make help      # Show all commands
make install   # Install npm dependencies
make build     # Build TypeScript
make dev       # Run development server
make start     # Start production server
make docker-up     # Start Docker containers
make docker-down   # Stop Docker containers
make logs            # View Docker logs
make clean           # Clean build artifacts
```

## Database Schema

- **users**: id, name, email, password_hash, role, created_at, updated_at
- **posts**: id, title, content, user_id, created_at, updated_at

## License

MIT
