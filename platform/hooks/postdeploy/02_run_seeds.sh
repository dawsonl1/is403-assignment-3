#!/usr/bin/env bash
# .platform/hooks/postdeploy/02_run_seeds.sh

set -e
echo "===== Running Knex migrations and seeds on Beanstalk ====="

cd /var/app/current

# Ensure node_modules exists
if [ ! -d "node_modules" ]; then
  echo "node_modules missing — cannot run migrations or seeds."
  exit 1
fi

# Run migrations FIRST
./node_modules/.bin/knex migrate:latest --env production

# Run seeds SECOND
./node_modules/.bin/knex seed:run --env production

echo "===== Finished migrations + seeds ====="