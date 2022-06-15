const listaPartidos = require("../db/hardcode/partidos")

function partidos(req, res) {
    return res.send(listaPartidos)
}
    
module.exports = partidos