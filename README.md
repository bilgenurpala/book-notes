# BookNotes

A modern full-stack reading management application with Docker support and multi-language capabilities.

## Project Status

**Development Days Completed:** 4 of 16  
**Last Updated:** January 18, 2025

### Completed (Days 1-4)

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

**Day 4 - Authentication Views:**
- Login page with form validation
- Register page with user-friendly UI
- Flash message display for errors/success
- Responsive auth page design
- Dark theme styling

### In Progress
- Main application setup (Day 5)
- Express app configuration

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
├── init.sql
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── auth.js
│   └── views/
│       ├── auth/
│       │   ├── login.ejs        # (NEW)
│       │   └── register.ejs     # (NEW)
│       ├── books/
│       └── layouts/             # (ready for Day 5)
│
├── public/
│   ├── css/                     # (ready for Day 15)
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
**Authentication:** bcrypt (10 rounds), express-session  
**Templating:** EJS  
**DevOps:** Docker, Docker Compose  
**Upcoming:** Main layout, i18n, Multer

## Development Timeline

| Days | Phase | Status |
|------|-------|--------|
| 1-2 | Infrastructure Setup | Complete |
| 3-4 | Authentication System | Complete |
| 5 | Express App & Layout | Next |
| 6-11 | Core Features | Planned |
| 12-13 | Dashboard & Stats | Planned |
| 14 | Multi-language | Planned |
| 15-16 | UI Polish | Planned |

## Features Implemented

### Authentication (Days 3-4)
- User registration with email validation
- Secure password hashing (bcrypt, 10 rounds)
- Login with session management
- Logout functionality
- Flash messages for user feedback
- Responsive auth UI with dark theme
- Error handling and form validation

### Next Steps (Day 5)
- Express app configuration (app.js)
- Main layout with navigation
- EJS layouts setup
- Routing structure

## Author

**Bilgenur Pala**
- Email: bilgenurpala@gmail.com
- GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## License

ISC License

---

**Current Status:** Authentication Complete  
**Days Completed:** 4 / 16  
**Next Milestone:** Express App Setup (Day 5)

Made with love by Bilgenur Pala
