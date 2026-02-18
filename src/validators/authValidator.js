const { body } = require('express-validator');
const db = require('../config/database');

const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.usernameRequired'))
    .isLength({ min: 3, max: 30 })
    .withMessage((value, { req }) => req.__('validation.usernameLength'))
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage((value, { req }) => req.__('validation.usernameFormat'))
    .custom(async (value, { req }) => {
      try {
        const result = await db.raw('SELECT id FROM users WHERE username = ?', [value]);
        if (result.rows.length > 0) {
          throw new Error(req.__('validation.usernameTaken'));
        }
      } catch (error) {
        if (error.message === req.__('validation.usernameTaken')) {
          throw error;
        }
        throw new Error(req.__('validation.usernameRequired'));
      }
      return true;
    }),

  body('email')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.emailRequired'))
    .isEmail()
    .withMessage((value, { req }) => req.__('validation.emailInvalid'))
    .normalizeEmail()
    .custom(async (value, { req }) => {
      try {
        const result = await db.raw('SELECT id FROM users WHERE email = ?', [value]);
        if (result.rows.length > 0) {
          throw new Error(req.__('validation.emailTaken'));
        }
      } catch (error) {
        if (error.message === req.__('validation.emailTaken')) {
          throw error;
        }
        throw new Error(req.__('validation.emailRequired'));
      }
      return true;
    }),

  body('password')
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.passwordRequired'))
    .isLength({ min: 6 })
    .withMessage((value, { req }) => req.__('validation.passwordLength'))
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage((value, { req }) => req.__('validation.passwordFormat')),

  body('confirmPassword')
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.confirmRequired'))
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(req.__('validation.confirmMismatch'));
      }
      return true;
    }),
];

const loginValidator = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.emailRequired')),

  body('password')
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.passwordRequired')),
];

module.exports = {
  registerValidator,
  loginValidator,
};
