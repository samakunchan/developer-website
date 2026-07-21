#!/bin/bash

# ==============================================================================
# OpenBao Bootstrap Script
# Usage: ./start-app.sh [stage|prod]
# ==============================================================================

ENV=${1:-stage}
PROJECT_NAME="developer-website-$ENV"
COMPOSE_FILES="-f compose.yml"

if [ "$ENV" = "stage" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-stage.yml"
elif [ "$ENV" = "prod" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-prod.yml"
else
  echo "❌ Unknown environment: $ENV. Use 'stage' or 'prod'."
  exit 1
fi

# Load environment from OpenBao
source ./shells/env-bao.sh $ENV
if [ $? -ne 0 ]; then
  echo "❌ Aborting: Failed to load environment variables from OpenBao."
  exit 1
fi

# Launch Docker Compose
echo "🚀 [Docker] Starting services for $PROJECT_NAME..."
  # In stage/prod, start everything
  docker compose -p $PROJECT_NAME $COMPOSE_FILES up -d --build


echo "✨ Application ($ENV) is starting!"
