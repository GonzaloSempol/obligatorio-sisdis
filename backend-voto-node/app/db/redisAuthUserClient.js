const redis = require('redis')

//configuramos la conexion con redis seteando puerto y host
const redisAuthClient = redis.createClient({
    socket:{
        host: 'db-auth-redis',
        port: 6379,
    },
    legacyMode: true,
    
})

module.exports = redisAuthClient