const redisAuthClient = require('../db/redisAuthUserClient')

function login(req,res){
   
    
   
    redisAuthClient.GET(req.body.usuario, (err,response) => {
        if(err) console.log(err.message)
        if(req.body.password == response ){
            req.session.usuario = req.body.usuario 
            res.send('Hola Cliente: ' + req.body.usuario + ' estás logueado!')
            
        }else{
            res.send('Usuario o contraseña incorrecta')
        }
        
     })

    
}





module.exports = login