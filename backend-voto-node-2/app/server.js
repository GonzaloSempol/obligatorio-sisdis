const express = require('express')
const session = require('./middleware/session')
const router = require('./routes')
const cors = require('cors')


const app = express()


//configuramos que la app reciba jsons
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

//configuracion de la session y las cookies
app.use(session)

//para que funcione estando detrás de nginx
//app.set('trust proxy', 1); 

/////////////////////rutas//////////////////////////
app.use(router)

//creamos el server
app.listen(8080, () => console.log('node - backend votos - Server started'))
