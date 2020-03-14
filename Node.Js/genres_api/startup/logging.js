require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function() {
  // process.on('uncaughtException', ex => {
  //   winston.error(ex.message);
  //   process.exit(1);
  // });

  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      filename: 'exceptions.log',
      handleExceptions: true
    })
  );

  // winston.exceptions.handle(
  //   new winston.transports.File({ filename: 'exceptions.log' })
  // );

  // throw new Error('This is an uncaught exceptions');
  // const p = Promise.reject(new Error('This is an promise rejection'));
  // p.then(() => console.log('here'));
  // process.on('unhandledRejection', ex => {
  //   throw ex;
  // });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  const optinst = {
    db: 'mongodb://localhost/vidly',
    level: 'info',
    options: {
      poolSize: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  };
  winston.add(new winston.transports.MongoDB(optinst));
};
