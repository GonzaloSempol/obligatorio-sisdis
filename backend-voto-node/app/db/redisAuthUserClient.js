const redis = require('redis')

//configuramos la conexion con redis seteando puerto y host
const redisAuthClient = redis.createClient({
    socket:{
        host: 'db-auth-redis',
        port: 6379,
    },
    legacyMode: true,
    
})

//hacemos la conexion a la base
redisAuthClient.connect().catch(console.error)

module.exports = redisAuthClient