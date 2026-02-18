const { body, param } = require('express-validator');

const addBookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.titleRequired'))
    .isLength({ min: 1, max: 255 })
    .withMessage((value, { req }) => req.__('validation.titleLength')),

  body('author')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.authorRequired'))
    .isLength({ min: 1, max: 255 })
    .withMessage((value, { req }) => req.__('validation.authorLength')),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage((value, { req }) => req.__('validation.categoryLength')),

  body('status')
    .optional()
    .isIn(['reading', 'completed', 'want_to_read'])
    .withMessage((value, { req }) => req.__('validation.invalidStatus')),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage((value, { req }) => req.__('validation.ratingRange')),

  body('summary')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage((value, { req }) => req.__('validation.summaryLength')),

  body('cover_url')
    .optional()
    .trim()
    .isURL()
    .withMessage((value, { req }) => req.__('validation.coverUrlInvalid')),
];

const editBookValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage((value, { req }) => req.__('validation.invalidBookId')),

  ...addBookValidator,
];

const bookIdValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage((value, { req }) => req.__('validation.invalidBookId')),
];

const noteValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage((value, { req }) => req.__('validation.invalidBookId')),

  body('content')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.noteRequired'))
    .isLength({ min: 1, max: 5000 })
    .withMessage((value, { req }) => req.__('validation.noteLength')),

  body('page_number')
    .optional()
    .isInt({ min: 1 })
    .withMessage((value, { req }) => req.__('validation.pageNumber')),
];

const quoteValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage((value, { req }) => req.__('validation.invalidBookId')),

  body('text')
    .trim()
    .notEmpty()
    .withMessage((value, { req }) => req.__('validation.quoteRequired'))
    .isLength({ min: 1, max: 1000 })
    .withMessage((value, { req }) => req.__('validation.quoteLength')),
];

module.exports = {
  addBookValidator,
  editBookValidator,
  bookIdValidator,
  noteValidator,
  quoteValidator,
};
