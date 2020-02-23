const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');

mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => 'Connected to MongoDB..')
  .catch(() => 'Could not connect to MongoDB...');

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port 3000!'));
