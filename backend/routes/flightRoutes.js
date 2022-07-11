const express = require('express');
const router = express.Router({mergeParams: true});
const {createFlight,getAllSeatsOfFlight,getAllFlights,getFlightById,updateFlight,deleteFlight} = require("../controller/flightController")
const auth = require('../middleware/authMiddleware')



router.get('/',auth,getAllFlights)
router.post('/:idAirplane/:idSeat',auth,createFlight)
router.get('/:id',auth,getFlightById)
router.put('/:id',auth,updateFlight)
router.delete('/:id',auth,deleteFlight)
module.exports = router;