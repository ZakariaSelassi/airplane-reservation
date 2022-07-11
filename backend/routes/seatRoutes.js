const express = require('express');
const router = express.Router();
const {addSeat,getSeats,updateSeat,deleteSeat} = require('../controller/seatController')
const auth = require('../middleware/authMiddleware')


router.post('/', auth,addSeat)
router.get('/', auth,getSeats)
router.put('/:id', auth,updateSeat)
router.delete('/:id',auth,deleteSeat)
module.exports = router;