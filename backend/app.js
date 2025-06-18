const express = require('express');
const app = express();
//const tasks = require('./routes/tasks');
const connectDB = require('./config/db');
require('dotenv').config();

const cors = require('cors');

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // optional, only if you use cookies/auth headers
}));

// middleware

app.use(express.json());

// routes

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
      //console.log(`Connected to MongoDB `)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
