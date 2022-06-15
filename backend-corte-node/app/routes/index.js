const express = require('express')
const router = express.Router();
const autenticar = require('../middleware/authenticate')
const loginController = require('../controller/login')
const votosController = require('../controller/votos')



router.post('/login', loginController)

//las rutas debajo de esta están protegidas
//Solo pueden ser accedidas por usuarios logueados.
router.use(autenticar)


router.get('/votos', votosController)




module.exports = router