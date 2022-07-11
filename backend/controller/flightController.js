const asyncHandler = require('express-async-handler');
const Flight = require('../model/flightModel');
const User = require('../model/userModel');
const Airline = require('../model/airplaneModel')
const Seat = require('../model/seatModel')
// @desc create flight
// @route post /api/flights
// @access private , admin
const createFlight = asyncHandler(async (req, res) => {

    const {name,from,to,departurDate,departurTime,maxEconomy,maxBusiness} = req.body

    const user = await User.findById(req.user.id)
    if(!user) return res.status(400).json("User not found")
    if(user.isAdmin){
        
        if(!name || !from || !to || !departurDate || !departurTime || !maxBusiness || ! maxEconomy)
        {
            return res.status(400).json("complete all field")
        }
        const airplane = await Airline.findById(req.params.idAirplane)
        if(!airplane) return res.status(400).json("Airplane not found")
        const seat = await Seat.findById(req.params.idSeat)
        if(!seat) return res.status(400).json("Seat not found")

        const flight = await Flight.create({
            name,
            from,
            to,
            departurDate,
            departurTime,
            maxEconomy,
            maxBusiness,
            airplane:req.params.idAirplane,
            seat:[req.params.idSeat]
        })
       
        return res.status(200).json({
            message:"Flight created successfully",
            flight,
            airplane:airplane.name,
            price: seat.price
        })
    }else{
        res.status(400)
        throw new Error("you are not allowed to add flight")
    }
})
// @desc get all flights
// @route get /api/flights
// @access private , admin or user
const getAllFlights = asyncHandler(async (req, res) => {
    // get current user logged in

    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }

    const flights = await Flight.find({})
    if(!flights){
        res.status(400)
        throw new Error("flights not found")
    }
    // get airplane 
    const airplanes = await Airline.find({})
    if(!airplanes){
        res.status(400)
        throw new Error("airplanes not found")
    }

    /**
     * @desc store flight with corresponding company
     * loop through all plane then loop through airplane if flight.airplane.id == airplane.id push the airplane with his name
     */
    const flightsWithAirplane = []
    for(let i = 0; i < flights.length; i++){
        for(let j = 0; j < airplanes.length; j++){
            if(flights[i].airplane._id.toString() === airplanes[j]._id.toString()){
                flightsWithAirplane.push({
                    ...flights[i]._doc,
                    airplane: airplanes[j].name,
                })
            }
        }
    }
    return res.status(200).json({
        message:"flights found",
        flightsWithAirplane
    })

})
// @desc get flight by id
// @route get /api/flights/:id
// @access private , admin or user
const getFlightById = asyncHandler(async (req, res) => {
    const userID = await User.findById(req.user.id);

    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }

    const currentFlight = await Flight.findById(req.params.id)
    if(!currentFlight){
        res.status(400)
        throw new Error("flight not found")
    }
    const seatPrice = await Seat.findById(currentFlight.seat)
    const airplane = await Airline.findById(currentFlight.airplane._id)
    if(!airplane){
        res.status(400)
        throw new Error("airplane not found")
    }
    return res.status(200).json({
        message:"flight found",
        currentFlight,
        companyName:airplane.name,
        flightPrice:seatPrice.price
    })

})


// @desc get all seats of flight
// @route get /api/flights/:id
// @access private , admin or user

const getAllSeatsOfFlight = asyncHandler(async (req, res) => {

    const userID = await User.findById(req.user.id);

    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }

    const currentFlight = await Flight.findById(req.params.id)
    if(!currentFlight){
        res.status(400)
        throw new Error("flight not found")
    }
    const seats = await Seat.find({})
    if(!seats){
        res.status(400)
        throw new Error("seats not found")
    }
    const airplane = await Airline.findById(currentFlight.airplane._id)
    if(!airplane){
        res.status(400)
        throw new Error("airplane not found")
    }
    return res.status(200).json({
        message:"seats found",
        seats,
        companyName:airplane.name
    })

})


// @desc update flight
// @route update /api/flights/:id
// @access private , only admin can update flight
const updateFlight = asyncHandler(async (req, res) => {

    const {name,from,to,date,time,price,capacity} = req.body
    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }
    const flight = await Flight.findById(req.params.id)
    if(!flight){
        res.status(400)
        throw new Error("flight not found")
    }
    if(userID.isAdmin){
        const updateFlight = await Flight.findByIdAndUpdate(flight,{
            name,
            from,
            to,
            date,
            time,
            price,
            capacity
        },{new:true})
        if(!updateFlight){
            res.status(400)
            throw new Error("flight not updated")
        }
        res.status(200).json(updateFlight)
    }else{
        res.status(400)
        throw new Error("you are not allowed to update flight")
    }
})
// @desc delete flight
// @route delete /api/flights/:id
// @access private , only admin can delete flight
const deleteFlight = asyncHandler(async (req, res) => {
    const userID = await User.findById(req.user.id);
    if(!userID){
        res.status(400)
        throw new Error("user not found")
    }
    if(userID.isAdmin){
        const flight = await Flight.findByIdAndDelete(req.params.id)
        if(!flight){
            res.status(400)
            throw new Error("flight not deleted")
        }
        res.status(200).json("flight deleted")
    }else{
        res.status(400)
        throw new Error("you are not allowed to delete flight")
    }
    
})
module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateFlight,
    deleteFlight,
    getAllSeatsOfFlight
}