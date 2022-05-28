const bcrypt = require("bcryptjs")
const redisAuthClient = require('../db/redisAuth/redisAuthUserClient')


function login (req,res) {
    const {body: {ci, password}} = req;

       
     redisAuthClient.GET(ci, (err,response) => {
         if(err) console.log(err.message)
         if(response){
            console.log("response:" , response)
            bcrypt.compare(password, response, function(err, result) {
                console.log("result:" , result)
                if(result){
                    
                    req.session.ci = ci
                    res.send(req.session) 
                }else{
                    res.send('ci o contraseña incorrecta')
                }
            });
         }
         
         else{
             res.send('ci o contraseña incorrecta')
         }
        
      })

    
}





module.exports = login