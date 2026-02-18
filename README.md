# BookNotes

A modern, full-stack reading management application built with Node.js, PostgreSQL, and Docker.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)

## Overview

BookNotes is a comprehensive book management system that helps readers organize their reading journey. Track books, save memorable quotes, write notes, and visualize your reading statistics—all in one place.

## Features

- **Landing Page** - Public hero page with feature showcase and call-to-action, visible before login
- **User Authentication** - Secure registration and login with bcrypt password hashing
- **Book Management** - Add, edit, delete, and organize your book collection
- **Notes & Quotes** - Capture important passages and personal insights
- **Book Details** - View comprehensive information with cover images
- **Cover Image Support** - Upload a file (JPEG, PNG, WebP, GIF — max 5MB, auto-resized to 400×600 WebP) or paste an external URL
- **Reading Status** - Track books as `want_to_read` (default), `reading`, or `completed`
- **Rating System** - Rate books with 1-5 stars
- **Reading Statistics** - Dashboard with reading progress overview
- **Dark / Light Mode** - Theme toggle with preference saved to `localStorage`
- **Responsive Navigation** - Mobile hamburger menu with scroll-lock
- **Auto-dismissing Alerts** - Flash messages fade out automatically after 5 seconds
- **Multi-language Support** - Full English and Turkish interface (i18n)
- **Input Validation** - Express-validator with i18n error messages
- **Error Handling** - Custom 404 and 500 error pages with Winston logging
- **Security** - Helmet (with CSP), rate limiting, CORS, session management
- **Docker Ready** - One-command deployment with Docker Compose

## Tech Stack

**Backend**
- Node.js 20 (Alpine)
- Express.js 5
- PostgreSQL 16
- Knex.js (Query Builder)
- bcrypt for password hashing (10 rounds)
- express-session for authentication
- express-validator for input validation
- Multer + Sharp for file uploads and image processing
- Winston for structured logging
- Morgan for HTTP request logging
- Helmet for security headers
- express-rate-limit for rate limiting
- i18n for internationalization (EN/TR)
- connect-flash for flash messages

**Frontend**
- EJS templating engine with express-ejs-layouts
- CSS with custom properties
- Font Awesome 6.4 icons

**DevOps**
- Docker & Docker Compose
- Automated database initialization
- Environment-based configuration

**Development & Testing**
- Nodemon — auto-restart on file changes
- Jest + Supertest — unit and HTTP integration testing
- ESLint (Airbnb config) + Prettier — linting and formatting

## Quick Start

### Prerequisites

- Docker Desktop installed
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/bilgenurpala/book-notes.git
cd book-notes

# Start the application
docker-compose up -d

# Access at http://localhost:3000
```

That's it! The application will automatically:
- Set up PostgreSQL database
- Initialize database schema
- Start the Node.js server

### Manual Setup (Without Docker)
```bash
# Install dependencies
npm install

# Create PostgreSQL database
createdb booknotes

# Initialize database
psql -d booknotes -f init.sql

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start the server
npm start
```

## Project Structure
```
book-notes-project/
├── public/                          # Static files
│   ├── css/
│   │   ├── style.css                # Main application styles
│   │   └── auth.css                 # Authentication page styles
│   ├── js/
│   │   └── main.js                  # Client-side JavaScript (alerts, confirmations)
│   └── uploads/                     # Book cover images (auto-created)
│       └── .gitkeep
│
├── src/
│   ├── config/
│   │   ├── database.js              # Knex database connection
│   │   ├── logger.js                # Winston logger configuration
│   │   └── session.js               # Express-session configuration
│   │
│   ├── middleware/
│   │   ├── auth.js                  # Authentication guards (attachUser, isAuthenticated, isGuest)
│   │   ├── errorHandler.js          # Global error handler (404, 500)
│   │   ├── upload.js                # Multer file upload + Sharp image processing
│   │   └── validation.js            # Express-validator error handler
│   │
│   ├── controllers/
│   │   ├── authController.js        # Registration, login, logout logic
│   │   └── booksController.js       # Book CRUD, notes, quotes, favorites
│   │
│   ├── routes/
│   │   ├── auth.js                  # Auth endpoints with validation
│   │   └── books.js                 # Book endpoints with file upload
│   │
│   ├── services/
│   │   ├── authService.js           # User database operations
│   │   └── bookService.js           # Book, note, quote database operations
│   │
│   ├── validators/
│   │   ├── authValidator.js         # Registration and login validation rules
│   │   └── bookValidator.js         # Book, note, quote validation rules
│   │
│   └── views/
│       ├── auth/
│       │   ├── login.ejs            # Login page
│       │   └── register.ejs         # Registration page
│       ├── books/
│       │   ├── list.ejs             # Books grid view
│       │   ├── add.ejs              # Add book form
│       │   ├── edit.ejs             # Edit book form
│       │   └── detail.ejs           # Book details with notes & quotes
│       ├── errors/
│       │   ├── 404.ejs              # Page not found
│       │   └── 500.ejs              # Server error
│       ├── layouts/
│       │   └── main.ejs             # Main layout (navbar, flash messages, footer)
│       └── dashboard.ejs            # Dashboard with reading statistics
│
├── locales/
│   ├── en.json                      # English translations (150+ keys)
│   └── tr.json                      # Turkish translations (150+ keys)
│
├── logs/                            # Winston log files (auto-created)
├── .env                             # Environment variables
├── app.js                           # Main application entry point
├── knexfile.js                      # Knex database configuration
├── docker-compose.yml               # Multi-container Docker setup
├── Dockerfile                       # Node.js container configuration
├── init.sql                         # Database schema initialization
├── package.json                     # NPM dependencies and scripts
└── README.md                        # Project documentation
```

## Database Schema
```sql
users      (id, username, email, password_hash, language, created_at)
books      (id, user_id, title, author, category, status, rating, summary, cover_image, created_at)
notes      (id, book_id, content, page_number, created_at)
quotes     (id, book_id, text, is_favorite, created_at)
```

**Indexes:** `idx_books_user_id`, `idx_notes_book_id`, `idx_quotes_book_id`

## Environment Variables
```env
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=booknotes
DB_PORT=5432

# Session
SESSION_SECRET=your_random_secret_key
SESSION_MAX_AGE=86400000        # Cookie lifetime in ms (default: 24 hours)

# App
NODE_ENV=development
PORT=3000

# Optional
LOG_LEVEL=info
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000     # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

## API Routes

### Authentication
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/login` | Login page |
| POST | `/auth/login` | Process login |
| GET | `/auth/register` | Registration page |
| POST | `/auth/register` | Process registration |
| GET | `/auth/logout` | Logout |

### Books
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/books` | List all user's books (grid view) |
| GET | `/books/add` | Add book form page |
| POST | `/books/add` | Create new book (with file upload) |
| GET | `/books/:id` | Book details with notes and quotes |
| GET | `/books/edit/:id` | Edit book form page |
| POST | `/books/edit/:id` | Update book (with file upload) |
| POST | `/books/delete/:id` | Delete book and its cover image |

### Notes & Quotes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/books/:id/notes` | Add note to a book |
| POST | `/books/:id/notes/:noteId/delete` | Delete a note |
| POST | `/books/:id/quotes` | Add quote to a book |
| POST | `/books/:id/quotes/:quoteId/delete` | Delete a quote |
| POST | `/books/:id/quotes/:quoteId/favorite` | Toggle favorite status |

### Application
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home (redirects to dashboard or login) |
| GET | `/dashboard` | Main dashboard with statistics |
| GET | `/language/:lang` | Switch language (en/tr) |

## Architecture

The application follows a layered architecture pattern:

```
Routes -> Middleware (auth, validation, upload) -> Controllers -> Services -> Database
```

- **Routes**: Define endpoints and chain middleware
- **Middleware**: Handle authentication, validation, file uploads, and error handling
- **Controllers**: Manage request/response flow and flash messages
- **Services**: Execute database queries and business logic
- **Config**: Database, session, and logger configuration

## Security Features

- Password hashing with bcrypt (configurable rounds via `BCRYPT_ROUNDS`, default 10)
- Session-based authentication with `httpOnly`, `sameSite: strict`, and `secure` (production only) cookies
- Helmet security headers including a detailed Content Security Policy (allows cdnjs, Google Fonts/APIs)
- Rate limiting on `/auth` routes (configurable via `RATE_LIMIT_WINDOW_MS` / `RATE_LIMIT_MAX_REQUESTS`)
- CORS configuration via `CORS_ORIGIN` environment variable
- SQL injection prevention (parameterized queries via `db.raw()`)
- Input validation and sanitization with express-validator (i18n error messages)
- Request body size capped at 10MB
- File upload restrictions (JPEG, PNG, WebP, GIF only; 5MB max; UUID-named output)
- Image processing with Sharp (resized to 400×600, WebP quality 80)
- Authorization checks — all queries scope data by `user_id`
- Old cover files deleted from disk when a book is updated or removed (skipped for external URLs)
- Environment variable protection (.env not committed to Git)

## Internationalization (i18n)

The application supports full English and Turkish interfaces:
- All UI text, labels, buttons, placeholders
- Flash messages (success, error)
- Validation error messages
- Navigation and footer text

Users can switch languages via the navbar language switcher (EN | TR).

## Development
```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Docker commands
docker-compose up -d       # Start containers
docker-compose down        # Stop containers
docker-compose logs -f     # View logs
docker-compose down -v     # Remove volumes
```

## User Workflow

1. **Register** - Create account with username, email, password
2. **Login** - Access your personal library
3. **Add Books** - Upload cover or use URL, add details
4. **Manage Books** - Edit, delete, change status and rating
5. **Take Notes** - Add notes with optional page numbers
6. **Save Quotes** - Capture memorable passages, mark favorites
7. **Track Progress** - View dashboard statistics
8. **Switch Language** - Toggle between English and Turkish

## Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Bilgenur Pala**

- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

---

Made with love by Bilgenur Pala
