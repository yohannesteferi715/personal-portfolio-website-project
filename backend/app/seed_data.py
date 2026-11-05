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
        "title": "Backend-Focused Full-Stack Software Engineer",
        "headline_prefix": "Building",
        "headline_highlight": "scalable",
        "headline_suffix": "backend systems with",
        "headline_italic": "precision.",
        "bio": (
            "Backend-focused full-stack software engineer with 2+ years of experience "
            "building web applications, designing RESTful APIs, and developing scalable "
            "backend systems. Specialized in Python, Django, Django REST Framework, "
            "and FastAPI, with React for modern user interfaces."
        ),
        "years_experience": 2,
        "profile_photo_url": "/api/uploads/profile/profile-photo.jpg",
        "cv_url": None,
        "available_for_work": True,
        "email": "yohannes.teferi@example.com",
        "phone": None,
        "location": "Addis Ababa, Ethiopia",
        "social_links": [
            {"platform": "github", "href": "https://github.com/yohn"},
            {"platform": "linkedin", "href": "https://linkedin.com/in/yohn"},
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # SKILLS — organized by category
    # ─────────────────────────────────────────────────────────────────────────
    "skills": [
        # Backend Development
        {"name": "Python", "category": "backend"},
        {"name": "Django", "category": "backend"},
        {"name": "Django REST Framework", "category": "backend"},
        {"name": "FastAPI", "category": "backend"},
        {"name": "RESTful API Design", "category": "backend"},
        {"name": "API Authentication & Authorization", "category": "backend"},
        {"name": "Redis", "category": "backend"},
        {"name": "Celery", "category": "backend"},

        # Frontend Development
        {"name": "React", "category": "frontend"},
        {"name": "JavaScript", "category": "frontend"},
        {"name": "HTML5", "category": "frontend"},
        {"name": "CSS3", "category": "frontend"},

        # Databases
        {"name": "PostgreSQL", "category": "database"},
        {"name": "SQL", "category": "database"},
        {"name": "Database Design", "category": "database"},
        {"name": "Data Modeling", "category": "database"},

        # DevOps & Tools
        {"name": "Docker", "category": "devops"},
        {"name": "Git", "category": "devops"},
        {"name": "GitHub", "category": "devops"},
        {"name": "Linux", "category": "devops"},
        {"name": "API Documentation", "category": "devops"},

        # Software Engineering
        {"name": "SRS", "category": "engineering"},
        {"name": "SDD", "category": "engineering"},
        {"name": "Software Architecture", "category": "engineering"},
        {"name": "System Design", "category": "engineering"},
        {"name": "Clean Code", "category": "engineering"},
        {"name": "Requirements Analysis", "category": "engineering"},
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # ABOUT
    # ─────────────────────────────────────────────────────────────────────────
    "about": {
        "paragraphs": [
            (
                "I am a backend-focused full-stack software engineer with 2+ years of "
                "experience building web applications, designing RESTful APIs, and developing "
                "scalable backend systems. My primary expertise is in Python-based backend "
                "development using Django, Django REST Framework, and FastAPI, alongside React "
                "for building modern and responsive user interfaces."
            ),
            (
                "I have experience with PostgreSQL, Docker, database architecture, API design, "
                "and software engineering documentation, including Software Requirements "
                "Specifications (SRS) and Software Design Descriptions (SDD). I approach every "
                "project with a focus on maintainability, clean architecture, and proper "
                "separation of concerns."
            ),
            (
                "I enjoy designing reliable backend systems, solving complex engineering "
                "problems, and building maintainable software solutions. My engineering practice "
                "goes beyond writing code — I value requirements analysis, system design, "
                "documentation, and making technical decisions that stand the test of time."
            ),
        ],
        "mission_quote": (
            "I believe great software starts with solid architecture, clear requirements, "
            "and code that other engineers can understand and maintain."
        ),
        "highlights": [
            {"icon": "Server", "title": "Backend Architecture",
             "description": "Designing RESTful APIs and scalable backend systems with Django, DRF, and FastAPI."},
            {"icon": "Database", "title": "Database Design",
             "description": "Modeling relational schemas in PostgreSQL with proper indexing and data integrity."},
            {"icon": "Container", "title": "Containerization",
             "description": "Dockerizing applications for consistent development and deployment environments."},
            {"icon": "FileText", "title": "Engineering Documentation",
             "description": "Writing SRS, SDD, and API docs that keep teams aligned and projects maintainable."},
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # PROJECTS — sample projects demonstrating backend engineering
    # ─────────────────────────────────────────────────────────────────────────
    "projects": [
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
            "order": 1,
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
            "order": 2,
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
            "order": 3,
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
            "order": 4,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # EXPERIENCE — real, no fabrication
    # ─────────────────────────────────────────────────────────────────────────
    "experiences": [
        {
            "period": "2023 — Present",
            "role": "Software Engineer",
            "company": "Freelance / Open to Opportunities",
            "description": (
                "Building full-stack web applications with Python (Django, FastAPI) and React. "
                "Designing RESTful APIs, implementing authentication systems, and managing "
                "PostgreSQL databases. Working on personal projects and contributing to "
                "open-source."
            ),
            "employment_type": "Freelance",
            "start_date": "2023-01",
            "end_date": None,
            "technologies": ["Python", "Django", "FastAPI", "PostgreSQL", "React", "Docker"],
            "current": True,
            "order": 1,
        },
        {
            "period": "2022 — 2023",
            "role": "Junior Backend Developer",
            "company": "Personal Projects & Learning",
            "description": (
                "Developed backend systems and APIs using Django and Django REST Framework. "
                "Gained experience with database design, API authentication, and clean code "
                "practices through hands-on project building."
            ),
            "employment_type": "Self-directed",
            "start_date": "2022-06",
            "end_date": "2023-01",
            "technologies": ["Python", "Django", "DRF", "PostgreSQL", "Git"],
            "current": False,
            "order": 2,
        },
    ],

    # ─────────────────────────────────────────────────────────────────────────
    # EDUCATION — placeholder, user should edit
    # ─────────────────────────────────────────────────────────────────────────
    "education": [
        {
            "institution": "Haramaya University",
            "degree": "B.Sc. in Software Engineering",
            "field_of_study": "Software Engineering",
            "start_date": "2019",
            "end_date": "2023",
            "description": (
                "Studied software engineering fundamentals including data structures, "
                "algorithms, database systems, software architecture, and web development."
            ),
            "coursework": ["Data Structures", "Database Systems", "Software Engineering", "Algorithms", "Web Development"],
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
