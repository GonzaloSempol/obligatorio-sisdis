const redisAuthClient = require('../db/redisAuth/redisAuthUserClient')


function login (req,res) {
    const {body: {ci, password}} = req;

    //Version para probar si se puede sacar el legacyMode en el cliente redis
    // try {
    //     const response = await redisAuthClient.get(ci);
    //     if (password === response) {
    //         req.session.ci = ci;
    //         res.send(`Hola cliente ${ci} estas logueado!`);
    //     }else {
    //         res.status(401)
    //     }
    // } catch (error) {
    //     res.status(500).response("An error occurred")
    // }

    
     redisAuthClient.GET(ci, (err,response) => {
         if(err) console.log(err.message)
         if(password == response ){
             req.session.ci = ci
             res.send(req.session) 
             //res.send('Hola Cliente: ' + ci + ' estás logueado!')
            
         }else{
             res.send('ci o contraseña incorrecta')
         }
        
      })

    
}





module.exports = login