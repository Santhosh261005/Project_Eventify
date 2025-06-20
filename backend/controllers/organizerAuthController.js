const Organizer = require('../models/Organizer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerOrganizer = async (req, res) => {
  try {
    const { name, organizationName, email, password } = req.body;

    // check if organizer already exists
    const existing = await Organizer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const organizer = new Organizer({
      name,
      organizationName,
      email,
      password: hashedPassword
    });

    await organizer.save();
    res.status(201).json({ message: "Organizer registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // create JWT token
    const token = jwt.sign(
      { organizerId: organizer._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerOrganizer,
  loginOrganizer
};
