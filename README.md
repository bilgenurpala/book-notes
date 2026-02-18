# 📚 BookNotes

> A modern, full-stack reading management application — track your books, write notes, save quotes, and visualize your reading journey.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🖼️ Screenshots

### 🏠 Landing Page
![Homepage](https://github.com/user-attachments/assets/7d628e53-25a4-4dfb-954a-6b281349a0d9)

### 🔐 Register
![Register](https://github.com/user-attachments/assets/8ca52e64-a281-4cbb-a2a6-c24f3eed10d0)

### 🔑 Login
![Login](https://github.com/user-attachments/assets/4ba4c8e9-88fd-45d6-b425-04c2d109afa7)

### 📊 Dashboard
![Dashboard](https://github.com/user-attachments/assets/c613da96-b980-4b18-8b61-1ccd7cefb380)

### 📖 My Books
![My Books](https://github.com/user-attachments/assets/8302b545-ac6a-459c-b260-9df0e1b9443e)

### ➕ Add New Book
![Add New Book](https://github.com/user-attachments/assets/a6ff55bb-cfbb-4bf9-9e3a-43667c309ef0)

---

## ✨ Features

- 🏠 **Landing Page** — Public hero page with feature showcase and call-to-action
- 🔐 **User Authentication** — Register and log in with email or username; passwords hashed with bcrypt
- 📚 **Book Management** — Add, edit, delete, and organize your personal book collection
- 🖼️ **Cover Image Support** — Upload a file *(JPEG, PNG, WebP, GIF — max 5 MB, auto-resized to 400×600 WebP)* or paste an external URL
- 📝 **Notes** — Attach notes to any book with optional page references
- 💬 **Quotes** — Save memorable passages and mark your favorites
- 📊 **Dashboard** — At-a-glance stats: total books, currently reading, completed, and total quotes
- 🌓 **Dark / Light Mode** — Theme toggle with preference saved to `localStorage`
- 📱 **Responsive Navigation** — Mobile hamburger menu with scroll-lock
- ⏱️ **Auto-dismissing Alerts** — Flash messages fade out automatically after 5 seconds
- 📖 **Reading Status** — Track books as `want_to_read` *(default)*, `reading`, or `completed`
- ⭐ **Rating System** — Rate books from 1 to 5 stars
- 🌍 **Multi-language Support** — Full English 🇬🇧 and Turkish 🇹🇷 interface with 150+ translation keys
- ✅ **Input Validation** — Server-side validation with i18n error messages
- 🪵 **Logging** — Structured logging with Winston; HTTP request logs via Morgan
- 🛡️ **Security** — Helmet (CSP), rate limiting, CORS, secure session cookies
- 🐳 **Docker Ready** — Spin up the full stack with a single command

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js 20 (Alpine) | Runtime |
| Express.js 5 | Web framework |
| PostgreSQL 16 | Database |
| Knex.js | SQL query builder |
| bcrypt | Password hashing (configurable rounds) |
| express-session | Session management |
| express-validator | Input validation |
| Multer + Sharp | File upload & image processing |
| Winston + Morgan | Structured & HTTP logging |
| Helmet | Security headers + CSP |
| express-rate-limit | Rate limiting on auth routes |
| i18n | Internationalization (EN/TR) |
| connect-flash | Flash messages |

### Frontend
| Technology | Purpose |
|---|---|
| EJS + express-ejs-layouts | Server-side templating |
| CSS custom properties | Theming (dark/light mode) |
| Vanilla JavaScript | Theme toggle, mobile menu, alerts |
| Font Awesome 6.4 | Icons |

### DevOps & Tooling
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| Nodemon | Auto-restart in development |
| Jest + Supertest | Unit & HTTP integration testing |
| ESLint (Airbnb) + Prettier | Linting & formatting |

---

## 🚀 Getting Started

### Option 1 — Docker *(Recommended)*

**Prerequisites:** Docker Desktop

```bash
# Clone the repository
git clone https://github.com/bilgenurpala/book-notes.git
cd book-notes-project

# Start the full stack (app + database)
docker-compose up -d

# Open in your browser
# http://localhost:3000
```

That's it! Docker will automatically:
- Start a PostgreSQL 16 database
- Initialize the schema from `init.sql`
- Start the Node.js server

---

### Option 2 — Local Setup

**Prerequisites:** Node.js 20+, PostgreSQL 16+

```bash
# 1. Install dependencies
npm install

# 2. Create and initialize the database
createdb booknotes
psql -d booknotes -f init.sql

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000`

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=booknotes
DB_USER=postgres
DB_PASSWORD=your_password

# Session
SESSION_SECRET=a_long_random_secret_key
SESSION_MAX_AGE=86400000        # Cookie lifetime in ms (default: 24 hours)

# App
NODE_ENV=development
PORT=3000

# Optional
LOG_LEVEL=info                  # error | warn | info | http | debug
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000     # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📁 Project Structure

```
book-notes-project/
├── public/
│   ├── css/
│   │   ├── style.css               # Main styles (dark/light theme)
│   │   └── auth.css                # Auth page styles
│   ├── js/
│   │   └── main.js                 # Theme toggle, mobile menu, alerts
│   └── uploads/                    # Uploaded book cover images
│
├── src/
│   ├── config/
│   │   ├── database.js             # Knex connection pool (dev: max 10, prod: max 20)
│   │   ├── logger.js               # Winston logger (console + file output)
│   │   └── session.js              # Express session configuration
│   │
│   ├── middleware/
│   │   ├── auth.js                 # isAuthenticated, isGuest, attachUser guards
│   │   ├── errorHandler.js         # Global 404 / 500 handler with Winston logging
│   │   ├── upload.js               # Multer + Sharp pipeline (UUID filenames)
│   │   └── validation.js           # express-validator error → flash redirect
│   │
│   ├── controllers/
│   │   ├── authController.js       # Register, login, logout
│   │   └── booksController.js      # Book CRUD, notes, quotes, favorites
│   │
│   ├── routes/
│   │   ├── auth.js                 # /auth/* with validation middleware
│   │   └── books.js                # /books/* with upload middleware
│   │
│   ├── services/
│   │   ├── authService.js          # User DB operations
│   │   └── bookService.js          # Book, note, quote DB operations
│   │
│   ├── validators/
│   │   ├── authValidator.js        # Register & login validation rules
│   │   └── bookValidator.js        # Book, note, quote validation rules
│   │
│   └── views/
│       ├── layouts/main.ejs        # Main layout (navbar, flash, footer)
│       ├── landing.ejs             # Public landing page
│       ├── dashboard.ejs           # Reading statistics dashboard
│       ├── auth/                   # login.ejs, register.ejs
│       ├── books/                  # list, add, edit, detail
│       └── errors/                 # 404.ejs, 500.ejs
│
├── locales/
│   ├── en.json                     # English translations (150+ keys)
│   └── tr.json                     # Turkish translations (150+ keys)
│
├── logs/                           # Winston log files (auto-created)
├── app.js                          # Application entry point
├── knexfile.js                     # Knex database configuration
├── init.sql                        # Database schema & indexes
├── docker-compose.yml
├── Dockerfile
└── .env                            # Not committed
```

---

## 🗄️ Database Schema

```sql
users   (id, username, email, password_hash, language, created_at)
books   (id, user_id → users, title, author, category, status,
         rating, summary, cover_image, created_at)
notes   (id, book_id → books, content, page_number, created_at)
quotes  (id, book_id → books, text, is_favorite, created_at)
```

> All foreign keys use `CASCADE DELETE` — removing a book also removes its notes and quotes.

**Indexes:** `idx_books_user_id` · `idx_notes_book_id` · `idx_quotes_book_id`

---

## 🛣️ Routes

### 🔐 Authentication
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/login` | Login page |
| POST | `/auth/login` | Process login |
| GET | `/auth/register` | Registration page |
| POST | `/auth/register` | Process registration |
| GET | `/auth/logout` | Logout & destroy session |

### 📚 Books
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/books` | Grid view of all user's books |
| GET | `/books/add` | Add book form |
| POST | `/books/add` | Create book *(with optional file upload)* |
| GET | `/books/:id` | Book detail with notes & quotes |
| GET | `/books/edit/:id` | Edit book form |
| POST | `/books/edit/:id` | Update book *(with optional file upload)* |
| POST | `/books/delete/:id` | Delete book and cover image |

### 📝 Notes & Quotes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/books/:id/notes` | Add note to a book |
| POST | `/books/:id/notes/:noteId/delete` | Delete note |
| POST | `/books/:id/quotes` | Add quote to a book |
| POST | `/books/:id/quotes/:quoteId/delete` | Delete quote |
| POST | `/books/:id/quotes/:quoteId/favorite` | Toggle favorite |

### 🌐 Application
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Landing page *(or redirect to dashboard)* |
| GET | `/dashboard` | Reading statistics |
| GET | `/language/:lang` | Switch language (`en` / `tr`) |

---

## 🏗️ Architecture

```
Request
  └── Routes
        └── Middleware  (auth guard · validation · file upload)
              └── Controllers  (request / response flow, flash messages)
                    └── Services  (business logic, DB queries via Knex)
                          └── PostgreSQL
```

---

## 🔒 Security

| Measure | Detail |
|---|---|
| Password hashing | bcrypt, configurable rounds via `BCRYPT_ROUNDS` (default 10) |
| Session cookies | `httpOnly`, `sameSite: strict`, `secure` in production |
| Security headers | Helmet with Content Security Policy (cdnjs, Google Fonts/APIs) |
| Rate limiting | Applied to `/auth` routes via `RATE_LIMIT_*` env vars |
| CORS | Configurable origin via `CORS_ORIGIN` |
| SQL injection | Parameterized queries via `db.raw()` |
| Input validation | express-validator with i18n error messages |
| Request body | Capped at 10 MB |
| File uploads | JPEG, PNG, WebP, GIF only · 5 MB max · UUID-named output |
| Image processing | Sharp: resized to 400×600, WebP quality 80 |
| Authorization | All queries scoped by `user_id` |
| File cleanup | Old cover deleted from disk on update/delete *(skipped for external URLs)* |

---

## 🌍 Internationalization

The app ships with full **English** and **Turkish** translations covering:

- All UI labels, buttons, and placeholders
- Flash messages (success & error)
- Server-side validation error messages
- Navigation and footer text

Users can toggle languages via the navbar switcher — preference is saved to their account.

---

## 💻 Development

```bash
# Start development server (auto-restart with nodemon)
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint
npm run lint

# Format code
npm run format

# Docker
docker-compose up -d       # Start containers in background
docker-compose logs -f     # Stream logs
docker-compose down        # Stop containers
docker-compose down -v     # Stop and remove volumes
```

---

## 🔄 User Workflow

1. **Visit** the landing page and create an account
2. **Log in** to access your personal library
3. **Add books** — upload a cover image or paste a URL, set status and rating
4. **Write notes** — attach notes to any book with optional page numbers
5. **Save quotes** — capture memorable passages and mark your favorites
6. **Track progress** — view your reading stats on the dashboard
7. **Switch language** — toggle between English and Turkish anytime

---

## 🤝 Contributing

This is a personal project, but suggestions and feedback are always welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👩‍💻 Author

**Bilgenur Pala**

[![GitHub](https://img.shields.io/badge/GitHub-bilgenurpala-181717?logo=github)](https://github.com/bilgenurpala)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bilgenur%20Pala-0A66C2?logo=linkedin)](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

---

<div align="center">Made with ❤️ by Bilgenur Pala</div>
