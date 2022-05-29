const redisSessionsClient = require('../db/redisSessions/redisSessionsClient')
//Chequeamos si está logueado en toda la app
//Las rutas que esten debajo de este bloque requieren estar logueado

function authenticate(req, res, next) {


    if(!req.session.usuario){
        res.status(401).send('Acceso Denegado')
    }
    next()
}

module.exports = authenticate
