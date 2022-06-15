const mongoose = require("mongoose")


const haVotadoSchema = new mongoose.Schema({
    _id: { //La ci es el id para asegurar que no habrá id duplicados.
        type: Number,
        required: true
    },
    departamento: {
        type: String,
        required: true
    },
    circuito: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model("haVotado", haVotadoSchema)