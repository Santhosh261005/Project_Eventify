const express = require('express');
const router = express.Router();
const {
  userSignup,
  userLogin,
  organiserSignup,
  organiserLogin,
} = require('../controllers/authController');

// User routes
router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);

// Organiser routes
router.post('/organiser/signup', organiserSignup);
router.post('/organiser/login', organiserLogin);

module.exports = router;
