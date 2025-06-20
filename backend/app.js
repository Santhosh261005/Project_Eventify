const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();



// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Pre-flight OPTIONS requests (CORS)
app.options('*', cors());

app.use(express.json());


const organizerAuthRoutes = require('./routes/organizerAuthRoutes');
const eventRoutes = require('./routes/eventRoutes');

// ✅ Routes
app.use('/api/organizer', organizerAuthRoutes);
app.use('/api', eventRoutes);

const authRoutes = require('./routes/authRoutes');
// const eventRoutes = require('./routes/eventRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);




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
