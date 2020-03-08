const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/vidly', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => 'Connected to MongoDB..')
  .catch(() => 'Could not connect to MongoDB...');

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port 3000!'));
