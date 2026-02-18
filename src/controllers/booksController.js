const bookService = require('../services/bookService');
const logger = require('../config/logger');

exports.list = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks(req.session.user.id);

    res.render('books/list', {
      title: res.__('bookList.title'),
      page: 'books',
      books,
    });
  } catch (err) {
    logger.error('Error loading books:', err);
    req.flash('error', res.__('books.loadError'));
    res.redirect('/dashboard');
  }
};

exports.addBookPage = (req, res) => {
  res.render('books/add', {
    title: res.__('bookForm.addTitle'),
    page: 'books',
  });
};

exports.add = async (req, res, next) => {
  const { title, author, category, status, rating, summary, cover_url } = req.body;

  let coverImage = null;
  if (req.file) {
    coverImage = '/uploads/' + req.file.filename;
  } else if (cover_url) {
    coverImage = cover_url;
  }

  try {
    await bookService.createBook(
      {
        title,
        author,
        category,
        status,
        rating,
        summary,
        cover_image: coverImage,
      },
      req.session.user.id
    );

    logger.info('Book added:', { title, userId: req.session.user.id });
    req.flash('success', res.__('books.addSuccess'));
    res.redirect('/books');
  } catch (err) {
    logger.error('Error adding book:', err);
    req.flash('error', res.__('books.addError'));
    res.redirect('/books/add');
  }
};

exports.editPage = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id, req.session.user.id);

    if (!book) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    res.render('books/edit', {
      title: res.__('bookForm.editTitle'),
      page: 'books',
      book,
    });
  } catch (err) {
    logger.error('Error loading book:', err);
    req.flash('error', res.__('books.loadBookError'));
    res.redirect('/books');
  }
};

exports.update = async (req, res, next) => {
  const { title, author, category, status, rating, summary, cover_url } = req.body;

  let coverImage = cover_url;
  if (req.file) {
    coverImage = '/uploads/' + req.file.filename;
  }

  try {
    const updatedBook = await bookService.updateBook(
      req.params.id,
      {
        title,
        author,
        category,
        status,
        rating,
        summary,
        cover_image: coverImage,
      },
      req.session.user.id
    );

    if (!updatedBook) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    logger.info('Book updated:', { bookId: req.params.id, title });
    req.flash('success', res.__('books.updateSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error updating book:', err);
    req.flash('error', res.__('books.updateError'));
    res.redirect('/books/edit/' + req.params.id);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id, req.session.user.id);

    if (!deleted) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    logger.info('Book deleted:', { bookId: req.params.id });
    req.flash('success', res.__('books.deleteSuccess'));
    res.redirect('/books');
  } catch (err) {
    logger.error('Error deleting book:', err);
    req.flash('error', res.__('books.deleteError'));
    res.redirect('/books');
  }
};

exports.detail = async (req, res, next) => {
  try {
    const data = await bookService.getBookWithDetails(req.params.id, req.session.user.id);

    if (!data) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    res.render('books/detail', {
      title: data.book.title,
      page: 'books',
      book: data.book,
      notes: data.notes,
      quotes: data.quotes,
    });
  } catch (err) {
    logger.error('Error loading book details:', err);
    req.flash('error', res.__('books.detailError'));
    res.redirect('/books');
  }
};

exports.addNote = async (req, res, next) => {
  const { content, page_number } = req.body;

  try {
    const note = await bookService.addNote(
      req.params.id,
      req.session.user.id,
      content,
      page_number
    );

    if (!note) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    logger.info('Note added:', { bookId: req.params.id, noteId: note.id });
    req.flash('success', res.__('notes.addSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error adding note:', err);
    req.flash('error', res.__('notes.addError'));
    res.redirect('/books/' + req.params.id);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const deleted = await bookService.deleteNote(req.params.noteId, req.session.user.id);

    if (!deleted) {
      req.flash('error', res.__('notes.notFound'));
      return res.redirect('/books/' + req.params.id);
    }

    logger.info('Note deleted:', { noteId: req.params.noteId });
    req.flash('success', res.__('notes.deleteSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error deleting note:', err);
    req.flash('error', res.__('notes.deleteError'));
    res.redirect('/books/' + req.params.id);
  }
};

exports.addQuote = async (req, res, next) => {
  const { text } = req.body;

  try {
    const quote = await bookService.addQuote(req.params.id, req.session.user.id, text);

    if (!quote) {
      req.flash('error', res.__('books.notFound'));
      return res.redirect('/books');
    }

    logger.info('Quote added:', { bookId: req.params.id, quoteId: quote.id });
    req.flash('success', res.__('quotes.addSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error adding quote:', err);
    req.flash('error', res.__('quotes.addError'));
    res.redirect('/books/' + req.params.id);
  }
};

exports.deleteQuote = async (req, res, next) => {
  try {
    const deleted = await bookService.deleteQuote(req.params.quoteId, req.session.user.id);

    if (!deleted) {
      req.flash('error', res.__('quotes.notFound'));
      return res.redirect('/books/' + req.params.id);
    }

    logger.info('Quote deleted:', { quoteId: req.params.quoteId });
    req.flash('success', res.__('quotes.deleteSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error deleting quote:', err);
    req.flash('error', res.__('quotes.deleteError'));
    res.redirect('/books/' + req.params.id);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  try {
    const quote = await bookService.toggleQuoteFavorite(req.params.quoteId, req.session.user.id);

    if (!quote) {
      req.flash('error', res.__('quotes.notFound'));
      return res.redirect('/books/' + req.params.id);
    }

    logger.info('Quote favorite toggled:', { quoteId: req.params.quoteId });
    req.flash('success', res.__('quotes.updateSuccess'));
    res.redirect('/books/' + req.params.id);
  } catch (err) {
    logger.error('Error updating quote:', err);
    req.flash('error', res.__('quotes.updateError'));
    res.redirect('/books/' + req.params.id);
  }
};
