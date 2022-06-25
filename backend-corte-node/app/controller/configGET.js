require("../db/mongoVotos/mongoVotosClient")
const globalTime = require('global-time')

const Config = require("../db/mongoVotos/schemas/config")



async function getDateConfig(req, res) {
 try{  
        const time = await globalTime();
        const currentTime = new Date(time);
        //chequeamos que no estemos en un proceso de votacion en este momento.
        const dbResponse = await Config.findOne().sort({created_at: -1})
            
            if(!dbResponse)
                //Disponible para configurar
                return res.send({habilitadoConfigurar: true})
            else if(currentTime >= dbResponse.endDate){
                return res.send({habilitadoVerVotos: true})
            }else{
                //votacion no ha finalizado respondo Unauthorized 
                return res.status(401).send({habilitadoVerVotos: false, startDate: dbResponse.startDate, endDate: dbResponse.endDate});
                
            }
            
            
    } catch(err){
        console.log("Error" + err.message)
        return res.status(503).send("Error")
    }   


}




module.exports = getDateConfig