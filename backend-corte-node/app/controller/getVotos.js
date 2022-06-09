require("../db/mongoVotos/mongoVotosClient")

const Voto = require("../db/mongoVotos/schemas/voto")



async function getVotos(req, res) {
    const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])
    console.log(response)
    res.send(response)
}




module.exports = getVotos