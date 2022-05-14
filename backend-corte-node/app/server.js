const express = require ('express')
const app = express()

app.use(express.json()) //configuramos que reciba jsons

//rutas

//votar
const leerVotosRouter = require('./routes/leerVotos')
app.use('/leerVotos', leerVotosRouter)


app.listen(8081, () => console.log('node - backend corte - Server started'))