docker compose -p developer-website-dev down -v &&
docker compose -p developer-website-dev -f compose.yml -f compose-dev.yml --env-file docker.env up --build -d &&
echo "Build dev complete...."
