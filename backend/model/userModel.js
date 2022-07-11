const mongoose = require('mongoose');


const userSchema = new  mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // email must be unique
    },
    password: {
        type: String,
        required: true

    },
    phone: {
        type: String,
        required: true

    },
    dob:{
        type: Date,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    customerId:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);