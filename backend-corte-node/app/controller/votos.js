require("../db/mongoVotos/mongoVotosClient")
const globalTime = require('global-time')

const Voto = require("../db/mongoVotos/schemas/voto")
const Config = require("../db/mongoVotos/schemas/config")


async function votos(req, res) {
    const time = await globalTime();
    const currentTime = new Date(time);
    
    const dbResponse = await Config.findOne().sort({created_at: -1})
            
    if(!dbResponse || currentTime <= dbResponse.endDate ){
        return res.status(503).send(`Error: Los resultados de la votacion no estan disponible aun`)
    }else{
        const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])
        return res.send(response)
    }
    

    
}




module.exports = votos