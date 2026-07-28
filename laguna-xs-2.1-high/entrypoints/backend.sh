# Backend entrypoint - runs with PM2
#!/usr/bin/env sh
set -e

echo "🚀 Starting backend with PM2..."
exec pm2-runtime ecosystem.config.js
