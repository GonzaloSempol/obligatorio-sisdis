require("../db/mongoVotos/mongoVotosClient")
const mongoose = require("mongoose")
const Voto = require("../db/mongoVotos/schemas/voto")
const HaVotado = require("../db/mongoVotos/schemas/haVotado")
const partidos = require("../db/hardcode/partidos")
const departamentos = require("../db/hardcode/departamentos")
const circuitos = require("../db/hardcode/circuitos")



async function votar(req,res, next){
    
    const {body: {partido, departamento, circuito}} = req;
   
    const responseHaVotado = await chequearHaVotado(req.session.ci);
    
    let session = null
    if(esPartidoValido(partido) && esCircuitoValido(circuito) && esDepartamentoValido(departamento) ){
        if(!responseHaVotado){
        
            mongoose.startSession().then((_session)=> {
                session=_session
                _session.withTransaction(() => {
                    insertarVoto(partido, departamento, circuito)
                    insertarHaVotado(req.session.ci, departamento, circuito)
                })
            }).then(() => session.commitTransaction())
            .then(() => session.endSession())
            .catch((err) => {console.log(err)})
            
            res.send(`${req.session.ci} ha votado correctamente al partido ${partido} en el departamento ${departamento} y circuito ${circuito}`) 
        }else{
            res.send(`Error: ${req.session.ci} Ya ha votado`) 
        }
    }else{
        res.send(`Error: Partido Departamento o Circuito invalido`) 
    }
     
    
    

}



async function insertarVoto(partido, departamento, circuito){
    try{
        const voto = new Voto( { partido: partido, departamento: departamento, circuito: circuito })
        const response = await voto.save()
        console.log("response:"+response)
    }catch(err){
        console.log("Error al insertar voto: " + err.message )
        console.log("Error detalle: " + err.error.age )
    }
}

async function chequearHaVotado(ci){
    try{
          return HaVotado.findById(ci);
    }catch(err){
        console.log("Error al buscar si ha votado: " + err.message )
    }
}
async function insertarHaVotado(ci, departamento, circuito){
    try{
        const haVotado = new HaVotado( { _id: ci, departamento: departamento, circuito: circuito })
        const response = await haVotado.save()
        console.log("response:"+response)
    }catch(err){
        console.log("Error al insertar que ha votado: " + err.message )
    }
}

function esPartidoValido(partido){
    return partidos.includes(partido)
        
}
function esDepartamentoValido(departamento){
    return departamentos.includes(departamento)
        
}
function esCircuitoValido(circuito){

    return circuitos.includes(circuito)
    
        
}




module.exports = votar