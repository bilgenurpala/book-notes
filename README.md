# BookNotes í³š

A modern full-stack reading management application with Docker support and multi-language capabilities.

## íº€ Project Status

**Development Days Completed:** 2 of 16  
**Last Updated:** January 16, 2025

### âœ… Completed (Days 1-2)

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

### í´„ In Progress
- Authentication system (Day 3)
- User interface (Days 4-5)
- Book management features (Days 6-11)

## í°³ Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/bilgenurpala/book-notes.git
cd book-notes

# Start with one command
docker-compose up -d

# Access the application
http://localhost:3000
```

## í³¦ Project Structure
```
book-notes/
â”œâ”€â”€ í³„ package.json           # All dependencies configured
â”œâ”€â”€ í³„ .env.example           # Environment variables template
â”œâ”€â”€ í³„ .gitignore             # Git ignore rules
â”‚
â”œâ”€â”€ í°³ Dockerfile              # Node.js container config
â”œâ”€â”€ í°³ docker-compose.yml      # Multi-container orchestration
â”œâ”€â”€ í°³ .dockerignore           # Docker build optimization
â”‚
â”œâ”€â”€ í²¾ init.sql                # Database initialization script
â”‚
â”œâ”€â”€ í³ src/
â”‚   â”œâ”€â”€ config/
â”‚   â”‚   â””â”€â”€ db.js             # PostgreSQL connection pool
â”‚   â”œâ”€â”€ controllers/          # (ready for Day 3)
â”‚   â”œâ”€â”€ routes/               # (ready for Day 3)
â”‚   â””â”€â”€ views/                # (ready for Day 4)
â”‚
â”œâ”€â”€ í³ public/
â”‚   â”œâ”€â”€ css/                  # (ready for Day 15)
â”‚   â””â”€â”€ uploads/              # Book cover storage
â”‚
â””â”€â”€ í³ locales/               # (ready for Day 14)
```

## í²¾ Database Schema
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

## í» ï¸ Tech Stack

**Backend:** Node.js 20, Express.js 5, PostgreSQL 16  
**DevOps:** Docker, Docker Compose  
**Upcoming:** EJS Templates, i18n, Multer

## í³… Development Timeline

| Days | Phase | Status |
|------|-------|--------|
| 1-2 | Infrastructure Setup | âœ… Complete |
| 3-5 | Authentication System | í´„ Next |
| 6-11 | Core Features | â³ Planned |
| 12-13 | Dashboard & Stats | â³ Planned |
| 14 | Multi-language | â³ Planned |
| 15-16 | UI Polish | â³ Planned |

## í¾¯ Next Steps (Day 3)

- Implement authentication backend
- Password hashing with bcrypt
- User registration & login
- Session management

## í±¤ Author

**Bilgenur Pala**
- í³§ Email: bilgenurpala@gmail.com
- í°™ GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- í²¼ LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## í³„ License

ISC License

---

**Current Status:** Infrastructure Complete âœ…  
**Days Completed:** 2 / 16  
**Next Milestone:** Authentication System (Day 3)

Made with â¤ï¸ by Bilgenur Pala
