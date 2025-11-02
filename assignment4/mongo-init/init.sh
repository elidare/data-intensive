#!/bin/bash
echo "========= Running init.sh"

# Replace placeholders manually using sed
sed -e "s/\${MONGO_INITDB_DATABASE}/${MONGO_INITDB_DATABASE}/g" \
    /docker-entrypoint-initdb.d/init.js.template \
    > /docker-entrypoint-initdb.d/init.js

mongosh --quiet --file /docker-entrypoint-initdb.d/init.js
