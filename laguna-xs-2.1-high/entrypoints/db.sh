# DB entrypoint - initializes database
#!/usr/bin/env sh
set -e

echo "🔧 Initializing database..."
mkdir -p /data
touch /data/database.sqlite
echo "Database initialized at /data/database.sqlite"
