# BookNotes ���

A modern, full-stack reading management application built with Node.js, PostgreSQL, and Docker.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)](https://www.postgresql.org/)

## Overview

BookNotes is a comprehensive book management system that helps readers organize their reading journey. Track books, save memorable quotes, write notes, and visualize your reading statistics—all in one place.

## Features

- **User Authentication** - Secure registration and login with bcrypt password hashing
- **Book Management** - Add, edit, delete, and organize your book collection
- **Notes & Quotes** - Capture important passages and personal insights
- **Reading Statistics** - Track your reading progress with visual dashboards
- **File Upload** - Upload custom book cover images
- **Multi-language Support** - Available in English and Turkish
- **Dark Mode** - Easy on the eyes for night reading
- **Docker Ready** - One-command deployment with Docker Compose

## Tech Stack

**Backend**
- Node.js 20 (Alpine)
- Express.js 5
- PostgreSQL 16
- bcrypt for password hashing
- express-session for authentication
- Multer for file uploads

**Frontend**
- EJS templating engine
- Modern CSS with custom properties
- Font Awesome icons
- Responsive design

**DevOps**
- Docker & Docker Compose
- Automated database initialization
- Environment-based configuration

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
book-notes/
│
├── public/                    # Static files
│   ├── css/                   # Stylesheets
│   │   ├── style.css          # Main styles (coming soon)
│   │   └── landing.css        # Landing page styles (coming soon)
│   └── uploads/               # Book cover images
│       └── .gitkeep           # Keeps empty folder in Git
│
├── src/                       # Source code
│   ├── config/
│   │   └── db.js              # PostgreSQL connection pool
│   │
│   ├── controllers/           # Business logic
│   │   ├── authController.js  # Authentication logic
│   │   └── booksController.js # Books CRUD logic
│   │
│   ├── routes/                # API routes
│   │   ├── auth.js            # Auth endpoints
│   │   └── books.js           # Books endpoints
│   │
│   └── views/                 # EJS templates
│       ├── auth/              # Authentication pages
│       │   ├── login.ejs      # Login page
│       │   └── register.ejs   # Registration page
│       │
│       ├── books/             # Book management pages (coming soon)
│       │   ├── list.ejs       # Books list
│       │   ├── add.ejs        # Add book form
│       │   ├── edit.ejs       # Edit book form
│       │   └── detail.ejs     # Book details
│       │
│       └── layouts/           # Layout templates
│           └── main.ejs       # Main application layout
│
├── locales/                   # Internationalization (coming soon)
│   ├── en.json                # English translations
│   └── tr.json                # Turkish translations
│
├── .dockerignore              # Docker build exclusions
├── .env.example               # Environment variables template
├── .gitignore                 # Git exclusions
├── app.js                     # Main application entry point
├── docker-compose.yml         # Multi-container Docker setup
├── Dockerfile                 # Node.js container configuration
├── init.sql                   # Database schema initialization
├── package.json               # NPM dependencies and scripts
└── README.md                  # Project documentation
```

### Important Notes:

- **Not in Git**: `node_modules/`, `.env`, `package-lock.json`, `public/uploads/*` (except .gitkeep)
- **In Git**: All source code, configuration templates, documentation
- **`.gitkeep`**: Empty file to preserve the `uploads/` folder structure in Git

## Database Schema
```sql
users      (id, username, email, password_hash, language, created_at)
books      (id, user_id, title, author, category, status, rating, summary, cover_image, created_at)
notes      (id, book_id, content, page_number, created_at)
quotes     (id, book_id, text, is_favorite, created_at)
```

## Environment Variables
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=booknotes
DB_PORT=5432
SESSION_SECRET=your_random_secret_key
NODE_ENV=development
```

## API Routes

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/register` - Registration page
- `POST /auth/register` - Process registration
- `GET /auth/logout` - Logout

### Books
- `GET /books` - List all books
- `GET /books/add` - Add book page
- `POST /books/add` - Create new book
- `GET /books/:id` - Book details
- `GET /books/edit/:id` - Edit book page
- `POST /books/edit/:id` - Update book
- `POST /books/delete/:id` - Delete book

### Notes & Quotes
- `POST /books/:id/notes` - Add note
- `POST /books/:id/notes/:noteId/delete` - Delete note
- `POST /books/:id/quotes` - Add quote
- `POST /books/:id/quotes/:quoteId/delete` - Delete quote
- `POST /books/:id/quotes/:quoteId/favorite` - Toggle favorite

### Application
- `GET /` - Home (redirects to dashboard or login)
- `GET /dashboard` - Main dashboard
- `GET /quotes` - All saved quotes (coming soon)
- `GET /stats` - Reading statistics (coming soon)

## Development
```bash
# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Docker commands
npm run docker:up      # Start containers
npm run docker:down    # Stop containers
npm run docker:logs    # View logs
```

## Features Implementation Status

- ✅ User authentication (register, login, logout)
- ✅ Session management with express-session
- ✅ Book CRUD operations backend
- ✅ Notes system backend (add, delete)
- ✅ Quotes system backend (add, delete, favorite)
- ✅ File upload configuration with Multer
- ✅ Main application layout
- ⏳ Book views (list, add, edit, detail) - In Progress
- ⏳ Dashboard with statistics
- ⏳ Multi-language interface (i18n)
- ⏳ Complete CSS styling
- ⏳ Landing page

## Security Features

- Password hashing with bcrypt (10 rounds)
- Session-based authentication
- SQL injection prevention (parameterized queries)
- Environment variable protection
- Input validation and sanitization
- File upload restrictions (images only, 5MB max)
- Secure file storage in public/uploads

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

- ��� Email: bilgenurpala@gmail.com
- ��� GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- ��� LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## Acknowledgments

- Built as part of a structured learning journey in full-stack development
- Inspired by the need for better personal reading management tools

---

⭐ If you find this project useful, please consider giving it a star!

Made with ❤️ by Bilgenur Pala
