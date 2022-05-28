const bcrypt = require ("bcryptjs")
fs = require('fs');


const saltRounds = 10;

    
let lineas = [];
for(let i=0;i<50;i++){
    const user = 1000000 + i;
    const pass = `contrasenia${i}`;
    
    
    const hash = bcrypt.hashSync(pass, saltRounds)
    const linea = `SET ${user} "${hash}"\n`
    lineas.push(linea)
   
    fs.writeFile('../bulk-database.txt', lineas.join(''), function (err) {
        if (err) return console.log(err);
      });

}