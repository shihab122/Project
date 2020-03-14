const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/v1/genres', genres);
  app.use('/api/v1/customers', customers);
  app.use('/api/v1/users', users);
  app.use('/api/v1/auth', auth);
  app.use(error);
};
