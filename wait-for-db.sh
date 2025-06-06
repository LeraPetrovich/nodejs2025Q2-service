#!/bin/bash
until nc -z -v -w30 db 5432; do
  echo "Waiting for database connection..."
  sleep 1
done

echo "Database is up, running migrations..."

npx prisma migrate deploy

echo "Seeding favs if needed..."

npm run seed

echo "Starting app in production mode..."
npm run start:prod
