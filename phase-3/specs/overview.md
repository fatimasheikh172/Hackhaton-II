# Project Overview

## Purpose
The hackathon-todo application is a full-stack todo management system that allows users to create, organize, and track their tasks efficiently. The application provides a clean, intuitive interface with authentication and data persistence.

## Scope
- User authentication and authorization
- Task creation, reading, updating, and deletion (CRUD operations)
- Task organization and management
- Responsive web interface
- RESTful API backend
- Database persistence

## Architecture
The application follows a monorepo structure with separate frontend and backend services:

- **Frontend**: Next.js application with TypeScript and Tailwind CSS
- **Backend**: FastAPI service with SQLModel ORM
- **Database**: PostgreSQL for production, SQLite for development
- **Authentication**: Better Auth for user management

## Technology Stack
- Frontend: Next.js 14+, TypeScript, Tailwind CSS
- Backend: FastAPI, SQLModel, Python 3.11+
- Database: PostgreSQL
- Authentication: Better Auth
- Deployment: Docker containers

## Key Features
1. User registration and login
2. Secure task management
3. Responsive design for all devices
4. RESTful API endpoints
5. Data validation and error handling
6. Clean, modern UI/UX

## Project Structure
```
hackathon-todo/
├── frontend/          # Next.js application
├── backend/           # FastAPI service
├── specs/             # Specification documents
├── .specify/          # SpecKit configuration
├── docker-compose.yml # Container orchestration
└── README.md          # Project documentation
```

For detailed feature specifications, see @specs/features/task-crud.md and @specs/features/authentication.md.
For API documentation, see @specs/api/rest-endpoints.md.
For database schema, see @specs/database/schema.md.