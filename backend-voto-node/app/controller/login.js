const redisAuthClient = require('../db/redisAuthUserClient')

async function login(req,res, next){

    try{
        const response = await redisAuthClient.get('1000001')
        
        req.session.cliente = 'CLIENTE'
        req.session.resp = response
        res.send('Hola Cliente! estás logueado!')
    
    }catch(err){
        console.error("error al hacer consulta auth")
    }
    
}



module.exports = login