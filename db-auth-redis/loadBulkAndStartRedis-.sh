#!/bin/sh
/usr/local/etc/redis/loadBulk.sh &

echo "INICIANDO REDIS" >> /usr/local/etc/redis/log.txt;
redis-server /usr/local/etc/redis/redis.conf
