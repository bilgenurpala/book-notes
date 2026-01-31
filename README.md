# BookNotes

A modern full-stack reading management application with Docker support and multi-language capabilities.

## Project Status

**Development Days Completed:** 3 of 16  
**Last Updated:** January 17, 2025

### Completed (Days 1-3)

**Day 1 - Project Foundation:**
- Project structure and folder organization
- Package dependencies configuration
- Git repository initialization
- Environment variables setup

**Day 2 - Docker & Database:**
- Docker containerization with Node.js 20
- Docker Compose multi-container setup
- PostgreSQL 16 database configuration
- Complete database schema with 4 tables
- Automatic database initialization script

**Day 3 - Authentication Backend:**
- User registration with bcrypt password hashing
- Login functionality with session management
- Authentication controller and routes
- Password security (10 rounds bcrypt)
- Flash messages for user feedback

### In Progress
- Authentication views (Day 4)
- Main application layout (Day 5)

## Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/bilgenurpala/book-notes.git
cd book-notes

# Start with Docker
docker-compose up -d

# Access the application
http://localhost:3000
```

## Project Structure
```
book-notes/
├── package.json
├── .env.example
├── .gitignore
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── init.sql
│
├── src/
│   ├── config/
│   │   └── db.js                # PostgreSQL connection pool
│   ├── controllers/
│   │   └── authController.js    # Authentication logic (NEW)
│   ├── routes/
│   │   └── auth.js              # Auth routes (NEW)
│   └── views/                   # (ready for Day 4)
│       ├── auth/
│       ├── books/
│       └── layouts/
│
├── public/
│   ├── css/
│   └── uploads/
│
└── locales/
```

## Database Schema
```sql
-- Users (authentication)
users (id, username, email, password_hash, language, created_at)

-- Books (main collection)
books (id, user_id, title, author, category, status, rating, summary, cover_image, created_at)

-- Notes (book annotations)
notes (id, book_id, content, page_number, created_at)

-- Quotes (memorable passages)
quotes (id, book_id, text, is_favorite, created_at)
```

## Tech Stack

**Backend:** Node.js 20, Express.js 5, PostgreSQL 16  
**Authentication:** bcrypt (10 rounds)  
**Session:** express-session  
**DevOps:** Docker, Docker Compose  
**Upcoming:** EJS Templates, i18n, Multer

## Development Timeline

| Days | Phase | Status |
|------|-------|--------|
| 1-2 | Infrastructure Setup | Complete |
| 3-5 | Authentication System | In Progress |
| 6-11 | Core Features | Planned |
| 12-13 | Dashboard & Stats | Planned |
| 14 | Multi-language | Planned |
| 15-16 | UI Polish | Planned |

## Features Implemented

### Authentication (Day 3)
- User registration with email validation
- Secure password hashing (bcrypt, 10 rounds)
- Login with session management
- Logout functionality
- Flash messages for user feedback
- Error handling for auth failures

### Next Steps (Day 4)
- Login page UI (EJS template)
- Register page UI (EJS template)
- Form validation and styling

## Author

**Bilgenur Pala**
- Email: bilgenurpala@gmail.com
- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## License

ISC License

---

**Current Status:** Authentication Backend Complete  
**Days Completed:** 3 / 16  
**Next Milestone:** Authentication Views (Day 4)

Made with love by Bilgenur Pala
