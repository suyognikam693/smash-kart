const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/players', eventController.getEventPlayers);
router.get('/:id/join', eventController.joinEventRoom);

module.exports = router;
