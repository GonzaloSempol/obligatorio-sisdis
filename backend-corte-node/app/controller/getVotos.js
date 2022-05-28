require("../db/mongoVotos/mongoVotosClient")
const mongoose = require("mongoose")
const Voto = require("../db/mongoVotos/schemas/voto")
const HaVotado = require("../db/mongoVotos/schemas/haVotado")
const partidos = require("../db/hardcode/partidos")
const departamentos = require("../db/hardcode/departamentos")
const circuitos = require("../db/hardcode/circuitos")


async function getVotos(req, res){
    const response = await Voto.aggregate([{"$group" : {_id:"$partido", count:{$sum:1}}}])
    console.log(response)
    res.send(response)
}




module.exports = getVotos