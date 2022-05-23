function login(req,res, next){

    const {user, pass} = req;
    req.session.cliente = 'CLIENTE'
    res.send('Hola Cliente! estás logueado!')

}

module.exports = login