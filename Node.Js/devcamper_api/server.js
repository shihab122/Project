const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger.js');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

// Route Files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Middleware
// app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

const server = app.listen(
  PORT,
  console.log(
    `App run in ${process.env.NODE_ENV} mode and listening on port ${process.env.PORT}!`
      .yellow.bold
  )
);

// Handled unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
