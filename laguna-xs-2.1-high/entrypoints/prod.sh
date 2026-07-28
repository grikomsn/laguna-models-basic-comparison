# Production entrypoint - root level
#!/usr/bin/env sh
set -e

echo "🏭 Starting production environment..."

# Ensure data directory exists
mkdir -p /app/data

# Start PM2 in runtime mode (foreground for Docker)
echo "🚀 Starting PM2 runtime..."
exec pm2-runtime ecosystem.config.js
