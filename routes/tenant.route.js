const express = require('express');
const router = express.Router(); // Create a new Router object
const { getTenants, getTenant, postTenant, updateTenant, deleteTenant } = require('../controllers/tenant.controller.js');

router.get('/', getTenants);

router.get('/:id', getTenant);

router.post('/', postTenant);

router.put('/:id', updateTenant);

router.delete('/:id', deleteTenant);

// Export the router to be mounted by the main application
module.exports = router;
