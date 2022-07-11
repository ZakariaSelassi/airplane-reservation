const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
    airplane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airplane',
        required: true
    },
    // all seats are stored in array 
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type:String,
        required: true
    },
    to: {
        type:String,
        required: true
    },
    departurDate: {
        type: Date,
        required: true
    },
    departurTime: {
        type: String,
        required: true
    },
    maxEconomy:{
        type: Number,
        required: true
    },
    maxBusiness:{
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Flight', flightSchema)