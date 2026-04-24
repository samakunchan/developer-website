docker compose down -v &&
docker compose -f compose.yml -f compose-prod.yml --env-file docker-prod.env up --build -d &&
echo "Build prod complete...."
