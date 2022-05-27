const redis = require('redis');

// configuramos la conexion con redis seteando puerto y host
const redisAuthClient = redis.createClient({
  socket: {
    host: 'db-auth-redis',
    port: 6379,
  },
  legacyMode: true,

});

redisAuthClient.on('error', (err) => {
  console.log(err.message);
});
redisAuthClient.on('connect', () => {
  console.log('Conectado a db-auth-redis');
});
redisAuthClient.on('ready', () => {
  console.log('db-auth-redis listo para usar...');
});
redisAuthClient.on('end', () => {
  console.log('db-auth-redis desconectado');
});
// hacemos la conexion a la base
redisAuthClient.connect().catch(console.error);

module.exports = redisAuthClient;
