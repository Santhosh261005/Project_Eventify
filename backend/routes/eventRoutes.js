const express = require('express');
const router = express.Router();

//const createEvents = require('../controllers/eventController');
const {
  createEvent,
  getMyEvents,
  updateEvent,
  changeEventStatus,
  deleteEvent,
} = require('../controllers/eventController');

const verifyOrganizer = require('../middleware/authMiddleware');




// 📌 All routes protected by JWT middleware
router.post('/events', verifyOrganizer, createEvent);
router.get('/events', verifyOrganizer, getMyEvents);
router.put('/events/:id', verifyOrganizer, updateEvent);
router.patch('/events/:id/status', verifyOrganizer, changeEventStatus);
router.delete('/:id',verifyOrganizer,deleteEvent);


module.exports = router;
