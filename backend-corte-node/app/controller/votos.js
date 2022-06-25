require("../db/mongoVotos/mongoVotosClient")
const globalTime = require('global-time')

const Voto = require("../db/mongoVotos/schemas/voto")



async function votos(req, res) {
    const time = await globalTime();
    const currentTime = new Date(time);
    const availableTime = new Date("2022-06-21T20:25:00.000-03:00");
    const isAvailable = currentTime >= availableTime;

    if (!isAvailable) {
        return res.status(503).send(`Error: Los resultados de la votacion no estan disponible aun`)
    }
    const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])

    return res.send(response)
}




module.exports = votos