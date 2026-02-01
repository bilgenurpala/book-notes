require('dotenv').config();
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path');
const i18n = require('i18n');
const db = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const booksRoutes = require('./src/routes/books');

const app = express();

i18n.configure({
    locales: ['en', 'tr'],
    defaultLocale: 'en',
    directory: path.join(__dirname, 'locales'),
    cookie: 'language',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
    syncFiles: false
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(i18n.init);

app.use((req, res,next) => {
    if (req.session.user && req.session.user.language) {
        req.setLocale(req.session.user.language);
    }
    next();
});

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    next();
});

app.get('/language/:lang', (req, res) => {
    const lang = req.params.lang;
    if(['en', 'tr'].includes(lang)) {
        req.setLocale(lang);
        if (req.session.user) {
            req.session.user.language = lang;
            db.query('UPDATE users SET language = $1 WHERE id = $2', [lang, req.session.user.id])
                .catch(err => console.error('Language update error:', err));
        }
    }
    res.redirect(req.get('Referer') || '/');
});

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/auth/login');
    }
});

app.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }

    try {
        const booksResult = await db.query (
            'SELECT COUNT (*) as total FROM books WHERE user_id = $1',
            [req.session.user.id]
        );
        const readingResult = await db.query(
            "SELECT COUNT(*) as total FROM books WHERE user_id = $1 AND status = 'reading'",
            [req.session.user.id]
        );
        const completedResult = await db.query(
            "SELECT COUNT(*) as total FROM books WHERE user_id = $1 AND status = 'completed'",
            [req.session.user.id]
        );
        const quotesResult = await db.query(
            'SELECT COUNT(*) as total FROM quotes q JOIN books b ON q.book_id =b.id WHERE b.user_id = $1'
            [req.session.user.id]
        );

        res.render('dashboard', {
            title: 'Dashboard',
            page: 'dashboard',
            user: req.session.user,
            stats: {
                totalBooks: booksResult.rows[0].total,
                reading: readingResult.rows[0].total,
                completed: completedResult.rows[0].total,
                quotes: quotesResult.rows[0].total
            }
        });
    } catch (err) {
        res.send('Error: ' + err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});