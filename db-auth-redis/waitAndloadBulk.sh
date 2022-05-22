#!/bin/sh
echo "INICIANDO REDIS" >> /usr/local/etc/redis/log.txt;
redis-server /usr/local/etc/redis/redis.conf &
echo "ESPERANDO 10 segundos..." >> /usr/local/etc/redis/log.txt;
sleep 10;
echo "CARGANDO EN BULK!" >> /usr/local/etc/redis/log.txt;
cat bulk-database.txt | redis-cli --pipe >> /usr/local/etc/redis/log.txt;
echo "PRONTO!" >> /usr/local/etc/redis/log.txt;
