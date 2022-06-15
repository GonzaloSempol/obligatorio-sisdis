require("../db/mongoVotos/mongoVotosClient")

const Voto = require("../db/mongoVotos/schemas/voto")



async function votos(req, res) {
    const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])
    console.log(response)
    return res.send(response)
}




module.exports = votos