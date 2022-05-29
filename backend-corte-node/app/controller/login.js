const bcrypt = require("bcryptjs")
const {ADMIN_USER, ADMIN_PASS} = require('../config');


function login (req,res) {
    const {body: {usuario, password}} = req;
    if(usuario===ADMIN_USER){
        bcrypt.compare(password, ADMIN_PASS, function(err, result) {
            if(result){
                req.session.usuario = usuario
                res.send(req.session) 
            }else{
                res.send('user o contraseña incorrecta')
            }
        })
    }else{
        res.send('user o contraseña incorrecta')
    }    
        
    }
    

    

    






module.exports = login