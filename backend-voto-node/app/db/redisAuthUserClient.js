const { promisify } = require('util');
const redis = require('redis');

// configuramos la conexion con redis seteando puerto y host

// const redisAuthClient = redis.createClient('db-auth-redis', 6379, {});
const redisAuthClient = redis.createClient({
  socket: {
    host: 'db-auth-redis',
    port: 6379,
  },
  // legacyMode: true,

});

redisAuthClient.connect().catch(console.error);

redisAuthClient.on('connect', () => {
  console.log('Conectado a db-auth-redis');
});

redisAuthClient.on('ready', () => {
  console.log('db-auth-redis listo para usar...');
});

redisAuthClient.on('end', () => {
  console.log('db-auth-redis desconectado');
});

redisAuthClient.on('error', (err) => {
  console.log('test');
  console.log(err.message);
});
// hacemos la conexion a la base

const authGet = promisify(redisAuthClient.get).bind(redisAuthClient);
const authSet = promisify(redisAuthClient.set).bind(redisAuthClient);

module.exports = { authGet, authSet };
