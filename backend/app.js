const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const organizerAuthRoutes = require('./routes/organizerAuthRoutes');
const eventRoutes = require('./routes/eventRoutes');

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/api/organizer', organizerAuthRoutes);
app.use('/api', eventRoutes);

// ✅ Pre-flight OPTIONS requests (CORS)
app.options('*', cors());

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
