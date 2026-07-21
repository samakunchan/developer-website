#!/bin/bash

# ==============================================================================
# OpenBao Stop Script
# Usage: ./shells/stop-app.sh [stage|prod]
# ==============================================================================

ENV=${1:-stage}
PROJECT_NAME="developer-website-$ENV"
COMPOSE_FILES="-f compose.yml"

if [ "$ENV" == "stage" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-stage.yml"
elif [ "$ENV" == "prod" ]; then
  COMPOSE_FILES="$COMPOSE_FILES -f compose-prod.yml"
fi

# Load environment from OpenBao (to avoid warnings about empty variables)
# We use '|| true' because even if OpenBao is down, we want to try stopping the containers
source ./shells/env-bao.sh $ENV || echo "⚠️ Could not reach OpenBao, stopping with empty vars..."

echo "🛑 [Docker] Stopping services for $PROJECT_NAME..."
docker compose -p $PROJECT_NAME $COMPOSE_FILES down -v

echo "✅ Done."
