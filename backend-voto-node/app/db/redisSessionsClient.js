const redis = require('redis')

//configuramos la conexion con redis seteando puerto y host
const redisSessionsClient = redis.createClient({
    socket:{
        host: 'db-sessions-redis',
        port: 6379,
    },
    legacyMode: true,
    
})
//hacemos la conexion a la base
redisSessionsClient.connect().catch(console.error)

module.exports = redisSessionsClient