const express = require('express');
const dotenv = require('dotenv');

// Route Files
const bootcamps = require('./routes/bootcamps');

// Load env
dotenv.config({ path: './config/config.env' });
const app = express();
const PORT = process.env.PORT || 5000;

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

app.listen(
  PORT,
  console.log(
    `App run in ${process.env.NODE_ENV} mode and listening on port ${process.env.PORT}!`
  )
);
