"""
Self-contained seed data for the portfolio.
No external JSON file — all content lives here as Python dicts.
"""


SEED_DATA = {
    # ─────────────────────────────────────────────────────────────────────────
    # PROFILE
    # ─────────────────────────────────────────────────────────────────────────
    "profile": {
        "name": "Yohannes Teferi",
        "title": "Backend-Heavy Full-Stack & Agentic AI Engineer",
        "headline_prefix": "Building",
        "headline_highlight": "scalable",
        "headline_suffix": "backend & agentic systems with",
        "headline_italic": "precision.",
        "bio": (
            "Backend-focused full-stack software and AI engineer with 2+ years of experience "
            "building high-throughput APIs, scalable distributed architectures, and autonomous RAG systems. "
            "Specialized in Python (FastAPI, Django, DRF), React, TypeScript, and multi-agent AI workflows."
        ),
        "years_experience": 2,
        "profile_photo_url": "/api/uploads/profile/profile-photo.jpg",
        "cv_url": None,
        "available_for_work": True,
        "email": "yohannes.teferi@example.com",
        "phone": None,
        "location": "Addis Ababa, Ethiopia",
        "social_links": [
            {"platform": "github", "href": "https://github.com/yohannesteferi715"},
            {"platform": "linkedin", "href": "https://www.linkedin.com/in/yohannes-teferi-071159371"},
            {"platform": "telegram", "href": "https://t.me/yoni715"},
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # SKILLS — organized by category
    # ─────────────────────────────────────────────────────────────────────────
    "skills": [
        # AI & Agentic Systems
        {"name": "Agentic AI", "category": "ai"},
        {"name": "RAG Systems", "category": "ai"},
        {"name": "LLMs", "category": "ai"},
        {"name": "LangChain", "category": "ai"},
        {"name": "Vector Databases", "category": "ai"},
        {"name": "Prompt Engineering", "category": "ai"},

        # Backend Development
        {"name": "FastAPI", "category": "backend"},
        {"name": "Python", "category": "backend"},
        {"name": "Django", "category": "backend"},
        {"name": "Django REST Framework", "category": "backend"},
        {"name": "RESTful API Design", "category": "backend"},
        {"name": "API Authentication & Authorization", "category": "backend"},
        {"name": "Redis", "category": "backend"},
        {"name": "Celery", "category": "backend"},

        # Frontend Development
        {"name": "React", "category": "frontend"},
        {"name": "TypeScript", "category": "frontend"},
        {"name": "JavaScript", "category": "frontend"},
        {"name": "HTML5", "category": "frontend"},
        {"name": "CSS3", "category": "frontend"},

        # Databases & Foundations
        {"name": "PostgreSQL", "category": "database"},
        {"name": "Database Design", "category": "database"},
        {"name": "Data Modeling", "category": "database"},
        {"name": "SQL", "category": "database"},
        {"name": "DSA", "category": "database"},

        # DevOps & Tools
        {"name": "Docker", "category": "devops"},
        {"name": "Git", "category": "devops"},
        {"name": "GitHub", "category": "devops"},
        {"name": "Linux", "category": "devops"},
        {"name": "API Documentation", "category": "devops"},

        # Software Engineering
        {"name": "SRS & Software Design", "category": "engineering"},
        {"name": "Software Architecture", "category": "engineering"},
        {"name": "System Design", "category": "engineering"},
        {"name": "SRS", "category": "engineering"},
        {"name": "SDD", "category": "engineering"},
        {"name": "Clean Code", "category": "engineering"},
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # ABOUT
    # ─────────────────────────────────────────────────────────────────────────
    "about": {
        "paragraphs": [
            (
                "I am a backend-focused full-stack and AI systems engineer with 2+ years of "
                "experience building scalable web architectures, production RESTful APIs, and "
                "autonomous Agentic RAG workflows. My core expertise centers on Python (FastAPI, "
                "Django, DRF) and modern React/TypeScript user interfaces."
            ),
            (
                "I specialize in building intelligent retrieval-augmented generation (RAG) pipelines, "
                "multi-agent orchestration, vector embeddings, and robust database architectures with PostgreSQL "
                "and Redis. I pair this with software engineering rigor, authoring Software Requirements "
                "Specifications (SRS) and Software Design Descriptions (SDD) to ensure maintainable, high-trust software."
            ),
            (
                "From designing high-throughput asynchronous APIs to orchestrating agentic tool-use loops "
                "that solve real-world problems, I treat software engineering as an end-to-end discipline: "
                "clean abstractions, solid system design, and verifiable performance."
            ),
        ],
        "mission_quote": (
            "I believe great software starts with solid architecture, clear requirements, "
            "and code that other engineers can understand, maintain, and scale."
        ),
        "highlights": [
            {"icon": "Bot", "title": "Agentic AI & RAG",
             "description": "Building autonomous multi-agent systems, semantic vector search, and verifiable RAG pipelines."},
            {"icon": "Server", "title": "Backend Architecture",
             "description": "Designing high-performance async APIs and microservices with FastAPI, Django, and DRF."},
            {"icon": "Database", "title": "Database Design & DSA",
             "description": "Modeling relational schemas in PostgreSQL, Redis caching, and algorithmic optimization."},
            {"icon": "FileText", "title": "Software Design & SRS",
             "description": "Writing SRS, SDD, and architectural documentation ensuring maintainable and aligned codebases."},
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # PROJECTS — sample projects demonstrating backend engineering
    # ─────────────────────────────────────────────────────────────────────────
    "projects": [
        {
            "title": "Agentic RAG Knowledge Engine",
            "description": (
                "An autonomous multi-agent research and retrieval-augmented generation (RAG) platform "
                "with hybrid vector search, dynamic tool invocation, citation verification, and an async FastAPI backend."
            ),
            "problem": (
                "Complex research queries require multi-step reasoning, source retrieval, and synthesis "
                "without hallucinations or lost context."
            ),
            "approach": (
                "Designed an agentic supervisor with LangChain and FastAPI, integrating pgvector for hybrid retrieval, "
                "query decomposition, and automated fact-checking guardrails."
            ),
            "architecture": (
                "FastAPI async backend, LangChain agentic supervisor, PostgreSQL + pgvector, Redis task queue, "
                "Docker Compose, and React streaming UI."
            ),
            "image_url": "/api/uploads/projects/project2.png",
            "tags": ["FastAPI", "Agentic AI", "RAG Systems", "LangChain", "PostgreSQL", "Docker"],
            "category": "ai",
            "live_url": "#",
            "github_url": "#",
            "featured": True,
            "order": 1,
        },
        {
            "title": "E-Commerce API Platform",
            "description": (
                "A full-featured e-commerce backend with product catalog, cart management, "
                "order processing, and payment integration. Built with Django REST Framework "
                "and React frontend."
            ),
            "problem": (
                "Small businesses need an affordable, customizable e-commerce platform with "
                "proper API design and data integrity."
            ),
            "approach": (
                "Designed a modular REST API with Django REST Framework, using serializers "
                "for input validation, ViewSets for CRUD operations, and custom permissions "
                "for role-based access control."
            ),
            "architecture": (
                "Django REST Framework backend with PostgreSQL, JWT authentication, "
                "Stripe payment integration, Celery for async tasks, and React frontend."
            ),
            "image_url": "/api/uploads/projects/project1.png",
            "tags": ["Django", "DRF", "PostgreSQL", "React", "Stripe", "Docker"],
            "category": "full-stack",
            "live_url": "#",
            "github_url": "#",
            "featured": True,
            "order": 2,
        },
        {
            "title": "FastAPI Task Management Service",
            "description": (
                "A high-performance task management API built with FastAPI, featuring async "
                "endpoints, WebSocket notifications, and PostgreSQL with SQLAlchemy ORM."
            ),
            "problem": (
                "Teams need a fast, reliable task management API that can handle real-time "
                "updates and scale efficiently."
            ),
            "approach": (
                "Leveraged FastAPI's async capabilities with SQLAlchemy 2.0 async sessions, "
                "implemented WebSocket endpoints for real-time updates, and used Pydantic v2 "
                "for request/response validation."
            ),
            "architecture": (
                "FastAPI with async SQLAlchemy, PostgreSQL, WebSocket support, JWT auth, "
                "and OpenAPI auto-generated documentation."
            ),
            "image_url": "/api/uploads/projects/project2.png",
            "tags": ["FastAPI", "PostgreSQL", "SQLAlchemy", "WebSocket", "Docker"],
            "category": "backend",
            "live_url": "#",
            "github_url": "#",
            "featured": True,
            "order": 3,
        },
        {
            "title": "Authentication & Authorization System",
            "description": (
                "A reusable authentication module with JWT tokens, refresh token rotation, "
                "role-based permissions, and OAuth2 social login integration."
            ),
            "problem": (
                "Every new project needs authentication, but building it from scratch is "
                "error-prone and time-consuming."
            ),
            "approach": (
                "Built a reusable Django app with custom user model, JWT-based authentication "
                "using djangorestframework-simplejwt, and role-based permission classes."
            ),
            "architecture": (
                "Django custom user model, DRF JWT authentication, OAuth2 social login, "
                "and PostgreSQL for user storage."
            ),
            "image_url": "/api/uploads/projects/project3.png",
            "tags": ["Django", "JWT", "OAuth2", "DRF", "PostgreSQL"],
            "category": "backend",
            "live_url": "#",
            "github_url": "#",
            "featured": True,
            "order": 4,
        },
        {
            "title": "Dockerized Blog Platform",
            "description": (
                "A containerized blog platform with markdown support, tag filtering, "
                "full-text search, and an admin dashboard. Deployed with Docker Compose."
            ),
            "problem": (
                "Developers need a blog platform that is easy to deploy, customize, and "
                "maintain across different environments."
            ),
            "approach": (
                "Built with Django and DRF, containerized with Docker and Docker Compose, "
                "with PostgreSQL for data storage and Nginx as a reverse proxy."
            ),
            "architecture": (
                "Django + DRF backend, PostgreSQL database, Docker Compose orchestration, "
                "Nginx reverse proxy, and a React admin dashboard."
            ),
            "image_url": "/api/uploads/projects/project4.png",
            "tags": ["Django", "Docker", "PostgreSQL", "Nginx", "React"],
            "category": "full-stack",
            "live_url": "#",
            "github_url": "#",
            "featured": True,
            "order": 5,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # EXPERIENCE — Career & Technical Growth Timeline
    # ─────────────────────────────────────────────────────────────────────────
    "experiences": [
        {
            "period": "2027",
            "role": "High-Performance Systems & Agentic AI",
            "company": "Deepening Focus & Advanced Innovation",
            "description": (
                "Advancing into asynchronous high-throughput architectures and autonomous agentic workflows. "
                "Engineering production-grade RAG systems, semantic vector search, LLM orchestration, "
                "and high-performance microservices with FastAPI."
            ),
            "employment_type": "Specialization & Innovation",
            "start_date": "2027-01",
            "end_date": None,
            "technologies": ["FastAPI", "LLMs", "RAG Systems", "Agentic AI"],
            "current": True,
            "order": 1,
        },
        {
            "period": "2026",
            "role": "Modern Full-Stack & API Architecture",
            "company": "Production Systems & Engineering Standards",
            "description": (
                "Scaled into enterprise frontend architecture and robust RESTful API design. "
                "Built reactive user interfaces with React.js and TypeScript, engineered production "
                "APIs with Django REST Framework (DRF), and authored formal Software Requirements "
                "Specifications (SRS) and software design blueprints."
            ),
            "employment_type": "Architecture & Engineering",
            "start_date": "2026-01",
            "end_date": "2026-12",
            "technologies": ["React.js", "TypeScript", "REST APIs", "DRF", "SRS & Software Design"],
            "current": False,
            "order": 2,
        },
        {
            "period": "2025",
            "role": "Foundations & Core Backend Engineering",
            "company": "Core Systems & Algorithms",
            "description": (
                "Established foundational computer science and engineering disciplines. Mastered data "
                "structures and algorithms (DSA), relational database schema design, and core web "
                "backend development with HTML, CSS, JavaScript, and pure Django."
            ),
            "employment_type": "Foundations & Core Systems",
            "start_date": "2025-01",
            "end_date": "2025-12",
            "technologies": ["HTML", "CSS", "JavaScript", "Pure Django", "Database Design", "DSA"],
            "current": False,
            "order": 3,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # EDUCATION — Academic Background
    # ─────────────────────────────────────────────────────────────────────────
    "education": [
        {
            "institution": "Haramaya University",
            "degree": "B.Sc. in Software Engineering",
            "field_of_study": "Software Engineering & Computer Science",
            "start_date": "5-Year",
            "end_date": "Program",
            "description": (
                "Completed a rigorous five-year Software Engineering degree covering computer science fundamentals, "
                "multi-language programming paradigms, algorithmic problem solving, system architecture, database design, "
                "and end-to-end SDLC methodologies. Combined deep theoretical analysis with extensive laboratory projects, "
                "software verification & testing, and an enterprise production capstone software project."
            ),
            "coursework": [
                "Programming Fundamentals & Diverse Languages",
                "Data Structures & Algorithms (DSA)",
                "Web Application Development",
                "Software Testing & QA",
                "SDLC & System Design",
                "Machine Learning (ML)",
                "Cloud & Distributed Systems",
                "Database Management Systems",
                "Object-Oriented Design (OOD)",
            ],
            "order": 1,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # TESTIMONIALS — sample, clearly marked as recommendations
    # ─────────────────────────────────────────────────────────────────────────
    "testimonials": [
        {
            "quote": (
                "Yohannes has a strong understanding of backend architecture and API design. "
                "His code is clean, well-documented, and easy to maintain."
            ),
            "author": "Colleague",
            "role": "Software Developer",
            "avatar_url": "https://ui-avatars.com/api/?name=C&background=20b2a6&color=fff",
            "order": 1,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # ARTICLES — sample technical articles
    # ─────────────────────────────────────────────────────────────────────────
    "articles": [
        {
            "title": "Designing RESTful APIs with Django REST Framework",
            "slug": "designing-restful-apis-with-drf",
            "excerpt": (
                "A practical guide to structuring Django REST Framework projects with "
                "proper serializers, viewsets, and permission classes."
            ),
            "content": (
                "# Designing RESTful APIs with Django REST Framework\n\n"
                "When building APIs with DRF, the key is to keep your serializers lean "
                "and your viewsets focused. Use ModelViewSet for standard CRUD and "
                "custom actions for business logic.\n\n"
                "## Serializer Design\n\n"
                "Separate read and write serializers when the representations differ. "
                "This prevents accidentally exposing write-only fields in responses.\n\n"
                "## Permissions\n\n"
                "Use custom permission classes for role-based access. "
                "DRF's IsAuthenticated and IsAdminUser cover most cases."
            ),
            "tags": ["Django", "DRF", "API Design"],
            "published": True,
            "order": 1,
        },
        {
            "title": "FastAPI vs Django: When to Use What",
            "slug": "fastapi-vs-django-when-to-use-what",
            "excerpt": (
                "Comparing FastAPI and Django for different use cases — performance, "
                "ecosystem, and developer experience."
            ),
            "content": (
                "# FastAPI vs Django: When to Use What\n\n"
                "Both are excellent Python web frameworks, but they serve different needs.\n\n"
                "## Django\n\n"
                "Use Django when you need batteries-included: ORM, admin panel, "
                "authentication, and a mature ecosystem. Great for content-heavy apps "
                "and teams that value convention over configuration.\n\n"
                "## FastAPI\n\n"
                "Use FastAPI when you need high performance, async support, and "
                "auto-generated API docs. Great for microservices and API-first projects."
            ),
            "tags": ["FastAPI", "Django", "Python"],
            "published": True,
            "order": 2,
        },
        {
            "title": "Database Design Patterns for PostgreSQL",
            "slug": "database-design-patterns-postgresql",
            "excerpt": (
                "Practical patterns for modeling data in PostgreSQL — indexing, "
                "normalization, and when to denormalize."
            ),
            "content": (
                "# Database Design Patterns for PostgreSQL\n\n"
                "Good database design starts with proper normalization, but knowing "
                "when to denormalize is equally important.\n\n"
                "## Indexing Strategy\n\n"
                "Create indexes on columns used in WHERE clauses and JOIN conditions. "
                "Use composite indexes when queries filter on multiple columns together.\n\n"
                "## When to Denormalize\n\n"
                "Denormalize when read performance is critical and the data changes "
                "infrequently. Materialized views are a good middle ground in PostgreSQL."
            ),
            "tags": ["PostgreSQL", "Database Design", "SQL"],
            "published": True,
            "order": 3,
        },
    ],
}
