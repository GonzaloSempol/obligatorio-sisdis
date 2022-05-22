const express = require('express')
const router = express.Router()

//configuramos las rutas

router.get('/', (req, res) => {
	console.log('entroo')
	res.send('Hola! Votar!')

})



module.exports = router //exportamos todas las rutas