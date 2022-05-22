const redisAuthClient = require('../db/redisAuthUserClient')

function login(req,res, next){


    req.session.cliente = 'CLIENTE'
    res.send('Hola Cliente! estás logueado!')

}

module.exports = login