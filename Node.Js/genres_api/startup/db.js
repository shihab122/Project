const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
  mongoose
    .connect('mongodb://localhost/vidly', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info('Connected to MongoDB..'));
};
