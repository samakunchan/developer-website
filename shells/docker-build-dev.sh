docker compose down -v &&
docker compose -f compose.yml -f compose-dev.yml --env-file docker.env up --build -d &&
echo "Build dev complete...."
