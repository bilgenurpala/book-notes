require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');

const i18n = require('i18n');
const logger = require('./src/config/logger');
const db = require('./src/config/database');
const sessionConfig = require('./src/config/session');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const { attachUser } = require('./src/middleware/auth');

const authRoutes = require('./src/routes/auth');
const booksRoutes = require('./src/routes/books');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  referrerPolicy: { policy: 'same-origin' },
}));

app.use(compression());

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/auth', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }));
}

i18n.configure({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  cookie: 'language',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
  syncFiles: false,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionConfig);

app.use(i18n.init);

app.use((req, res, next) => {
  if (req.session.user && req.session.user.language) {
    req.setLocale(req.session.user.language);
  } else if (req.session.language) {
    req.setLocale(req.session.language);
  }
  next();
});

app.use(flash());

app.use(attachUser);

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});

app.get('/language/:lang', async (req, res) => {
  const lang = req.params.lang;

  if (!['en', 'tr'].includes(lang)) {
    req.flash('error', 'Invalid language');
    const returnTo = req.get('Referer') || '/';
    return res.redirect(returnTo);
  }

  try {
    req.setLocale(lang);
    req.session.language = lang;

    if (req.session.user) {
      req.session.user.language = lang;
      await db.raw('UPDATE users SET language = ? WHERE id = ?', [lang, req.session.user.id]);
    }
  } catch (err) {
    logger.error('Language update error:', err);
  }

  const returnTo = req.query.returnTo || req.get('Referer') || '/';
  res.redirect(returnTo);
});

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.set('Cache-Control', 'no-store');
  res.render('landing', {
    title: 'BookNotes',
    layout: false,
    locale: req.getLocale(),
  });
});

app.get('/dashboard', async (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  try {
    const [booksResult, readingResult, completedResult, quotesResult] = await Promise.all([
      db.raw('SELECT COUNT(*) as total FROM books WHERE user_id = ?', [req.session.user.id]),
      db.raw("SELECT COUNT(*) as total FROM books WHERE user_id = ? AND status = 'reading'", [req.session.user.id]),
      db.raw("SELECT COUNT(*) as total FROM books WHERE user_id = ? AND status = 'completed'", [req.session.user.id]),
      db.raw('SELECT COUNT(*) as total FROM quotes q JOIN books b ON q.book_id = b.id WHERE b.user_id = ?', [req.session.user.id])
    ]);

    res.render('dashboard', {
      title: 'Dashboard',
      page: 'dashboard',
      stats: {
        totalBooks: parseInt(booksResult.rows[0].total),
        reading: parseInt(readingResult.rows[0].total),
        completed: parseInt(completedResult.rows[0].total),
        quotes: parseInt(quotesResult.rows[0].total),
      },
    });
  } catch (err) {
    logger.error('Dashboard error:', err);
    next(err);
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

module.exports = app;