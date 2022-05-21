const { application } = require('express')
const express = require('express')
const router = express.Router()

//configuramos las rutas

router.post('/login', (req,res) => {
    
    //chequeamos credenciales
	//TODO!!!!
    
    req.session.cliente = 'CLIENTE!'
    res.send('Hola Cliente! estás logueado!')

})



module.exports = router //exportamos todas las rutas