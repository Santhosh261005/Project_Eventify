const express = require('express');
const app = express();
//const tasks = require('./routes/tasks');
const connectDB = require('./config/db');
require('dotenv').config();

// middleware

app.use(express.json());

// routes


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
