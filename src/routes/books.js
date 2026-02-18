const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { upload, processImage } = require('../middleware/upload');
const { isAuthenticated } = require('../middleware/auth');
const {
  addBookValidator,
  editBookValidator,
  bookIdValidator,
  noteValidator,
  quoteValidator,
} = require('../validators/bookValidator');
const validate = require('../middleware/validation');

router.use(isAuthenticated);

router.get('/', booksController.list);

router.get('/add', booksController.addBookPage);
router.post('/add', upload.single('cover_image'), processImage, addBookValidator, validate, booksController.add);

router.get('/edit/:id', bookIdValidator, validate, booksController.editPage);
router.post('/edit/:id', upload.single('cover_image'), processImage, editBookValidator, validate, booksController.update);

router.post('/delete/:id', bookIdValidator, validate, booksController.delete);

router.get('/:id', bookIdValidator, validate, booksController.detail);

router.post('/:id/notes', noteValidator, validate, booksController.addNote);
router.post('/:id/notes/:noteId/delete', booksController.deleteNote);

router.post('/:id/quotes', quoteValidator, validate, booksController.addQuote);
router.post('/:id/quotes/:quoteId/delete', booksController.deleteQuote);
router.post('/:id/quotes/:quoteId/favorite', booksController.toggleFavorite);

module.exports = router;
