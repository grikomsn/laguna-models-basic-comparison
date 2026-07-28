# Node.js + Express + SQLite + PM2 Example

A production-ready example app demonstrating a multi-entrypoint Node.js project with TypeScript, Express, SQLite, PM2, and Docker.

## Project Structure

```
node-express-sqlite-pm2-example/
├── docker-compose.yml          # Root-level Docker Compose entrypoint
├── Dockerfile                  # Multi-stage Docker build
├── .dockerignore
├── package.json                # Root package (workspaces + scripts)
├── tsconfig.json               # Root TypeScript config
├── ecosystem.config.js         # PM2 process management config
├── .gitignore
├── README.md
├── backend/                    # Express API entrypoint
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts            # Server bootstrap
│       ├── app.ts              # Express app
│       └── routes/
│           └── index.ts        # API routes
└── db/                         # Database entrypoint
    ├── package.json
    ├── tsconfig.json
    └── src/
        └── migrate.ts          # DB migration/init script
```

## Prerequisites

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose (for containerized deployment)

## Development

```bash
# Install dependencies
npm install

# Run both backend and db entrypoints concurrently
npm run dev

# Or run individually
npm run dev:backend
npm run dev:db
```

## Production (PM2)

```bash
# Start all services via PM2
npm start

# View logs
npm run logs

# Stop all services
npm stop
```

## Docker

```bash
# Build and start all services
npm run docker:up

# Stop all services
npm run docker:down
```

## API Endpoints

| Method | Path        | Description         |
|--------|-------------|---------------------|
| GET    | `/health`   | Health check        |
| GET    | `/api/users`| List all users      |
| POST   | `/api/users`| Create a user       |
| GET    | `/api/users/:id` | Get a user     |
| PUT    | `/api/users/:id` | Update a user  |
| DELETE | `/api/users/:id` | Delete a user  |
