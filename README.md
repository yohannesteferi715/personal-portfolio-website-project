# Backend-Heavy Full-Stack & Agentic AI Engineer Portfolio

A modern, production-grade personal portfolio and content management system architected with **FastAPI** (Python 3.12) and **React 19** (Vite + Tailwind CSS v4). Built with a focus on clean modular architecture, high-efficiency API services, interactive visual design, and robust security.

---

## 🌟 Key Highlights

- **High-Efficiency Backend:** Async RESTful API built on FastAPI, Pydantic v2 schemas, SQLAlchemy 2.0 repository pattern, and Alembic migrations.
- **Agentic AI & Systems Showcase:** Visual representations of autonomous agent workflows (LangChain, LangGraph, RAG vector retrieval) and resilient data pipelines.
- **Dynamic Content Management (CMS):** Full-featured, authenticated admin panel to manage projects, skills, timeline, testimonials, CV files, and profile details without touching code.
- **Privacy-First Admin URL:** Admin dashboard route is decoupled from source code and dynamically loaded via environment variables (`VITE_ADMIN_BASE_PATH`) so private management URLs are never committed or exposed on public repositories.
- **Hardened Authentication:** Admin session tokens powered by HS256 JWT with salted bcrypt credential hashing, secure password mutation endpoints, and dependency-injected route authorization.
- **Interactive Visual Polish:** Glassmorphic UI with cyan-teal brand aesthetic (`#20B2A6`), animated glowing borders, custom particle canvas, action-triggered scroll capsules, and official SVG tech brand icons.
- **Native Document Handling:** Direct PDF upload and streaming service with `Content-Disposition: attachment` headers for one-click CV downloads.

---

## 🛠️ Architecture & Tech Stack

```
 personal/
 ├── backend/                   # FastAPI Backend Application
 │   ├── app/
 │   │   ├── api/v1/endpoints/  # Route controllers (profile, skills, projects, auth, etc.)
 │   │   ├── core/              # Config, DB session engine, security & password hashing
 │   │   ├── models/            # SQLAlchemy 2.0 ORM domain entities
 │   │   ├── repositories/      # Data access layer (abstract BaseRepository + domain repos)
 │   │   ├── schemas/           # Pydantic v2 request/response validation schemas
 │   │   ├── services/          # Business logic & file upload/validation handlers
 │   │   ├── seed.py            # Automated database seeder
 │   │   └── seed_data.py       # Production-ready initial seed dataset
 │   ├── migrations/            # Alembic schema migration versions
 │   ├── uploads/               # Uploaded assets (profile photos, project media, CV PDFs)
 │   ├── main.py                # FastAPI factory, lifespan manager & static mounts
 │   └── requirements.txt       # Python dependencies
 │
 ├── src/                       # React 19 Client Application
 │   ├── admin/                 # Admin CMS (Dashboard, Profile, Projects, Skills, Security)
 │   │   ├── pages/             # CMS management views
 │   │   ├── components/        # Layout, modals, forms & shared UI
 │   │   └── constants.js       # Dynamic route mapping driven by environment config
 │   ├── components/            # Animated buttons, particle fields, skeleton loaders
 │   ├── hooks/                 # Reusable hooks (useApi data fetching & state)
 │   ├── layout/                # Responsive navigation bar & high-impact footer
 │   ├── lib/                   # Smart case-insensitive tech icon resolver
 │   ├── sections/              # Hero, About, Architecture, Skills, Projects, Experience, Contact
 │   └── App.jsx                # Top-level client router
 │
 ├── .env.example               # Frontend environment template
 └── vite.config.js             # Vite configuration with automatic /api proxying
```

| Layer | Technologies |
|---|---|
| **Frontend UI** | React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React, Simple Icons |
| **Backend API** | Python 3.12, FastAPI, Starlette, Uvicorn, Python-Multipart |
| **ORM & Database** | SQLAlchemy 2.0, Alembic, SQLite (development) / PostgreSQL (production) |
| **Security & Auth** | JWT (JSON Web Tokens), bcrypt hashing, CORS middleware |
| **Communications** | Direct Gmail compose routing & EmailJS contact integration |

---

## 🚀 Quickstart & Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**
- **Python**: v3.11 or v3.12

---

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Create and activate a Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create your local environment configuration
cp .env.example .env

# Run database migrations (or let auto-seeder run on start)
python3 -m app.seed

# Start the development server
uvicorn main:app --reload --port 8001 --host 0.0.0.0
```

The backend API will start at `http://localhost:8001`.
- **Interactive Swagger Docs:** `http://localhost:8001/api/docs`
- **ReDoc Documentation:** `http://localhost:8001/api/redoc`

---

### 2. Frontend Setup

```bash
# From the project root directory
npm install

# Create your local environment configuration
cp .env.example .env

# Start the Vite development server
npm run dev -- --host 0.0.0.0 --port 5173
```

The portfolio web app will start at `http://localhost:5173`.

---

## 🔐 Environment Variables & Security

Sensitive configuration and private paths are managed via environment files and are excluded from Git tracking via `.gitignore`.

### Frontend Configuration (`.env`)

Create a `.env` file in the project root:

```env
# EmailJS credentials (for direct message dispatch from contact form)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Backend API proxy target (defaults to http://127.0.0.1:8001)
VITE_API_PROXY_TARGET=http://127.0.0.1:8001

# Private Admin Dashboard Route
# Set your own unguessable URL path (e.g., /admin/secret-gateway-715)
# This path is NEVER committed to Git and keeps your CMS entrance hidden.
VITE_ADMIN_BASE_PATH=/admin/your-custom-admin-slug
```

> **Security Note:** Public requests to `/admin` or unauthorized paths gracefully fall through to the public portfolio. The admin login and management tools only resolve when visiting your configured `VITE_ADMIN_BASE_PATH`.

---

### Backend Configuration (`backend/.env`)

Create a `backend/.env` file:

```env
# Database Connection
# SQLite for local development:
DATABASE_URL=sqlite:///portfolio.db
# PostgreSQL for production:
# DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db

# Security & JWT Token Generation (generate with: openssl rand -hex 32)
SECRET_KEY=replace-with-a-secure-random-secret-key-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Default Admin Setup (used to initialize admin credentials on first run)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me-to-a-strong-password

# Allowed CORS Origins (JSON formatted array)
CORS_ORIGINS=["http://localhost:5173","http://localhost:4173","https://yourdomain.com"]

# Debug Mode
DEBUG=False
```

---

## 🛡️ Admin CMS & Security Features

1. **Private Route Obscurity:** The admin portal is rendered at whatever path is defined in `VITE_ADMIN_BASE_PATH`. Changing the variable immediately relocates all internal redirects, sidebar navigation, and session expiration handlers without requiring code modifications.
2. **Bcrypt Password Management:** Administrators can change credentials directly in `/admin/{custom-path}/security` using cryptographically salted bcrypt verification with input validation.
3. **Session Guards:** Protected endpoints verify JWT tokens via FastAPI dependencies (`Depends(get_current_admin)`). If a session expires, the client safely clears storage and redirects to the private login page.
4. **CV Document Management:** Upload, preview, or delete curriculum vitae PDFs directly from `/admin/{custom-path}/profile`. Uploaded files are served with attachment headers to guarantee cross-browser downloads.

---

## 📡 API Endpoints Overview

### Public Endpoints (Read-Only)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service health status & API version |
| `GET` | `/api/v1/stats` | Content statistics (projects, experiences, testimonials, skills) |
| `GET` | `/api/v1/profile` | Engineer profile data, bio, and social links |
| `GET` | `/api/v1/profile/cv/download` | Direct attachment download of active CV PDF |
| `GET` | `/api/v1/skills` | List technologies & competencies (optional `?category=`) |
| `GET` | `/api/v1/about` | About story, highlights, and mission quote |
| `GET` | `/api/v1/projects` | Project catalog with technical approaches & tags |
| `GET` | `/api/v1/experience` | Career timeline entries & milestones |
| `GET` | `/api/v1/education` | Academic background & verified coursework |
| `GET` | `/api/v1/testimonials` | Peer and leadership endorsements |
| `GET` | `/api/v1/articles` | Published engineering articles and technical guides |

### Protected Endpoints (Admin Authorization Required)

All modifying operations require an `Authorization: Bearer <token>` header obtained from `/api/v1/auth/login`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT access token |
| `POST` | `/api/v1/auth/change-password` | Update admin password with bcrypt hashing |
| `GET` | `/api/v1/auth/me` | Audit current session authentication status |
| `PUT` | `/api/v1/profile` | Update profile information and headline |
| `POST` | `/api/v1/profile/photo` | Upload profile photo (JPEG/PNG/WebP) |
| `POST` | `/api/v1/profile/cv` | Upload official CV document (PDF) |
| `DELETE`| `/api/v1/profile/cv` | Remove active CV document from storage |
| `POST/PUT/DELETE` | `/api/v1/skills/*` | Add, modify, or remove technical skills |
| `PUT` | `/api/v1/about` | Update about narrative and highlight pillars |
| `POST/PUT/DELETE` | `/api/v1/projects/*` | Manage project portfolio and architecture tags |
| `POST/PUT/DELETE` | `/api/v1/experience/*` | Manage career milestones and employment details |
| `POST/PUT/DELETE` | `/api/v1/education/*` | Manage degrees, coursework, and institutions |
| `POST/PUT/DELETE` | `/api/v1/testimonials/*` | Manage testimonials and recommendations |
| `POST/PUT/DELETE` | `/api/v1/articles/*` | Publish and manage technical articles |

---

## 🗄️ Database Migrations (Alembic)

When modifying SQLAlchemy models in `backend/app/models/`:

```bash
cd backend
source .venv/bin/activate

# Generate an autodetected migration revision
alembic revision --autogenerate -m "describe_schema_change"

# Apply pending migrations to the database
alembic upgrade head

# Roll back the most recent migration
alembic downgrade -1
```

---

## 📦 Production Build & Deployment

### Build the Frontend

```bash
# Generate optimized production assets in dist/
npm run build

# Preview the production build locally
npm run preview
```

### Production Running

- **Frontend:** Serve the compiled `dist/` bundle via Nginx, Caddy, Vercel, or Cloudflare Pages.
- **Backend:** Run FastAPI behind a reverse proxy (e.g. Nginx with HTTPS/SSL) using an ASGI production runner:
  ```bash
  cd backend
  .venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
  ```

---

## 📄 License

This project is licensed under the MIT License.
