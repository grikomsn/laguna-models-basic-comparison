module.exports = {
  apps: [
    {
      name: "backend",
      script: "npx tsx src/index.ts",
      cwd: "./backend",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DB_PATH: "./data/app.db"
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_PATH: "./data/app.db"
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/backend-err.log",
      out_file: "./logs/backend-out.log",
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 3000
    },
    {
      name: "db-migrate",
      script: "npx tsx src/migrate.ts",
      cwd: "./db",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        DB_PATH: "./data/app.db"
      },
      autorestart: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/db-migrate-err.log",
      out_file: "./logs/db-migrate-out.log",
      merge_logs: true
    }
  ]
};
