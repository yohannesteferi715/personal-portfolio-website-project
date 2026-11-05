# Backend-Focused Full-Stack Software Engineer Portfolio

A professional portfolio for a backend-focused full-stack software engineer specializing in Python, Django, Django REST Framework, FastAPI, PostgreSQL, and React.

## Tech Stack

**Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, Alembic, JWT auth
**Frontend:** React, Vite, Tailwind CSS v4, React Router
**Database:** SQLite (dev) / PostgreSQL (production)

## Project Structure

```
backend/
├── app/
│   ├── core/          # config, database, security, exceptions
│   ├── models/        # SQLAlchemy ORM models
│   ├── schemas/       # Pydantic v2 request/response schemas
│   ├── repositories/  # Data access layer (BaseRepository + domain repos)
│   ├── services/      # Business logic layer
│   ├── api/v1/
│   │   ├── endpoints/ # Thin route handlers
│   │   └── router.py  # Aggregates all routers at /api/v1
│   ├── seed.py        # Idempotent database seeder
│   └── seed_data.py   # Self-contained seed content
├── migrations/        # Alembic
├── uploads/           # Served at /api/uploads/
├── main.py            # App factory + lifespan
└── requirements.txt

src/
├── sections/          # Portfolio page sections
├── components/         # Reusable UI components
├── hooks/             # useApi data-fetching hook
├── layout/            # Navbar
├── admin/             # Admin dashboard (CRUD)
│   ├── pages/         # Profile, Projects, Experience, Education, Skills, Articles, Testimonials
│   └── components/    # Admin layout, shared UI
└── App.jsx            # Router (portfolio + admin)
```

## Setup

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Seed database (auto-runs on first server start, or run manually)
python -m app.seed

# Start server
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173` for the portfolio.
Open `http://localhost:5173/admin` for the admin dashboard.

### Admin Login

- Username: `admin`
- Password: `admin1234`
- Change in `backend/.env` (see `.env.example` below)

### Environment Variables

Create `backend/.env`:

```
DATABASE_URL=sqlite:///./portfolio.db
SECRET_KEY=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
ADMIN_EMAIL=you@example.com
```

### PostgreSQL Setup

To use PostgreSQL instead of SQLite, update `DATABASE_URL` in `.env`:

```
DATABASE_URL=postgresql://portfolio_user:portfolio_pass@localhost:5432/portfolio_db
```

### Alembic Migrations

```bash
cd backend
source .venv/bin/activate

# Generate migration from model changes
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1
```

## API Documentation

- Swagger UI: `http://localhost:8000/api/docs`
- ReDoc: `http://localhost:8000/api/redoc`

### Public Endpoints (read-only)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/stats` | Content counts |
| GET | `/api/v1/profile` | Portfolio profile |
| GET | `/api/v1/skills` | List skills (filter by `?category=`) |
| GET | `/api/v1/about` | About section |
| GET | `/api/v1/projects` | List projects (filter by `?category=` or `?technology=`) |
| GET | `/api/v1/experience` | Experience timeline |
| GET | `/api/v1/education` | Education entries |
| GET | `/api/v1/testimonials` | Testimonials |
| GET | `/api/v1/articles` | Published articles |

### Protected Endpoints (require JWT)

All POST/PUT/DELETE operations require `Authorization: Bearer <token>` header.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | Login, returns JWT token |
| PUT | `/api/v1/profile` | Update profile |
| POST | `/api/v1/profile/photo` | Upload profile photo |
| POST/PUT/DELETE | `/api/v1/skills/*` | Manage skills |
| PUT | `/api/v1/about` | Update about |
| POST/PUT/DELETE | `/api/v1/projects/*` | Manage projects |
| POST/PUT/DELETE | `/api/v1/experience/*` | Manage experience |
| POST/PUT/DELETE | `/api/v1/education/*` | Manage education |
| POST/PUT/DELETE | `/api/v1/testimonials/*` | Manage testimonials |
| POST/PUT/DELETE | `/api/v1/articles/*` | Manage articles |

## Database Entities

| Model | Description |
|-------|-------------|
| Profile | Single-row: name, title, bio, headline, contact info, social links |
| Skill | Technology name + category (backend/frontend/database/devops/engineering) |
| About | Single-row: paragraphs, mission quote, highlight cards |
| Project | Title, description, problem, approach, architecture, tags, category, links |
| Experience | Role, company, period, employment type, start/end dates, technologies |
| Education | Institution, degree, field of study, dates, coursework |
| Testimonial | Quote, author, role, avatar |
| Article | Title, slug, excerpt, markdown content, tags, published flag |

## Contact

EmailJS handles the contact form on the frontend. Configure in `.env`:

```
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```
