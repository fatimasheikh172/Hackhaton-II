# Hackathon-Todo Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-26

## Active Technologies

Python 3.11, TypeScript/JavaScript (Next.js 14+), FastAPI, SQLModel, Better Auth, Next.js, Tailwind CSS, PostgreSQL, SQLite

## Project Structure

```text
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── api/
│   └── auth/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── lib/
└── tests/
```

## Commands

Backend:
- `cd backend && pip install -r requirements.txt`
- `cd backend && uvicorn main:app --reload`
- `cd backend && pytest`

Frontend:
- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd frontend && npm run build`

Docker:
- `docker-compose up --build`

## Code Style

Python:
- Use Black for formatting
- Follow PEP 8 guidelines
- Type hints required for all function signatures

TypeScript/JavaScript:
- Use Prettier for formatting
- ESLint with recommended rules
- Strict mode enabled

## Recent Changes

- Feature 1: Initial project setup with monorepo structure
- Feature 2: Authentication system with Better Auth integration
- Feature 3: Task management system with CRUD operations

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->