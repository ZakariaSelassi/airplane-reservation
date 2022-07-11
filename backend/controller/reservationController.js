const asyncHandler = require('express-async-handler');
const Reservation = require('../model/reservationModel');
const Flight = require('../model/flightModel');
const User = require('../model/userModel');
const Seat = require('../model/seatModel')
// @desc create reservtion
// @route post /api/reservation/:id
// @access private
const createReservation = asyncHandler(async (req, res) => {
    // get the current user logged in
    const userID = await User.findById(req.user.id);
    if(!userID) {
        res.status(400);
        throw new Error('User not found');
    }
    // check if the flight exists
    const flightID = await Flight.findById(req.params.flightid);
    if(!flightID) {
        res.status(400);
        throw new Error('Flight not found');
    }
    // check if the seat exists
    const seatId = await Seat.findById(flightID.seat);
    if(!seatId) return res.status(400).json("seat not found")

    // check if reservation exist
    const reservationAlreadyExist = await Reservation.findOne({user: userID, flight: flightID});
    if(reservationAlreadyExist) {
        res.status(400);
        throw new Error('User already made a reservation for this flight');
    }
    // check max capacity of flight is not reached before update capacity and create reservation  
    if(seatId.name === "economy"){
        if(flightID.maxEconomy <= 0){       
            res.status(400)
            throw new Error(`Flight is full`);
        }
        const updateFlightCapacityEconomy = await Flight.findByIdAndUpdate(req.params.flightid,{
            maxEconomy: flightID.maxEconomy - 1
        })

        if(!updateFlightCapacityEconomy) {
            res.status(400);
            throw new Error('Flight not found');
        }
        // create the reservation
        const reservation = await Reservation.create({
        user: userID,
        flight: flightID,
        seat: seatId,
        date_of_reservation: new Date() 
        })
        if(!reservation) {
        res.status(400);
        throw new Error('Reservation not created');
        }
        res.status(201).json(reservation);
    }
    else if (seatId.name === "first"){
        if(flightID.maxBusiness <= 0){
            res.status(400)
            throw new Error(`Flight is full`);
        }
        const updateFlightCapacityBusiness = await Flight.findByIdAndUpdate(req.params.flightid,{
            maxBusiness: flightID.maxBusiness - 1
        })

        if(!updateFlightCapacityBusiness) {
            res.status(400);
            throw new Error('Flight not found');
        }
            // create the reservation
            const reservation = await Reservation.create({
            user: userID,
            flight: flightID,
            seat: seatId,
            date_of_reservation: new Date() 
            })

            if(!reservation) {
            res.status(400);
            throw new Error('Reservation not created');
            }

            res.status(201).json(reservation);
    }   
   /* 
    // check if the user has already made a reservation for this flight
   
    const updateFlightCapacity = await Flight.findByIdAndUpdate(req.params.flightid, {
        capacity: flightID.capacity - 1
    })
    if(!updateFlightCapacity) {
        res.status(400);
        throw new Error('Flight not found');
    }

 */
})
// @desc get user reservations 
// @route post /api/reservation/:id
// @access private
const getUserReservation = asyncHandler(async (req,res) => {

    // get current user 
    const user = await User.findById(req.user.id)
    if(!user) return res.status(400).json('No user found')

    const userReservation = await Reservation.find({
        user: user._id
    })
    console.log(userReservation)
    if(!userReservation) return res.status(400).json('No reservation for this user')

    res.status(200).json({
        message:'user reservations',
        userReservation})
})


const getAllReservation = asyncHandler(async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations);
})

const deleteReservation = asyncHandler(async(req,res) => {
    // check if user loggedIn
    const user = await User.findById(req.user.id)
    if(!user) return res.status(400).json("No user found")

    // check if reservation exist
    const reservationExist = await Reservation.findById(req.params.id)
    if(!reservationExist) {
        res.status(400);
        throw new Error('No reservation found for this flight');
    }
    const flightID = await Flight.findById(reservationExist.flight)
    if(!flightID) return res.status(400).json("Not found flight")
    const seatID = await Seat.findById(reservationExist.seat)
    if(!seatID) return res.status(400).json('Not found seat')


    if(seatID.name === "economy"){
        const updateFlightCapacityEconomy = await Flight.findByIdAndUpdate(flightID._id,{
            maxEconomy: flightID.maxEconomy + 1
        })

        if(!updateFlightCapacityEconomy) {
            res.status(400);
            throw new Error('No change has been apply');
        }
        const deleteReservation = await Reservation.findByIdAndRemove(req.params.id)
        if(!deleteReservation){
            res.status(400);
            throw new Error('Reservation cannot be delete');
        }
        res.status(200).json(reservationExist._id)
    }
    else if (seatID.name === "first"){
        if(flightID.maxBusiness <= 0){
            res.status(400)
            throw new Error(`Flight is full`);
        }
        const updateFlightCapacityBusiness = await Flight.findByIdAndUpdate(flightID._id,{
            maxBusiness: flightID.maxBusiness + 1
        })

        if(!updateFlightCapacityBusiness) {
            res.status(400);
            throw new Error('Flight not found');
        }  
        const deleteReservation = await Reservation.findByIdAndRemove(req.params.id)
        if(!deleteReservation){
            res.status(400);
            throw new Error('Reservation cannot be delete');
        }   
        res.status(200).json(reservationExist._id)

    }

})
module.exports ={
    createReservation,
    deleteReservation,
    getAllReservation,
    getUserReservation
}