const express = require('express');
const app = express();
const courses = require('./routes/courses');

const { log, auth } = require('./middleware/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(log);
app.use(auth);
app.use('/api/v1/courses', courses);

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
