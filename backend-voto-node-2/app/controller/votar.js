require("../db/mongoVotos/mongoVotosClient")
const mongoose = require("mongoose")
const Voto = require("../db/mongoVotos/schemas/voto")
const HaVotado = require("../db/mongoVotos/schemas/haVotado")
const partidos = require("../db/hardcode/partidos")
const departamentos = require("../db/hardcode/departamentos")
const circuitos = require("../db/hardcode/circuitos")
const Config = require("../db/mongoVotos/schemas/config")
const globalTime = require('global-time')


async function votar(req, res, next) {

    if(await esVotacionEnCurso()){

    
        const { body: { partido, departamento, circuito } } = req;

        const responseHaVotado = await chequearHaVotado(req.session.ci);

        let session = null
        if (esPartidoValido(partido) && esCircuitoValido(circuito) && esDepartamentoValido(departamento)) {
            if (!responseHaVotado) {

                mongoose.startSession().then((_session) => {
                    session = _session
                    _session.withTransaction(() => {
                        insertarVoto(partido, departamento, circuito)
                        insertarHaVotado(req.session.ci, departamento, circuito)
                    })
                }).then(() => session.commitTransaction())
                    .then(() => session.endSession())
                    .catch((err) => { console.log(err) })

                return res.send(`${req.session.ci} ha votado correctamente al partido ${partido} en el departamento ${departamento} y circuito ${circuito}`)
            } else {
            return res.status(409).send(`Error: ${req.session.ci} Ya ha votado`)
            }
        } else {
            return res.status(409).send(`Error: Partido Departamento o Circuito invalido`)
        }
    }else{
        return res.status(409).send(`Error: No hay votación en curso`)
    }



}



async function insertarVoto(partido, departamento, circuito) {
    try {
        const voto = new Voto({ partido: partido, departamento: departamento, circuito: circuito })
        const response = await voto.save()
        console.log("response:" + response)
    } catch (err) {
        console.log("Error al insertar voto: " + err.message)
        console.log("Error detalle: " + err.error.age)
    }
}

async function chequearHaVotado(ci) {
    try {
        return HaVotado.findById(ci);
    } catch (err) {
        console.log("Error al buscar si ha votado: " + err.message)
    }
}
async function insertarHaVotado(ci, departamento, circuito) {
    try {
        const haVotado = new HaVotado({ _id: ci, departamento: departamento, circuito: circuito })
        const response = await haVotado.save()
        console.log("response:" + response)
    } catch (err) {
        console.log("Error al insertar que ha votado: " + err.message)
    }
}

function esPartidoValido(partido) {
    return partidos.includes(partido)

}
function esDepartamentoValido(departamento) {
    return departamentos.includes(departamento)

}
function esCircuitoValido(circuito) {

    return circuitos.includes(circuito)


}


////


async function esVotacionEnCurso() {
 try{  
        const time = await globalTime();
        const currentTime = new Date(time);
        //chequeamos que estemos en un proceso de votacion en este momento.
        const dbResponse = await Config.findOne().sort({created_at: -1})
            
            
            if( currentTime >= dbResponse.startDate && currentTime <= dbResponse.endDate ){
                return true;
            }
            return false;
            
    } catch(err){
        console.log("Error" + err.message)
        return false;
    }   


}






////




module.exports = votar