const express = require('express');
const router = express.Router();
const {createReservation,deleteReservation,getUserReservation} = require("../controller/reservationController")
const auth = require('../middleware/authMiddleware')



router.get('/',auth,getUserReservation)
router.post('/:flightid',auth,createReservation)
router.delete('/:id',auth,deleteReservation)
module.exports = router;    