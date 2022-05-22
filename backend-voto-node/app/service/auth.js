const redisAuthClient = require('../db/redisAuthUserClient')

async function login(ci, pass){
    try{
        
        
    }catch(err){
        
    }
    
}

async function getUserbyCI(ci){
    const response = await redisAuthClient.get('1000001')
    return response ? response : Promise.reject('No se encuentra');
}

module.exports = login