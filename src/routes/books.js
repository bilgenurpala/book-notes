const express = require('express');
const router = express.Router();
const multer = require('path');
const booksController = require('../controllers/booksController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype &&  extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

router.get('/', booksController.list);
router.get('/add', booksController.addBookPage);
router.get('/add', upload.single('cover_image'), booksController.add);
router.get('/edit/:id', booksController.editPage);
router.get('/edit/:id', upload.single('cover_image'), booksController.update);
router.get('/delete/:id', booksController.delete);
router.get('/:id', booksController.detail);

router.post('/:id/notes', booksController.addNote);
router.post('/:id/notes/:noteId/delete', booksController.deleteNote);

router.post('/:id/quotes', booksController.addQuote);
router.post('/:id/quotes/:quoteId/delete', booksController.deleteQuote);
router.post('/:id/quotes/:quoteId/favorite', booksController.toggleFavorite);

module.exports = router;
