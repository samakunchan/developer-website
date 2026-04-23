docker compose down -v &&
docker compose -f compose-dev.yml --env-file docker.env up --build -d &&
echo "Build dev complete...."
