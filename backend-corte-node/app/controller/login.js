
const {ADMIN_USER, ADMIN_PASS} = require('../config');


function login (req,res) {
    const {body: {usuario, password}} = req;

    if(usuario===ADMIN_USER && password ===ADMIN_PASS){
        req.session.usuario = usuario
        res.send(req.session) 
         }else{
             res.send('user o contraseña incorrecta')
         }
        
      }

    






module.exports = login