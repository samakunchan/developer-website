#!/bin/bash

# ==============================================================================
# OpenBao Bootstrap Script
# Usage: ./start-app.sh [dev|prod]
# ==============================================================================

ENV=${1:-dev}
PROJECT_NAME="developer-website-$ENV"
COMPOSE_FILES="-f compose.yml"

if [ "$ENV" == "dev" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-dev.yml"
elif [ "$ENV" == "prod" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-prod.yml"
else
  echo "❌ Unknown environment: $ENV. Use 'dev' or 'prod'."
  exit 1
fi

# Load environment from OpenBao
source ./shells/env-bao.sh $ENV

# Launch Docker Compose
echo "🚀 [Docker] Starting services for $PROJECT_NAME..."
if [ "$ENV" == "dev" ]; then
  # In dev, only start the database
  docker compose -p $PROJECT_NAME $COMPOSE_FILES up -d --build postgresdb
else
  # In prod, start everything
  docker compose -p $PROJECT_NAME $COMPOSE_FILES up -d --build
fi


echo "✨ Application ($ENV) is starting!"
