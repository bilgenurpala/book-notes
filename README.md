# BookNotes 📚

A modern full-stack reading management application with Docker support and multi-language capabilities.

## 🚀 Project Status

**Development Days Completed:** 1-2 of 16  
**Last Updated:** January 30, 2026

### ✅ Completed (Days 1-2)

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

### 🔄 In Progress
- Authentication system (Day 3)
- User interface (Days 4-5)
- Book management features (Days 6-11)

## 🐳 Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/bilgenurpala/book-notes.git
cd book-notes

# Start with one command
docker-compose up -d

# Access the application
http://localhost:3000
```

## 📦 Project Structure
```
book-notes/
├── 📄 package.json           # All dependencies configured
├── 📄 .env.example           # Environment variables template
├── 📄 .gitignore             # Git ignore rules
│
├── 🐳 Dockerfile              # Node.js container config
├── 🐳 docker-compose.yml      # Multi-container orchestration
├── 🐳 .dockerignore           # Docker build optimization
│
├── 💾 init.sql                # Database initialization script
│
├── 📁 src/
│   ├── config/
│   │   └── db.js             # PostgreSQL connection pool
│   ├── controllers/          # (ready for Day 3)
│   ├── routes/               # (ready for Day 3)
│   └── views/                # (ready for Day 4)
│
├── 📁 public/
│   ├── css/                  # (ready for Day 15)
│   └── uploads/              # Book cover storage
│
└── 📁 locales/               # (ready for Day 14)
```

## 💾 Database Schema
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

## 🛠️ Tech Stack

**Backend:** Node.js 20, Express.js 5, PostgreSQL 16  
**DevOps:** Docker, Docker Compose  
**Upcoming:** EJS Templates, i18n, Multer

## 📅 Development Timeline

| Days | Phase | Status |
|------|-------|--------|
| 1-2 | Infrastructure Setup | ✅ Complete |
| 3-5 | Authentication System | 🔄 Next |
| 6-11 | Core Features | ⏳ Planned |
| 12-13 | Dashboard & Stats | ⏳ Planned |
| 14 | Multi-language | ⏳ Planned |
| 15-16 | UI Polish | ⏳ Planned |

## 🎯 Next Steps (Day 3)

- Implement authentication backend
- Password hashing with bcrypt
- User registration & login
- Session management

## 👤 Author

**Bilgenur Pala**
- 📧 Email: bilgenurpala@gmail.com
- 🐙 GitHub: [@bilgenurpala](https://github.com/bilgenurpala)
- 💼 LinkedIn: [Bilgenur Pala](https://www.linkedin.com/in/bilgenur-pala-892a1a225/)

## 📄 License

ISC License

---

**Current Status:** Infrastructure Complete ✅  
**Days Completed:** 2 / 16  
**Next Milestone:** Authentication System (Day 3)

Made with ❤️ by Bilgenur Pala
EOF
