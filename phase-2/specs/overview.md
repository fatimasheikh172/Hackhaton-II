# Project Overview

## Purpose
The hackathon-todo application is a full-stack todo management system that allows users to create, organize, and track their tasks efficiently. The application provides a clean, intuitive interface with authentication and data persistence. This is Phase II of the project, focusing on full-stack web application development with multi-user support.

## Scope
- User authentication and authorization
- Task creation, reading, updating, and deletion (CRUD operations)
- Task organization and management
- Multi-user isolation and data privacy
- Responsive web interface
- RESTful API backend
- Database persistence
- JWT-based session management

## Architecture
The application follows a monorepo structure with separate frontend and backend services:

- **Frontend**: Next.js application with TypeScript and Tailwind CSS
- **Backend**: FastAPI service with SQLModel ORM
- **Database**: PostgreSQL for production, SQLite for development
- **Authentication**: Better Auth for user management with JWT tokens
- **Phase II Focus**: Full-stack integration with secure multi-user functionality

## Technology Stack
- Frontend: Next.js 14+, TypeScript, Tailwind CSS
- Backend: FastAPI, SQLModel, Python 3.11+
- Database: PostgreSQL
- Authentication: Better Auth
- Deployment: Docker containers
- Security: JWT tokens for session management

## Key Features
1. User registration and login with secure password handling
2. Multi-user isolation - users can only access their own tasks
3. Secure task management with full CRUD operations
4. Responsive design for all devices
5. RESTful API endpoints with proper authentication
6. Data validation and comprehensive error handling
7. Clean, modern UI/UX with intuitive task organization

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

## Phase-Specific Details
### Phase II: Full-Stack Web Application
- Multi-user support with proper authentication and authorization
- Complete task management system with filtering, sorting, and search capabilities
- Production-ready security implementation
- Scalable database design with proper indexing
- Comprehensive API with standardized error responses

## Environment Variables

### Backend Configuration
- `BETTER_AUTH_SECRET`: Secret key for signing JWT tokens and securing authentication
- `DATABASE_URL`: Connection string for database (PostgreSQL for prod, SQLite for dev)
- `BACKEND_PORT`: Port number for backend server (default: 8000)

### Frontend Configuration
- `NEXT_PUBLIC_API_URL`: Base URL for backend API (e.g., http://localhost:8000/api)
- `NEXT_PUBLIC_BETTER_AUTH_URL`: Base URL for Better Auth service
- `FRONTEND_PORT`: Port number for frontend server (default: 3000)

For detailed configuration, see implementation guides.