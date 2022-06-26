require("../db/mongoVotos/mongoVotosClient")
const globalTime = require('global-time')
const Voto = require("../db/mongoVotos/schemas/voto")
const Config = require("../db/mongoVotos/schemas/config")

const {DB_CRYPTO_PASS, DB_CRYPTO_PASS_IV } = require('../config');
const Crypto = require('crypto');
const secret_key = DB_CRYPTO_PASS;
const secret_iv = DB_CRYPTO_PASS_IV;
const algorithm = 'AES-256-CBC';
const key = Crypto.createHash('sha256').update(secret_key, 'utf-8').digest('hex').substring(0,32);
const iv = Crypto.createHash('sha256').update(secret_iv, 'utf-8').digest('hex').substring(0,16);



function decrypt(encryptedText){
    const buffer = Buffer.from(encryptedText, 'base64');
    encryptedText = buffer.toString('utf-8')
    var aesDecrypt = Crypto.createDecipheriv(algorithm, key, iv)
    return aesDecrypt.update(encryptedText, 'base64', 'utf-8') + aesDecrypt.final('utf-8')

}





async function votos(req, res) {

   
    const time = await globalTime();
    const currentTime = new Date(time);

    const dbResponse = await Config.findOne().sort({ created_at: -1 })

    if (!dbResponse || currentTime <= dbResponse.endDate) {
        return res.status(503).send(`Error: Los resultados de la votacion no estan disponible aun`)
    } else {
        const response = await Voto.aggregate([{ "$group": { _id: "$partido", count: { $sum: 1 } } }])
        const responseDecr = response.map(({ _id: partido, count }) => {
            const partidoDecr = decrypt(partido);
            return ({ partido: partidoDecr, count })
        })
        return res.send(responseDecr)
    }

}




module.exports = votos