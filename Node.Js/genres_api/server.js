const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => winston.info('App listening on port 3000!'));
