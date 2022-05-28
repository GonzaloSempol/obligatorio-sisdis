const redisAuthClient = require('../db/redisAuth/redisAuthUserClient')


function login (req,res) {
    const {body: {usuario, password}} = req;


     redisAuthClient.GET(usuario, (err,response) => {
         if(err) console.log(err.message)
         if(password == response ){
             req.session.usuario = usuario
             res.send(req.session) 
             
            
         }else{
             res.send('user o contraseña incorrecta')
         }
        
      })

    
}





module.exports = login