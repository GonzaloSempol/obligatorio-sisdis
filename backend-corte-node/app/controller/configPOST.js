require("../db/mongoVotos/mongoVotosClient")
const globalTime = require('global-time')

const Config = require("../db/mongoVotos/schemas/config")

const Voto = require("../db/mongoVotos/schemas/voto")
const haVotado = require("../db/mongoVotos/schemas/haVotado")


function isValidDate(d) {
    return true; //ver como validar fecha!!!!
  }


async function dateConfig(req, res) {
 try{  
        const time = await globalTime();
        const currentTime = new Date(time);
        
        const { body: { startDate, endDate} } = req;

        //chequeamos que la fecha ingresada sea valida
        if(!isValidDate(startDate) || !isValidDate(endDate) || (startDate > endDate)){
            return res.status(503).send(`Fecha invalida`);
            
        }else{
            //chequeamos que no estemos en un proceso de votacion en este momento.
            const dbResponse = await Config.findOne().sort({created_at: -1})
            
            if(!dbResponse){
                const configuration = new Config({ startDate: startDate, endDate: endDate})
                const saveResponse = await configuration.save()
                return res.send("Guardado con exito")
            }else{
                if(currentTime <= dbResponse.endDate && currentTime >= dbResponse.startDate){
                    return res.status(503).send(`Votacion en Curso`);
                }else{
                    
                    //borramos config de votacion anterior
                    const deleteResponseConfig = await Config.deleteMany({});
                    console.log(deleteResponseConfig)
                    //borramos votos anteriores
                    const deleteResponseVotos = await Voto.deleteMany({});
                    console.log(deleteResponseVotos)
                    const deleteResponseHaVotado = await haVotado.deleteMany({});
                    console.log(deleteResponseHaVotado)

                    const configuration = new Config({ startDate: startDate, endDate: endDate})
                    const saveResponse = await configuration.save()
                    return res.send("Guardado con exito")
                }
            }
        }
            
    } catch(err){
        console.log("Error al configurar " + err.message)
        return res.status(503).send("Error al setear configuracion")
    }   


}




module.exports = dateConfig