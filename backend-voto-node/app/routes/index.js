const express = require('express')
const router = express.Router();
const autenticar = require('../middleware/authenticate')
const loginController = require('../controller/login')
const votarController = require('../controller/votar')



router.post('/login', loginController)

//las rutas debajo de esta están protegidas
//Solo pueden ser accedidas por usuarios logueados.
router.use(autenticar) 


router.get('/votar', votarController)




module.exports = router