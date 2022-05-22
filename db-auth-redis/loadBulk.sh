#!/bin/sh
response=$(redis-cli ping)
while  [ "$response" != "PONG" ]
do
    response=$(redis-cli ping);
    echo "ESPERANDO que redis levante...";
    sleep 1;
done

echo "REDIS LEVANTADO!";
echo "CARGANDO EN BULK!";
cat bulk-database.txt | redis-cli --pipe;
echo "PRONTO!";