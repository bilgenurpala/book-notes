const db = require('../config/database');
const logger = require('../config/logger');
const { deleteImage } = require('../middleware/upload');

class BookService {
  async getAllBooks(userId) {
    try {
      const result = await db.raw(
        `SELECT id, title, author, category, status, rating, cover_image, created_at
         FROM books
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
      );

      return result.rows;
    } catch (error) {
      logger.error('Get all books error:', error);
      throw error;
    }
  }

  async getBookById(bookId, userId) {
    try {
      const result = await db.raw(
        `SELECT * FROM books WHERE id = ? AND user_id = ?`,
        [bookId, userId]
      );

      return result.rows[0] || null;
    } catch (error) {
      logger.error('Get book by ID error:', error);
      throw error;
    }
  }

  async createBook(bookData, userId) {
    const { title, author, category, status, rating, summary, cover_image, cover_url } = bookData;

    try {
      const result = await db.raw(
        `INSERT INTO books (user_id, title, author, category, status, rating, summary, cover_image, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
         RETURNING *`,
        [userId, title, author, category || null, status || 'want_to_read', rating || null, summary || null, cover_image || cover_url || null]
      );

      logger.info('Book created:', { bookId: result.rows[0].id, title });
      return result.rows[0];
    } catch (error) {
      logger.error('Create book error:', error);
      throw error;
    }
  }

  async updateBook(bookId, bookData, userId) {
    const { title, author, category, status, rating, summary, cover_image } = bookData;

    try {
      const currentBook = await this.getBookById(bookId, userId);
      if (!currentBook) {
        return null;
      }

      if (cover_image && currentBook.cover_image && !currentBook.cover_image.startsWith('http')) {
        await deleteImage(currentBook.cover_image);
      }

      const result = await db.raw(
        `UPDATE books
         SET title = ?, author = ?, category = ?, status = ?, rating = ?, summary = ?, cover_image = ?
         WHERE id = ? AND user_id = ?
         RETURNING *`,
        [title, author, category, status, rating, summary, cover_image || currentBook.cover_image, bookId, userId]
      );

      logger.info('Book updated:', { bookId, title });
      return result.rows[0];
    } catch (error) {
      logger.error('Update book error:', error);
      throw error;
    }
  }

  async deleteBook(bookId, userId) {
    try {
      const book = await this.getBookById(bookId, userId);
      if (!book) {
        return false;
      }

      if (book.cover_image && !book.cover_image.startsWith('http')) {
        await deleteImage(book.cover_image);
      }

      await db.raw('DELETE FROM books WHERE id = ? AND user_id = ?', [bookId, userId]);

      logger.info('Book deleted:', { bookId, title: book.title });
      return true;
    } catch (error) {
      logger.error('Delete book error:', error);
      throw error;
    }
  }

  async getBookWithDetails(bookId, userId) {
    try {
      const bookResult = await db.raw(
        'SELECT * FROM books WHERE id = ? AND user_id = ?',
        [bookId, userId]
      );

      if (bookResult.rows.length === 0) {
        return null;
      }

      const notesResult = await db.raw(
        'SELECT * FROM notes WHERE book_id = ? ORDER BY created_at DESC',
        [bookId]
      );

      const quotesResult = await db.raw(
        'SELECT * FROM quotes WHERE book_id = ? ORDER BY created_at DESC',
        [bookId]
      );

      return {
        book: bookResult.rows[0],
        notes: notesResult.rows,
        quotes: quotesResult.rows,
      };
    } catch (error) {
      logger.error('Get book with details error:', error);
      throw error;
    }
  }

  async addNote(bookId, userId, content, pageNumber) {
    try {
      const book = await this.getBookById(bookId, userId);
      if (!book) {
        return null;
      }

      const result = await db.raw(
        `INSERT INTO notes (book_id, content, page_number, created_at)
         VALUES (?, ?, ?, NOW())
         RETURNING *`,
        [bookId, content, pageNumber || null]
      );

      logger.info('Note added:', { bookId, noteId: result.rows[0].id });
      return result.rows[0];
    } catch (error) {
      logger.error('Add note error:', error);
      throw error;
    }
  }

  async deleteNote(noteId, userId) {
    try {
      const result = await db.raw(
        `DELETE FROM notes
         WHERE id = ?
         AND book_id IN (SELECT id FROM books WHERE user_id = ?)`,
        [noteId, userId]
      );

      logger.info('Note deleted:', { noteId });
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Delete note error:', error);
      throw error;
    }
  }

  async addQuote(bookId, userId, text) {
    try {
      const book = await this.getBookById(bookId, userId);
      if (!book) {
        return null;
      }

      const result = await db.raw(
        `INSERT INTO quotes (book_id, text, is_favorite, created_at)
         VALUES (?, ?, false, NOW())
         RETURNING *`,
        [bookId, text]
      );

      logger.info('Quote added:', { bookId, quoteId: result.rows[0].id });
      return result.rows[0];
    } catch (error) {
      logger.error('Add quote error:', error);
      throw error;
    }
  }

  async toggleQuoteFavorite(quoteId, userId) {
    try {
      const result = await db.raw(
        `UPDATE quotes
         SET is_favorite = NOT is_favorite
         WHERE id = ?
         AND book_id IN (SELECT id FROM books WHERE user_id = ?)
         RETURNING *`,
        [quoteId, userId]
      );

      return result.rows[0];
    } catch (error) {
      logger.error('Toggle quote favorite error:', error);
      throw error;
    }
  }

  async deleteQuote(quoteId, userId) {
    try {
      const result = await db.raw(
        `DELETE FROM quotes
         WHERE id = ?
         AND book_id IN (SELECT id FROM books WHERE user_id = ?)`,
        [quoteId, userId]
      );

      logger.info('Quote deleted:', { quoteId });
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Delete quote error:', error);
      throw error;
    }
  }
}

module.exports = new BookService();
