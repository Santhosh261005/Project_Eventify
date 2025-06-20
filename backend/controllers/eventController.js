const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    // console.log(events)
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { status, title, description, date, location, organizer } = req.body;
    const newEvent = new Event({
      status,
      title,
      description,
      date,
      location,
      organizer
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error creating event' });
  }
};
