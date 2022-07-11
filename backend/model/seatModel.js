const mongoose = require('mongoose')


const seatSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    price:{
        type: Number,
        require:true,
    }
})


module.exports = mongoose.model('Seat',seatSchema)