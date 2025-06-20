const Event = require('../models/Event');

// 1️⃣ Create Event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.organizer._id  // from auth middleware
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Get All Events by Logged-in Organizer
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.organizer._id }).sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Update Event Details (title, desc, date, location)
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date, location,status } = req.body;

    const event = await Event.findOne({ _id: eventId, organizer: req.organizer._id });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    // Update fields if provided
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (status) event.status = status;
    await event.save();
    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 4️⃣ Change Event Status (cancel/postpone)
const changeEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['cancelled', 'postponed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const event = await Event.findOne({ _id: eventId, organizer: req.organizer._id });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    event.status = status;
    await event.save();

    res.status(200).json({ message: `Event ${status}`, event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log('Delete event:', eventId, 'Organizer:', req.organizer._id);
    const event = await Event.findOneAndDelete({ 
      _id: eventId, 
      organizer: req.organizer._id 
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createEvent,
  getMyEvents,
  updateEvent,
  changeEventStatus,
  deleteEvent
};
