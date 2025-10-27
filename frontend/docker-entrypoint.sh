#!/bin/sh
set -e

echo "Waiting for database..."
sleep 3

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Generating Prisma Client..."
npx prisma generate

echo "Starting application..."
exec "$@"
