const express = require('express');
const router = express.Router();
const {createAirplane,getAirplane,updateAirplane,deleteAirplane} = require('../controller/airplaneController')
const auth = require('../middleware/authMiddleware')


router.post('/', auth, createAirplane)
router.get('/', auth,getAirplane)
router.put('/:id', auth,updateAirplane)
router.delete('/:id',auth,deleteAirplane)
module.exports = router;