const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/:email/registrations', registrationController.getUserRegistrations);

module.exports = router;
