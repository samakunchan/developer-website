docker compose down -v &&
docker compose -f compose-prod.yml --env-file docker.env up --build -d &&
echo "Build prod complete...."
