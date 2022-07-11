const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Airplane = require('../model/airplaneModel');


// @desc create airplane
// @route post /api/airplanes
// @access private only admin
const createAirplane = asyncHandler(async (req, res) => {
    // get data from body 
    const {name} = req.body
    // check if user loggedIn
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400).json({message:'user not found'})
        throw new Error("user not found")
    }
    // check loggedIn is admin
    if(user.isAdmin){
        if(!name){
            res.status(400)
            throw new Error("please provide all the field")
        }
        const airplane = await Airplane.create({
            name,
        })
        if(!airplane){
            res.status(400)
            throw new Error("company not created")
        }
        res.status(201).json(airplane)
    }else{
        res.status(400)
        throw new Error("You are not allowed to create company")
    }
})

// @desc get airplanes
// @route get /api/airplanes
// @access private only admin
const getAirplane = asyncHandler(async(req,res) => {
    // get user loggedIn
    const user = await User.findById(req.user.id)
    // check if existe
    if(!user){
        res.status(400).json({message:'User not found'})
        throw new Error("User not found")
    }
    // check if loggedIn is admin
    if(user.isAdmin){
        const airplane = await Airplane.find({})
        if(!airplane){
            res.status(400).json({message:'Airplan not found'})
        }
        res.status(200).json({data:airplane})
    }else{
        res.status(400)
        throw new Error("You are not allowed to get the company list")
    }
})

// @desc update airplanes
// @route put /api/airplanes
// @access private only admin
const updateAirplane = asyncHandler(async(req,res) => {
     const {name} = req.body   
    // get user loggedIn
      const user = await User.findById(req.user.id)
      // check if existe
      if(!user){
          res.status(400).json({message:'User not found'})
          throw new Error("User not found")
      }
      // check if loggedIn is admin
      if(user.isAdmin){
        // check selected airplan
        const airplane = await Airplane.findById(req.params.id)
        if(!airplane) res.status(400).json({message:'Airplane not found'})
        
        // then update if found
        const updatedAirplane = await Airplane.findByIdAndUpdate(airplane,{
            name,
        },{new:true})

        if(!updatedAirplane)res.status(400).json({message:'No change has been apply'})
        res.status(200).json(updatedAirplane)

      }else{
          res.status(400)
          throw new Error("You are not allowed to update company")
      }
})

// @desc delete airplanes
// @route delete /api/airplanes
// @access private only admin
const deleteAirplane = asyncHandler(async(req,res) => {   
    // get user loggedIn
     const user = await User.findById(req.user.id)
     // check if existe
     if(!user){
         res.status(400).json({message:'User not found'})
         throw new Error("User not found")
     }
     // check if loggedIn is admin
     if(user.isAdmin){
       // check selected airplan
       const airplane = await Airplane.findById(req.params.id)
       if(!airplane) res.status(400).json({message:'Airplane not found'})
       
       // Delete 
       const deletePlane = await Airplane.findByIdAndRemove(airplane)
       
       if(!deletePlane)res.status(400).json({message:'No records deleted'})
       res.status(200).json({message:"Record has been deleted"})

     }else{
         res.status(400)
         throw new Error("You are not allowed to delete company")
     }
})
module.exports ={
    createAirplane,
    getAirplane,
    updateAirplane,
    deleteAirplane
}

