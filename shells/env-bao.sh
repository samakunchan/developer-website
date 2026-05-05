#!/bin/bash

# ==============================================================================
# OpenBao Environment Helper
# This script fetches secrets and sets up DATABASE_URL for local and Docker use.
# Usage: source ./shells/env-bao.sh [dev|prod]
# ==============================================================================

ENV=${1:-dev}

# 1. Configuration (Bootstrap)
BAO_ADDR="http://localhost:8200"
BAO_ROLE_ID="6a7de52f-0357-a783-7f5b-c99d14abf8aa"
BAO_SECRET_ID="c020439c-c2ce-03ca-868d-7543f0b39b92"
BAO_PATH="secret/data/developer-website"

# Adjust BAO_ADDR if running inside Docker
if [ "$DOCKER" = "true" ]; then
    BAO_ADDR="http://host.docker.internal:8200"
fi

# 2. Login and Fetch Secrets
LOGIN_RES=$(curl -s -X POST -H "Content-Type: application/json" \
  -d "{\"role_id\":\"$BAO_ROLE_ID\", \"secret_id\":\"$BAO_SECRET_ID\"}" \
  "$BAO_ADDR/v1/auth/approle/login")

TOKEN=$(echo $LOGIN_RES | jq -r .auth.client_token)

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Error: Failed to login to OpenBao."
  return 1 2>/dev/null || exit 1
fi

SECRETS_JSON=$(curl -s -H "X-Vault-Token: $TOKEN" "$BAO_ADDR/v1/$BAO_PATH")

# Export all secrets to current shell
eval $(echo $SECRETS_JSON | jq -r '.data.data | to_entries | .[] | "export \(.key)=\"\(.value)\""')

# 3. Construct DATABASE_URL
if [ "$DOCKER" = "true" ]; then
    export DATABASE_URL="postgresql://${POSTGRES_USER_ENCODED}:${POSTGRES_PASSWORD}@postgresdb:5432/${POSTGRES_DB}?schema=public"
else
    PORT=$([ "$ENV" = "prod" ] && echo "5436" || echo "5435")
    export DATABASE_URL="postgresql://${POSTGRES_USER_ENCODED}:${POSTGRES_PASSWORD}@localhost:${PORT}/${POSTGRES_DB}?schema=public"
fi

# Also export OpenBao details for the app to use
export BAO_ADDR=$BAO_ADDR
export BAO_ROLE_ID=$BAO_ROLE_ID
export BAO_SECRET_ID=$BAO_SECRET_ID
export BAO_PATH=$BAO_PATH
