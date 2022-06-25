const mongoose = require("mongoose")


const configSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

})

module.exports = mongoose.model("config", configSchema)