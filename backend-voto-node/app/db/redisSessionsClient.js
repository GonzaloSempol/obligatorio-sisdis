const redis = require('redis');

// configuramos la conexion con redis seteando puerto y host
const redisSessionsClient = redis.createClient({
  socket: {
    host: 'db-sessions-redis',
    port: 6379,
  },
  legacyMode: true,

});

redisSessionsClient.on('error', (err) => {
  console.log(err.message);
});
redisSessionsClient.on('connect', () => {
  console.log('Conectado a db-sessions-redis');
});
redisSessionsClient.on('ready', () => {
  console.log('db-sessions-redis listo para usar...');
});
redisSessionsClient.on('end', () => {
  console.log('db-sessions-redis desconectado');
});
// hacemos la conexion a la base
redisSessionsClient.connect().catch(console.error);

module.exports = redisSessionsClient;
