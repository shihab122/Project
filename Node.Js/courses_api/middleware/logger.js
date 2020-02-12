exports.log = function(req, res, next) {
  console.log('Logging.....');
  next();
};

exports.auth = function(req, res, next) {
  console.log('Authenticating.....');
  next();
};

// module.exports = log;
// module.exports = authenticating;
