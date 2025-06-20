// models/Organizer.js
const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organizationName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Hash password before saving
organizerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
organizerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;

