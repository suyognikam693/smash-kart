const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const upload = require('../middlewares/upload');

// Handle multipart/form-data with file upload named 'screenshot'
router.post('/', upload.single('screenshot'), registrationController.registerEvent);

module.exports = router;
