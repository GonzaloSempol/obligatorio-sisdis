const redis = require('redis')

//configuramos la conexion con redis seteando puerto y host
const redisSessionsClient = redis.createClient({
    socket:{
        host: 'db-sessions-redis',
        port: 6379,
    },
    legacyMode: true,
    
})

module.exports = redisSessionsClient