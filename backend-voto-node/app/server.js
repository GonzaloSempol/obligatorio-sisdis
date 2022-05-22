const express = require ('express')
const session = require('express-session')
const redis = require('redis')
const connectRedis = require('connect-redis')

const app = express()



//conectamos el manejo de las sesiones con redis, 
//requerido por la libreria express-sessions
const RedisStore = connectRedis(session) 

//configuramos la conexion con redis seteando puerto y host
const redisClient = redis.createClient({
    socket:{
        host: 'db-auth-redis',
        port: 6379,
    },
    legacyMode: true,
    
})
redisClient.connect().catch(console.error)

//configuracion de la session y las cookies
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: 'mipassword123',
    saveUninitialized: false, //no guardar si no está inicializada la sesion
    resave: false, //no guardar si no hay cambios
    cookie: { //COOKIE-FLAGS
        secure: false,//solo responder por https si va en true, HAY QUE HABILITARLO LUEGO
        httpOnly: true, //prevenir XSS, que javascript no lea las cookies
        maxAge: 1000 * 60 * 5 //tiempo de las sesiones
    }

}))

//app.set('trust proxy', 1); //para que funcione estando detrás de nginx

app.use(express.json()) //configuramos que la app reciba jsons

/////////////////////rutas//////////////////////////

app.post('/login', (req, res) => {
 
    req.session.cliente = 'CLIENTE!'
    res.send('Hola Cliente! estás logueado!')
    
})

//Chequeamos si está logueado en toda la app
//Las rutas que esten debajo de este bloque requieren estar logueado
app.use((req, res, next) => {
    if(!req.session || !req.session.cliente){
        const err = new Error('Acceso Denegado')
        err.statusCode = 401
        next(err)
    }
    next()

})

app.get('/votar', (req, res) => {
    res.send('Hola! Votar!') 
})



//creamos el server
app.listen(8080, () => console.log('node - backend votos - Server started'))
