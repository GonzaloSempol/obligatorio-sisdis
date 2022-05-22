const { application } = require('express')
const express = require('express')
const router = express.Router()

//configuramos las rutas

router.post('/', (req, res) => {
    console.log('entro');

    //chequeamos credenciales
    //TODO!!!!

    // const { email, password } = req
    // req.session.email = 'testeo'
    res.send('Hola Cliente! estás logueado!')

})



module.exports = router //exportamos todas las rutas