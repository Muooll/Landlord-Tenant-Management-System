const express = require('express');
const router = express.Router(); // Create a new Router object
const { getContracts, getContract, postContract, updateContract, deleteContract } = require('../controllers/contract.controller.js');

router.get('/', getContracts);

router.get('/:id', getContract);

router.post('/', postContract);

router.put('/:id', updateContract);

router.delete('/:id', deleteContract);

// Export the router to be mounted by the main application
module.exports = router;
