const mongoVotosClient = require("mongoose")


//Sacar claves hardcodeadas
mongoVotosClient.connect("mongodb://root:root@db-votos-mongo:27017",{"dbName":"votos"}).catch(error => console.log("Error conectando a db-votos-mongo!!!"))


mongoVotosClient.connection.on('error', err => {
    console.log("Error en conexion db-votos-mongo:"+ err);
})
mongoVotosClient.connection.on('connected', () => {
    console.log("Conectado a db-votos-mongo")
})
mongoVotosClient.connection.on('open', (err) => {
    console.log("db-votos-mongo listo para usar...")
})
mongoVotosClient.connection.on('close', (err) => {
    console.log("db-votos-mongo desconectado")
})


exports.module = mongoVotosClient