#!/bin/bash

# Determine environment (default to dev)
ENV=${1:-dev}

if [ "$ENV" = "prod" ]; then
    ENV_FILE="docker-prod.env"
    echo "🚀 Seeding PRODUCTION database (Port 5436)..."
else
    ENV_FILE="docker.env"
    echo "🛠️ Seeding DEVELOPMENT database (Port 5435)..."
fi

# Check if env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE not found."
    exit 1
fi

# Load variables
export $(grep -v '^#' $ENV_FILE | xargs)

# Construct DATABASE_URL for host access
export DATABASE_URL="postgresql://${POSTGRES_USER_ENCODED}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT_EXTERNAL}/${POSTGRES_DB}?schema=public"

# Run Seed command
yarn tsx prisma/seed.ts
