#!/bin/bash
set -e

docker-compose down
docker-compose -f docker-compose.yaml up -d --build

# chmod +x reset.sh
# ./reset.sh
