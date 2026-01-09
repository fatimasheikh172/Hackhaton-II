# Database Schema Specification

## Overview
This document defines the database schema for the hackathon-todo application using SQLModel. The schema includes user management (handled by Better Auth) and task management tables with appropriate relationships and constraints.

## Database Technology
- **ORM**: SQLModel (SQLAlchemy + Pydantic)
- **Database**: PostgreSQL (production) / SQLite (development)
- **Migration Tool**: Alembic

## Tables

### Users Table
The users table is primarily managed by Better Auth, but the application may need to reference user information. The following represents the essential user fields relevant to the application:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Notes**:
- Better Auth handles most user authentication fields
- The `id` field serves as the primary identifier for user relationships
- The `email` field must be unique and is used for authentication
- The `is_verified` field indicates if the user has verified their email
- The `is_active` field enables soft deletion of user accounts

### Tasks Table
The tasks table stores all task information with a foreign key relationship to the users table:

```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
    priority VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    due_date TIMESTAMP WITH TIME ZONE,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Notes**:
- The `title` field is required and has a maximum length of 255 characters
- The `status` field has a check constraint to ensure valid values
- The `priority` field has a check constraint to ensure valid values
- The `user_id` field creates a foreign key relationship to the users table
- The `ON DELETE CASCADE` ensures tasks are deleted when a user is deleted
- The `created_at` and `updated_at` fields track timestamps for audit purposes

## Indexes

### Users Table Indexes
- `idx_users_email`: Index on email field for efficient authentication lookups
- `idx_users_username`: Index on username field for efficient lookups

### Tasks Table Indexes
- `idx_tasks_user_id`: Index on user_id field for efficient user task queries
- `idx_tasks_status`: Index on status field for efficient filtering
- `idx_tasks_priority`: Index on priority field for efficient sorting
- `idx_tasks_due_date`: Index on due_date field for efficient date-based queries
- `idx_tasks_created_at`: Index on created_at field for efficient chronological queries

## Relationships

### User to Tasks (One-to-Many)
- One user can have many tasks
- Foreign key: `tasks.user_id` references `users.id`
- Cascade delete: When a user is deleted, all their tasks are also deleted

## SQLModel Definitions

### User Model
```python
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class UserBase(SQLModel):
    email: str = Field(unique=True, nullable=False)
    username: Optional[str] = Field(default=None)
    first_name: Optional[str] = Field(default=None)
    last_name: Optional[str] = Field(default=None)
    is_verified: bool = Field(default=False)
    is_active: bool = Field(default=True)

class User(UserBase, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### Task Model
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
import uuid

class TaskBase(SQLModel):
    title: str = Field(max_length=255, nullable=False)
    description: Optional[str] = Field(default=None)
    status: str = Field(default="pending", max_length=20,
                       sa_column_kwargs={"check": "status IN ('pending', 'in-progress', 'completed')"})
    priority: str = Field(default="medium", max_length=10,
                         sa_column_kwargs={"check": "priority IN ('low', 'medium', 'high')"})
    due_date: Optional[datetime] = Field(default=None)
    user_id: uuid.UUID = Field(foreign_key="users.id")

class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship
    user: "User" = Relationship(back_populates="tasks")

# Add to User model after Task is defined:
# tasks: List["Task"] = Relationship(back_populates="user")
```

## Constraints and Validation
- All required fields must be present when creating records
- Email uniqueness is enforced at the database level
- Status and priority fields have check constraints to ensure valid values
- Foreign key constraints ensure referential integrity
- Cascade delete maintains data consistency

## Migration Strategy
- Use Alembic for database migrations
- Create migration scripts for schema changes
- Test migrations in development before applying to production
- Implement proper rollback strategies for each migration

For API integration details, see @specs/api/rest-endpoints.md.
For feature specifications, see @specs/features/task-crud.md.