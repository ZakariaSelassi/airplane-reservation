const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'},
    seat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Seat'},
    date_of_reservation: {
        type: Date,
        required: true,
        default: Date.now
    },
})


module.exports = mongoose.model('Reservation', reservationSchema);