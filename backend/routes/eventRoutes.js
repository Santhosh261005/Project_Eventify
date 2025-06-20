const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');

// GET /api/events - fetch all events
router.get('/', getEvents);

// POST /api/events - create a new event
router.post('/', createEvent);

module.exports = router;
