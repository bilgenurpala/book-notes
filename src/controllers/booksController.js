const db = require('../config/db');
const fs = require('fs');
const path = require('path');

exports.list = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM books WHERE user_id = $1 ORDER BY created_at DESC',
            [req.session.user.id]
        );
        res.render('books/list', {
            title: 'My Books',
            page: 'books',
            books: result.rows,
            user: req.session.user
        });
    } catch (err) {
        req.flash('error', 'Error loading books');
        res.redirect('/dashboard');  
    }
};

exports.addBookPage = (req, res) => {
    res.render('books/add', {
        title: 'Add Book',
        page: 'books',
        user: req.session.user
    });
};

exports.add = async (req, res) => {
    const { title, author, category, status, rating, summary, cover_url } = req.body;
    
    let coverImage = null;
    if (req.file) {
        coverImage = '/uploads' + req.file.filename; 
    } else if (cover_url) {
        coverImage = cover_url;
    }

    try {
        await db.query(
            'INSERT INTO books (user_id, title, author, category, status, rating, summary, cover_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [req.session.user.id, title, author, category, status, rating || null, summary, coverImage]
        );
        req.flash('success', 'Book added successfully!');
        res.redirect('/books');
    } catch (err) {
        req.flash('error', 'Error adding book: ' + err.message);
        res.redirect('/books/add');
    }
};

exports.editPage = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM books WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.user.id]
        );
        
        if (result.rows.length === 0) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }

        res.render('books/edit', {
            title: 'Edit Book',
            page: 'books',
            book: result.rows[0],
            user: req.session.user
        });
    } catch (err) {
        req.flash('error', 'Error loading book');
        res.redirect('/books');
    }
};

exports.update = async (req, res) => {
    const { title, author, category, status, rating, summary, cover_url } = req.body;

    let coverImage = cover_url;
    if (req.file) {
        coverImage = '/uploads/' + req.file.filename;
    }

    try {
        await db.query(
            'UPDATE books SET title = $1, author = $2, category = $3, status = $4, rating = $5, summary = $6, cover_image = $7 WHERE id = $8 AND user_id = $9',
            [tittle, author, category, status, rating || null, summary, coverImage, req.params.id, req.session.user.id]
        );
        req.flash('success', 'Book updated successfully!');
        res.redirect('/books/' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error updating book: ' + err.message);
        res.redirect('/books/edit/' + req.params.id);
    }
};

exports.delete = async (req, res) => {
    try {
        const book = await db.query(
            'SELECT cover_image FROM books WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.user.id]
        );

        if (book.rows.length > 0 && book.rows[0].cover_image){
            const imagePath = path.join(__dirname, '../../public', book.rows[0].cover_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await db.query(
            'DELETE FROM books WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.user.id]
        );
        req.flash('success', 'Book deleted successfully!');
        res.redirect('/books');
    } catch (err) {
        req.flash('error', 'Error deleting book: ' + err.message);
        res.redirect('/books');
    }
};

exports.detail = async (res, res) => {
    try {
        const bookResult = await db.query(
            'SELECT * FROM books WHERE id = $1 AND user_id = $2',
            [req.params.id, req.session.user.id]
        );

        if (bookResult.rows.length === 0) {
            req.flash('error', 'Book not found');
            return res.redirect('/books');
        }

        const quotesResult = await db.query(
            'SELECT * FROM quotes WHERE book_id = $1 ORDER BY is_favorite DESC, created_at DESC',
            [req.params.id]
        );

        res.rende('books/detail', {
            title: bookResult.rows[0].title,
            page: 'books',
            book: bookResult.rows[0],
            notes: notesResult.rows,
            quotes: quotesResult.rows,
            user: req.session.user
        });
    } catch (err) {
        req.flash('error', 'Error loading book details');
    }
};

exports.addNote = async (req, res) => {
    const { content, page_number } = req.body;
    try {
        await db.query(
            'INSERT INTO notes (book_id, content, page_number) VALUES ($1, $2, $3)',
            [req.params.id, content, page_number || null]
        );
        req.flash('success', 'Note added successfully!');
        res.redirect('/books' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error adding note: ' + err.message);
        res.redirect('/books/' + req.params.id);
    }
};

exports.deleteNote = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM notes WHERE id = $1', 
            [req.params.noteId]
        );
        req.flash('success', 'Note deleted!');
        res.redirect('/books/' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error deleting note');
        res.redirect('/books/' + req.params.id);
    }
};

exports.addQuote = async (req, res) => {
    const { text } = req.body;
    try {
        await db.query(
            'INSERT INTO quotes (book_id, text) VALUES ($1, $2)',
            [req.params.id, text]
        );
        req.flash('success', 'Quote added successfully!');
        res.redirect('/books/' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error adding quote: ' + err.message);
        res.redirect('/books/ + req.params.id');
    }
};

exports.deleteQuote = async (req, res) => {
    try {
        await db.query('DELETE FROM quotes WHERE id = $1', [req.params.quoteId]);
        req.flash('success', 'Quote deleted!');
        res.redirect('/books/' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error deleting quote');
        res.redirect('/books/' + req.params.id);
    }
};

exports.toggleFavorite = async (req, res) => {
    try {
        await db.query(
            'UPDATE quotes SET is_favorite = NOT is_favorite WHERE id = $1',
            [req.params.quoteId]
        );
        req.flash('success', 'Quote updated!');
        res.redirect('/books/' + req.params.id);
    } catch (err) {
        req.flash('error', 'Error updating quote');
        res.redirect('/books/ + req.params.id');
    }
};