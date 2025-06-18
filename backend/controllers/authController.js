const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organizer = require('../models/Admin');
require('dotenv').config();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// User signup
exports.userSignup = async (req, res) => {
  const { name, mobileNumber, password, interests, role } = req.body;
  console.log({ name, mobileNumber, password, interests, role })

  try {
    const userExists = await User.findOne({ mobileNumber });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this mobile number' });
    }

    const user = await User.create({
      name,
      mobileNumber,
      password,
      interests,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User login
exports.userLogin = async (req, res) => {
  const { mobileNumber, password, role } = req.body;
  console.log({ mobileNumber, password, role })

  try {
    const user = await User.findOne({ mobileNumber, role });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        mobileNumber: user.mobileNumber,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid mobile number, password, or role' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Organiser signup
exports.organiserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const organiserExists = await Organizer.findOne({ email });
    if (organiserExists) {
      return res.status(400).json({ message: 'Organiser already exists with this email' });
    }

    const organiser = await Organizer.create({
      name,
      email,
      password,
    });

    if (organiser) {
      res.status(201).json({
        _id: organiser._id,
        name: organiser.name,
        email: organiser.email,
        token: generateToken(organiser._id, organiser.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid organiser data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Organiser login
exports.organiserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const organiser = await Organizer.findOne({ email });
    if (organiser && (await organizer.matchPassword(password))) {
      res.json({
        _id: organiser._id,
        name: organiser.name,
        email: organiser.email,
        role: organiser.role,
        token: generateToken(organiser._id, organiser.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
