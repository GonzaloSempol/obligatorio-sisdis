const redisAuthClient = require('../db/redisAuthUserClient')


function login (req,res) {
    const {body: {usuario, password}} = req;

    // try {
    //     const response = await redisAuthClient.get(usuario);
    //     if (password === response) {
    //         req.session.usuario = usuario;
    //         res.send(`Hola cliente ${usuario} estas logueado!`);
    //     }else {
    //         res.status(401)
    //     }
    // } catch (error) {
    //     res.status(500).response("An error occurred")
    // }

    
     redisAuthClient.GET(usuario, (err,response) => {
         if(err) console.log(err.message)
         if(password == response ){
             req.session.usuario = usuario
             res.send(req.session) 
             //res.send('Hola Cliente: ' + usuario + ' estás logueado!')
            
         }else{
             res.send('Usuario o contraseña incorrecta')
         }
        
      })

    
}





module.exports = login