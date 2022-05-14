const express = require('express')
const router = express.Router()

//configuramos las rutas

router.get('/', (req,res) => {
	res.send('Hola! Leer Votos')

})



module.exports = router //exportamos todas las rutas