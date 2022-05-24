
//Chequeamos si está logueado en toda la app
//Las rutas que esten debajo de este bloque requieren estar logueado

function authenticate(req, res, next) {
    if(!req.session || !req.session.usuario){
        const err = new Error('Acceso Denegado')
        err.statusCode = 401
        next(err)
    }
    next()
}

module.exports = authenticate
