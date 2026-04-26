docker compose -p developer-website-prod down -v &&
docker compose -p developer-website-prod -f compose.yml -f compose-prod.yml --env-file docker-prod.env up --build -d &&
echo "Build prod complete...."
