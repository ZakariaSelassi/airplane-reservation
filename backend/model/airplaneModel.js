const mongoose = require('mongoose')

const airplaneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Airplane', airplaneSchema)