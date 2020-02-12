const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/v1/genres', genres);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on port 3000!'));
