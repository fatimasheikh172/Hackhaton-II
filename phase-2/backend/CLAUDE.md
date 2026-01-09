# Backend Development Guidelines

This document outlines the backend development standards and practices for the hackathon-todo project.

## Technology Stack

- **Framework**: FastAPI
- **Database ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Authentication**: Better Auth with JWT tokens
- **Database**: PostgreSQL (or SQLite for development)

## Project Structure

```
backend/
├── app/
│   ├── api/            # API route definitions
│   │   ├── v1/         # Version 1 API endpoints
│   │   │   ├── auth/   # Authentication endpoints
│   │   │   ├── tasks/  # Task management endpoints
│   │   │   └── deps/   # Dependency injection modules
│   │   └── __init__.py
│   ├── models/         # Database models using SQLModel
│   ├── schemas/        # Pydantic schemas for request/response validation
│   ├── database/       # Database connection and session management
│   ├── auth/           # Authentication and authorization logic
│   ├── core/           # Core application logic and configuration
│   └── utils/          # Utility functions
├── alembic/            # Database migration files
├── tests/              # Test files
└── main.py             # Application entry point
```

## Development Patterns

### API Routes
- Organize endpoints by feature (auth, tasks, etc.)
- Use RESTful conventions for endpoint design
- Implement proper HTTP status codes
- Include comprehensive request/response validation

### Database Models
- Use SQLModel for database models combining SQLAlchemy and Pydantic
- Define proper relationships between models
- Implement proper indexing for performance
- Use UUIDs for primary keys where appropriate

### Authentication
- Integrate Better Auth for user management
- Implement JWT-based authentication
- Use proper middleware for authentication checks
- Implement role-based access control where needed

### Error Handling
- Define custom exception classes for domain-specific errors
- Implement consistent error response format
- Log errors appropriately for debugging
- Return appropriate HTTP status codes

### Testing
- Write unit tests for business logic
- Write integration tests for API endpoints
- Use pytest for testing framework
- Implement proper test data fixtures