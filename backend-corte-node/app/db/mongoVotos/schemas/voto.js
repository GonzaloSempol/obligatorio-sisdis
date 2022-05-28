const mongoose = require ("mongoose")

const votosSchema = new mongoose.Schema({
    //_id será autoincremental
    partido: {
        type:String,
        required:true
    },
    departamento: {
        type: String,
        required: true
    },
    circuito: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model("Votos", votosSchema)