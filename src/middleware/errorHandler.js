const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err, 'Unhandled error');
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

module.exports = errorHandler;
