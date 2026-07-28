package:
  name: 'node-express-sqlite-pm2-example'
  version: '1.0.0'

apps:
  - name: 'backend'
    script: 'src/server.ts'
    interpreter: './node_modules/.bin/tsx'
    instances: 1
    exec_mode: 'fork'
    watch: false
    max_memory_restart: 256M
    env:
      - PORT: 3000
      - NODE_ENV: development
    env_production:
      - PORT: 3000
      - NODE_ENV: production

  - name: 'backend:cluster'
    script: 'src/server.ts'
    interpreter: './node_modules/.bin/tsx'
    instances: max
    exec_mode: 'cluster'
    watch: false
    max_memory_restart: 256M
    env_production:
      - PORT: 3000
      - NODE_ENV: production
