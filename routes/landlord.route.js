const express = require('express');
const router = express.Router(); // Create a new Router object
const { getLandlords, getLandlord, postLandlord, updateLandlord, deleteLandlord } = require('../controllers/landlord.controller.js');

router.get('/', getLandlords);

router.get('/:id', getLandlord);

router.post('/', postLandlord);

router.put('/:id', updateLandlord);

router.delete('/:id', deleteLandlord);

// Export the router to be mounted by the main application
module.exports = router;
