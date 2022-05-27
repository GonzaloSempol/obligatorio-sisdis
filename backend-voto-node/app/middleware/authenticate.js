const redisSessionsClient = require('../db/redisSessionsClient')
//Chequeamos si está logueado en toda la app
//Las rutas que esten debajo de este bloque requieren estar logueado

function authenticate(req, res, next) {

    console.log("req")
    console.log(req)
    console.log("req.session")
    console.log(req.session)
    if(!req.session.usuario){
        const err = new Error('Acceso Denegado')
        err.statusCode = 401
        next(err)
    }
    next()
}

module.exports = authenticate
