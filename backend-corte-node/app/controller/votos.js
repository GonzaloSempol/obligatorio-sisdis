require("../db/mongoVotos/mongoVotosClient")
const rsa = require('node-rsa');
const globalTime = require('global-time')

const Voto = require("../db/mongoVotos/schemas/voto")
const Config = require("../db/mongoVotos/schemas/config")
const { RSA_PUBLIC_PASS } = require('../config');

let publicKey = new rsa();

publicKey.importKey(RSA_PUBLIC_PASS);


async function votos(req, res) {
    const time = await globalTime();
    const currentTime = new Date(time);

    const dbResponse = await Config.findOne().sort({ created_at: -1 })

    if (!dbResponse || currentTime <= dbResponse.endDate) {
        return res.status(503).send(`Error: Los resultados de la votacion no estan disponible aun`)
    } else {
        const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])
        const responseDecr = response.map(({ _id: partido, count }) => {
            const partidoDecr = publicKey.decryptPublic(partido, 'utf8');
            return ({ partido: partidoDecr, count })
        })
        return res.send(responseDecr)
    }

}




module.exports = votos