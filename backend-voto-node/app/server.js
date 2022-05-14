const express = require ('express')
const app = express()

app.use(express.json()) //configuramos que reciba jsons

//rutas

//votar
const votarRouter = require('./routes/votar')
app.use('/votar', votarRouter)


app.listen(8080, () => console.log('node - backend votos - Server started'))