const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    req.flash('error', errorMessages.join(', '));
    const returnTo = req.get('Referer') || req.originalUrl || '/';
    return res.redirect(returnTo);
  }

  next();
};

module.exports = validate;
