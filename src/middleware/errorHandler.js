const logger = require('../config/logger');

const notFound = (req, res) => {
  res.status(404).render('errors/404', {
    layout: false,
    url: req.originalUrl,
    __: res.__,
  });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, url: req.originalUrl });

  const statusCode = err.status || 500;

  if (statusCode === 404) {
    return res.status(404).render('errors/404', {
      layout: false,
      url: req.originalUrl,
      __: res.__,
    });
  }

  res.status(statusCode).render('errors/500', {
    layout: false,
    message: process.env.NODE_ENV === 'development' ? err.message : null,
    __: res.__,
  });
};

module.exports = { notFound, errorHandler };
