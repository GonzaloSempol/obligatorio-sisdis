const bcrypt = require("bcryptjs")
const {ADMIN_USER, ADMIN_PASS} = require('../config');


async function login (req,res) {
    const {body: {usuario, password}} = req;
    if(usuario===ADMIN_USER){
        const result = await bcrypt.compare(password, ADMIN_PASS)
        if(result){
            req.session.usuario = usuario
            return res.send("Logueado con exito") 
        }
       
    }
    
   return res.status(401).send('user o contraseña incorrecta')
    
        
    }
    

    

    






module.exports = login