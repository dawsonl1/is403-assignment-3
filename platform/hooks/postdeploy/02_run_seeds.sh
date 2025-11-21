#!/usr/bin/env bash
# .platform/hooks/postdeploy/02_run_seeds.sh

# Exit script on any error
set -e

echo "===== Running Knex seeds on Beanstalk instance ====="

# Move into the app directory
cd /var/app/current

# Ensure node_modules exists (Beanstalk handles npm install earlier)
if [ ! -d "node_modules" ]; then
  echo "node_modules missing — cannot run seeds."
  exit 1
fi

# Run knex seed:run using the production environment automatically
./node_modules/.bin/knex seed:run --env production

echo "===== Finished running Knex seeds ====="