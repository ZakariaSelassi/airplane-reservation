const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Seat = require('../model/seatModel');

// @desc create seat
// @route post /api/seat
// @access private only admin
const addSeat = asyncHandler(async (req, res) => {
    
    const {name,price} = req.body
   
    const user = await User.findById(req.user.id)
   if(!user) res.status(400).json({message: "User not found"})

   if(user.isAdmin){
        const seat = await Seat.create({
            name,
            price,
        })
        if(!seat) res.status(400).json({message:"nothing has been added"})

        res.status(200).json({data:seat})
   }else{
    res.status(400).json({message:"Not allow to add seat"})
   }
})

// @desc get seat
// @route get /api/seat
// @access private only admin
const getSeats = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user.id)
    if(!user) res.status(400).json({message: "User not found"})
 
    if(user.isAdmin){   
        const seat = await Seat.find({})
        if(!seat) res.status(400).json({message:"Seats not found"})
        res.status(200).json(seat)
    }else{
     res.status(400).json({message:"Not allow to get all seat"})
    }
})




// @desc update seat
// @route update /api/seat/:id
// @access private only admin
const updateSeat = asyncHandler(async(req,res) => {

    const {name,price} = req.body;
    const user = await User.findById(req.user.id)
    if(!user) res.status(400).json({message: "User not found"})
    
    if(user.isAdmin){   

        const seatId = await Seat.findById(req.params.id)
        if(!seatId) res.status(400).json({message:"Seat not found"})

        const updatedSeat = await Seat.findByIdAndUpdate(seatId,{
            name,
            price,   
        },{new:true})

        if(!updatedSeat) res.status(400).json({message:'No records changed'})

        res.status(200).json(updatedSeat)

    }else{
     res.status(400).json({message:"Not allow to update seat"})
    }
})
// @desc delete seat
// @route delete /api/seat/:id
// @access private only admin

const deleteSeat = asyncHandler(async(req,res) => {

    const user = await User.findById(req.user.id)
    if(!user) res.status(400).json({message: "User not found"})
    
    if(user.isAdmin){   

        const deleteById = await Seat.findByIdAndRemove(req.params.id)
        if(!deleteById) res.status(400).json({message:"Nothing has been delete"})

        res.status(200).json({message:"delete successfuly"})

    }else{
     res.status(400).json({message:"Not allow to update seat"})
    }
})
module.exports ={
    addSeat,
    getSeats,
    updateSeat,
    deleteSeat
}

