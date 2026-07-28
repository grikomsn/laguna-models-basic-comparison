.PHONY: help install build dev start stop docker-up docker-down logs clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make install     - Install npm dependencies"
	@echo "  make build       - Build TypeScript"
	@echo "  make dev         - Run development server with tsx"
	@echo "  make start       - Start production server"
	@echo "  make docker-up   - Start Docker containers"
	@echo "  make docker-down - Stop Docker containers"
	@echo "  make logs        - View Docker logs"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make pm2-start   - Start with PM2"
	@echo "  make pm2-stop    - Stop PM2 processes"

# Install dependencies
install:
	npm install

# Build TypeScript
build:
	npx tsc

# Development server
dev:
	tsx src/server.ts

# Production start
start:
	node dist/server.js

# Docker commands
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

logs:
	docker-compose logs -f

# Clean build artifacts
clean:
	rm -rf dist/
	rm -rf logs/

# PM2 commands
pm2-start:
	pm2 start ecosystem.config.js

pm2-stop:
	pm2 stop all

pm2-delete:
	pm2 delete all

pm2-logs:
	pm2 logs

pm2-monit:
	pm2 monit
