const express = require('express');
const { registerOrganizer, loginOrganizer } = require('../controllers/organizerAuthController');
const router = express.Router();

router.post('/register', registerOrganizer);
router.post('/login', loginOrganizer);

module.exports = router;
